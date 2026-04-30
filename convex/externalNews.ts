import { v } from "convex/values";
import {
  action,
  internalAction,
  internalMutation,
  query,
} from "./_generated/server";
import { internal } from "./_generated/api";

// ── Shared types ───────────────────────────────────────────────
type ExternalItem = {
  guid: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  url: string;
  imageUrl: string;
  publishedAt: number;
  source: string;
  sourceName: string;
  category: string;
  fetchedAt: number;
};

function makeSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function decodeUnicodeEscapes(str: string): string {
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
}

// ── Helpers ────────────────────────────────────────────────────
function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

async function safeFetch(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.5",
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

// ── Sika Finance scraper ───────────────────────────────────────
// 1. Get article list from RSS feed
// 2. Fetch each article page and extract <article> content
async function scrapeSikaFinance(): Promise<ExternalItem[]> {
  const rssText = await safeFetch("https://www.sikafinance.com/rss/actualites_bourse_brvm");
  if (!rssText) return [];

  const items: ExternalItem[] = [];
  const itemMatches = [...rssText.matchAll(/<item>([\s\S]*?)<\/item>/gi)];

  for (const m of itemMatches) {
    if (items.length >= 3) break;
    const xml = m[1];

    const titleM = xml.match(/<title>([^<]+)<\/title>/i);
    const title = titleM ? decodeEntities(titleM[1].trim()) : "";

    const linkM = xml.match(/<link>([^<]+)<\/link>/i);
    const url = linkM ? linkM[1].trim() : "";

    const descM = xml.match(/<description>([^<]+)<\/description>/i);
    const excerpt = descM ? decodeEntities(descM[1].trim()).slice(0, 250) : "";

    const dateM = xml.match(/<pubDate>([^<]+)<\/pubDate>/i);
    const publishedAt = dateM ? new Date(dateM[1].trim()).getTime() : Date.now();

    const imgM = xml.match(/<enclosure\s+url="([^"]+)"/i);
    const imageUrl = imgM ? imgM[1] : "";

    const guidM = xml.match(/<guid[^>]*>([^<]+)<\/guid>/i);
    const guid = guidM ? guidM[1].trim() : url;

    if (!title || !url) continue;

    // Fetch the full article page to extract <article> content
    let content = "";
    const articleHtml = await safeFetch(url);
    if (articleHtml) {
      const articleM = articleHtml.match(/<article>([\s\S]*?)<\/article>/i);
      if (articleM) {
        // Clean up the content: fix relative image URLs, remove author/date lines
        content = articleM[1]
          .replace(/src="\.\.\//g, 'src="https://www.sikafinance.com/')
          .replace(/<p class="allf[^"]*">[^<]*<\/p>/gi, "") // remove author/date footer
          .trim();
      }
    }
    // Fallback: use RSS description as content
    if (!content) {
      content = `<p>${excerpt}</p>`;
    }

    items.push({
      guid,
      slug: makeSlug(title),
      title,
      excerpt,
      content,
      url,
      imageUrl,
      publishedAt,
      source: "sika-finance",
      sourceName: "Sika Finance",
      category: "Marchés",
      fetchedAt: Date.now(),
    });
  }

  return items;
}

// ── Madis Invest scraper ───────────────────────────────────────
// Next.js RSC payload with backslash-escaped JSON objects.
// Full article content is in RSC transfer chunks (e.g. "1c:T3f6d,<html>...")
// referenced by "$1c" in the description field.
async function scrapeMadisInvest(): Promise<ExternalItem[]> {
  const rawHtml = await safeFetch("https://madisinvest.com/");
  if (!rawHtml) return [];

  // Unescape the RSC payload: \" → "
  const html = rawHtml.replace(/\\"/g, '"');

  // Build a map of RSC transfer chunks: "$1c" → HTML content
  // Chunks look like: 1c:T3f6d,"])</script><script>self.__next_f.push([1,"\u003chead\u003e...
  const chunkMap = new Map<string, string>();
  const chunkRe = /([0-9a-f]+):T[0-9a-f]+,"\]?\)?\s*<\/script>\s*<script>\s*self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g;
  for (const cm of rawHtml.matchAll(chunkRe)) {
    const ref = `$${cm[1]}`;
    const decoded = decodeUnicodeEscapes(cm[2]
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\")
    );
    chunkMap.set(ref, decoded);
  }

  const items: ExternalItem[] = [];
  const seen = new Set<string>();

  // Find all JSON-like object blocks that contain both an article id and a media image URL
  const blockRe = /\{[^{}]{200,3000}?madisinvest\.com\/images\/[^{}]{0,1500}?\}/g;

  for (const blockMatch of html.matchAll(blockRe)) {
    if (items.length >= 3) break;
    const block = blockMatch[0];

    // Extract individual fields from the block
    const idM = block.match(/"id":"([A-Za-z0-9]{15,30})"/);
    const titleM = block.match(/"title":"([^"]{15,300})"/);
    const mediaM = block.match(/"media":"(https:\/\/madisinvest\.com\/images\/[^"]+)"/);
    const createdAtM = block.match(/"createdAt":"(\d{4}-\d{2}-\d{2}T[^"]+)"/);
    const metaDescM = block.match(/"metaDescription":"([^"]{10,600})"/);
    const descRefM = block.match(/"description":"(\$[0-9a-f]+)"/);

    if (!titleM || !mediaM || !idM) continue;

    const id = idM[1];
    if (seen.has(id)) continue;
    seen.add(id);

    const title = decodeEntities(titleM[1]);
    const excerpt = metaDescM
      ? decodeEntities(metaDescM[1]).slice(0, 250)
      : title.slice(0, 250);

    // Try to get full content from the RSC transfer chunk
    let content = "";
    if (descRefM) {
      const chunkHtml = chunkMap.get(descRefM[1]);
      if (chunkHtml) {
        // Extract body content, strip <head>/<body> wrapper, clean up editor classes
        content = chunkHtml
          .replace(/<head><\/head>/gi, "")
          .replace(/<\/?body>/gi, "")
          .replace(/class="PlaygroundEditorTheme__[^"]*"/g, "")
          .replace(/style="white-space: pre-wrap;"/g, "")
          .trim();
      }
    }
    // Fallback: use metaDescription as content paragraphs
    if (!content && metaDescM) {
      content = `<p>${decodeEntities(metaDescM[1])}</p>`;
    }
    if (!content) {
      content = `<p>${title}</p>`;
    }

    const slug = makeSlug(title);
    const articleUrl = `https://madisinvest.com/`;

    const publishedAt = createdAtM ? new Date(createdAtM[1]).getTime() : Date.now();

    items.push({
      guid: id,
      slug,
      title,
      excerpt,
      content,
      url: articleUrl,
      imageUrl: mediaM[1],
      publishedAt,
      source: "madis-invest",
      sourceName: "Madis Invest",
      category: "Bourse",
      fetchedAt: Date.now(),
    });
  }

  return items.sort((a, b) => b.publishedAt - a.publishedAt).slice(0, 3);
}

// ── Core fetch logic (shared between action & internalAction) ──
async function runFetch(ctx: {
  runMutation: (fn: any, args: any) => Promise<any>;
}) {
  const results: { source: string; count: number; error?: string }[] = [];

  // Sika Finance
  try {
    const sikaItems = await scrapeSikaFinance();
    if (sikaItems.length > 0) {
      await ctx.runMutation(internal.externalNews.clearSourceArticles, {
        source: "sika-finance",
      });
      for (const item of sikaItems) {
        await ctx.runMutation(internal.externalNews.insertExternalArticle, item);
      }
    }
    results.push({ source: "sika-finance", count: sikaItems.length, ...(sikaItems.length === 0 ? { error: "No articles found" } : {}) });
  } catch (e) {
    results.push({ source: "sika-finance", count: 0, error: String(e) });
  }

  // Madis Invest
  try {
    const madisItems = await scrapeMadisInvest();
    if (madisItems.length > 0) {
      await ctx.runMutation(internal.externalNews.clearSourceArticles, {
        source: "madis-invest",
      });
      for (const item of madisItems) {
        await ctx.runMutation(internal.externalNews.insertExternalArticle, item);
      }
    }
    results.push({ source: "madis-invest", count: madisItems.length, ...(madisItems.length === 0 ? { error: "No articles found" } : {}) });
  } catch (e) {
    results.push({ source: "madis-invest", count: 0, error: String(e) });
  }

  return results;
}

// ── Queries ────────────────────────────────────────────────────
export const getExternalArticles = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("externalArticles")
      .withIndex("by_published")
      .order("desc")
      .collect();
  },
});

export const getExternalArticleBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("externalArticles")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
  },
});

// ── Internal mutations ─────────────────────────────────────────
export const clearSourceArticles = internalMutation({
  args: { source: v.string() },
  handler: async (ctx, { source }) => {
    const existing = await ctx.db
      .query("externalArticles")
      .withIndex("by_source", (q) => q.eq("source", source))
      .collect();
    for (const doc of existing) {
      await ctx.db.delete(doc._id);
    }
  },
});

export const insertExternalArticle = internalMutation({
  args: {
    guid: v.string(),
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    url: v.string(),
    imageUrl: v.string(),
    publishedAt: v.number(),
    source: v.string(),
    sourceName: v.string(),
    category: v.string(),
    fetchedAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("externalArticles", args);
  },
});

// ── Public action — callable from the frontend ─────────────────
export const fetchExternalNews = action({
  args: {},
  handler: async (ctx) => {
    return await runFetch(ctx);
  },
});

// ── Internal action — used by the cron scheduler ───────────────
export const scheduledFetch = internalAction({
  args: {},
  handler: async (ctx) => {
    return await runFetch(ctx);
  },
});
