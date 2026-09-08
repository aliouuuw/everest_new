/** Drop the first image block from scraped HTML when the hero already shows imageUrl. */
export function stripLeadingArticleImage(
  html: string,
  imageUrl?: string | null,
): string {
  if (!imageUrl?.trim()) return html

  let out = html.trim()
  // Sika / Madis: leading <p><img …></p>
  out = out.replace(/^<p\b[^>]*>\s*<img\b[\s\S]*?<\/p>\s*/i, '')
  // Bare leading image
  out = out.replace(/^<img\b[\s\S]*?\/?>\s*/i, '')
  // Empty paragraph left behind
  out = out.replace(/^<p\b[^>]*>\s*<\/p>\s*/i, '')
  return out.trim()
}
