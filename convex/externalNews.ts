import { v } from "convex/values";
import {
  action,
  internalAction,
  internalMutation,
  query,
} from "./_generated/server";
import { internal } from "./_generated/api";

// ── Sources config ─────────────────────────────────────────────
const SOURCES = [
  {
    slug: "sika-finance",
    name: "Sika Finance",
    rssUrls: [
      "https://www.sikafinance.com/rss",
      "https://www.sikafinance.com/feed",
      "https://www.sikafinance.com/actualites/feed",
      "https://www.sikafinance.com/rss.xml",
    ],
    defaultCategory: "Marchés",
  },
  {
    slug: "madis-invest",
    name: "Madis Invest",
    rssUrls: [
      "https://madisinvest.com/feed",
      "https://madisinvest.com/rss",
      "https://madisinvest.com/?feed=rss2",
      "https://madisinvest.com/feed/",
    ],
    defaultCategory: "Finance",
  },
];

// ── XML parsing helpers ────────────────────────────────────────
function extractCDATA(xml: string, tag: string): string {
  const cdataRe = new RegExp(
    `<${tag}(?:\\s[^>]*)?><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`,
    "i"
  );
  const m = xml.match(cdataRe);
  if (m) return m[1].trim();
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m2 = xml.match(re);
  return m2 ? m2[1].trim() : "";
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}=["']([^"']+)["'][^>]*>`, "i");
  const m = xml.match(re);
  return m ? m[1] : "";
}

function extractLink(xml: string): string {
  const m = xml.match(/<link>([^<]+)<\/link>/i);
  if (m) return m[1].trim();
  const m2 = xml.match(/<link[^>]+href=["']([^"']+)["']/i);
  if (m2) return m2[1];
  return "";
}

function extractImageUrl(itemXml: string): string {
  const fromMedia = extractAttr(itemXml, "media:content", "url");
  if (fromMedia) return fromMedia;

  const fromThumb = extractAttr(itemXml, "media:thumbnail", "url");
  if (fromThumb) return fromThumb;

  const fromEnclosure = extractAttr(itemXml, "enclosure", "url");
  if (fromEnclosure) {
    const typeRe = /type=["']image\/[^"']+["']/i;
    if (typeRe.test(itemXml)) return fromEnclosure;
  }

  const desc = extractCDATA(itemXml, "description");
  const imgM = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgM) return imgM[1];

  return "";
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

// ── RSS parser ─────────────────────────────────────────────────
function parseRSSItems(
  rssText: string,
  source: string,
  sourceName: string,
  defaultCategory: string,
  maxItems = 3
) {
  type Item = {
    guid: string;
    title: string;
    excerpt: string;
    url: string;
    imageUrl: string;
    publishedAt: number;
    source: string;
    sourceName: string;
    category: string;
    fetchedAt: number;
  };

  const items: Item[] = [];
  const itemMatches = [...rssText.matchAll(/<item[^>]*>([\s\S]*?)<\/item>/gi)];

  for (const m of itemMatches) {
    const xml = m[1];
    const title = decodeEntities(extractCDATA(xml, "title"));
    const url = extractLink(xml) || extractCDATA(xml, "guid");
    const guid = extractCDATA(xml, "guid") || url;
    const description = extractCDATA(xml, "description");
    const pubDateStr = extractCDATA(xml, "pubDate");
    const category =
      decodeEntities(extractCDATA(xml, "category")) || defaultCategory;
    const imageUrl = extractImageUrl(xml);
    const publishedAt = pubDateStr ? new Date(pubDateStr).getTime() : Date.now();
    const excerpt = stripHtml(description).slice(0, 220);

    if (title && url) {
      items.push({
        guid,
        title,
        excerpt,
        url,
        imageUrl,
        publishedAt,
        source,
        sourceName,
        category,
        fetchedAt: Date.now(),
      });
    }
  }

  return items.sort((a, b) => b.publishedAt - a.publishedAt).slice(0, maxItems);
}

// ── Core fetch logic (shared between action & internalAction) ──
async function runFetch(ctx: {
  runMutation: (fn: any, args: any) => Promise<any>;
}) {
  const results: { source: string; count: number; error?: string }[] = [];

  for (const src of SOURCES) {
    let rssText: string | null = null;

    for (const rssUrl of src.rssUrls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10_000);
        const res = await fetch(rssUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (compatible; EverestFinance/1.0; +https://everestfinance.com)",
            Accept:
              "application/rss+xml, application/xml, text/xml, application/atom+xml, */*",
          },
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          rssText = await res.text();
          break;
        }
      } catch {
        continue;
      }
    }

    if (!rssText) {
      results.push({
        source: src.slug,
        count: 0,
        error: "Feed not accessible",
      });
      continue;
    }

    const items = parseRSSItems(
      rssText,
      src.slug,
      src.name,
      src.defaultCategory,
      3
    );

    await ctx.runMutation(internal.externalNews.clearSourceArticles, {
      source: src.slug,
    });

    for (const item of items) {
      await ctx.runMutation(internal.externalNews.insertExternalArticle, item);
    }

    results.push({ source: src.slug, count: items.length });
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
    title: v.string(),
    excerpt: v.string(),
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
