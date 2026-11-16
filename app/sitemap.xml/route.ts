import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Read exact host and protocol from incoming request so sitemap ALWAYS matches the Search Console property domain
  const forwardedHost = request.headers.get("x-forwarded-host");
  const hostHeader = request.headers.get("host");
  const host = forwardedHost || hostHeader || "fbsave.net";

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const proto = forwardedProto || (request.nextUrl.protocol ? request.nextUrl.protocol.replace(":", "") : "https");

  let baseUrl = `${proto}://${host}`;
  if (process.env.NEXT_PUBLIC_SITE_URL && (host.includes("localhost") || host.includes("127.0.0.1"))) {
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  const now = "2026-11-16T00:00:00.000Z";

  const pages = [
    { path: "", changefreq: "daily", priority: "1.0" },
    { path: "/reels-downloader", changefreq: "weekly", priority: "0.9" },
    { path: "/story-downloader", changefreq: "weekly", priority: "0.9" },
    { path: "/video-to-mp3", changefreq: "weekly", priority: "0.8" },
    { path: "/how-to-download", changefreq: "monthly", priority: "0.8" },
    { path: "/faq", changefreq: "monthly", priority: "0.7" },
    { path: "/sitemap", changefreq: "monthly", priority: "0.7" },
    { path: "/privacy", changefreq: "yearly", priority: "0.5" },
    { path: "/terms", changefreq: "yearly", priority: "0.5" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
