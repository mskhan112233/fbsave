import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const hostHeader = request.headers.get("host");
  const host = forwardedHost || hostHeader || "fbsave.net";

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const proto = forwardedProto || "https";

  let baseUrl = `${proto}://${host}`;
  if (process.env.NEXT_PUBLIC_SITE_URL && (host.includes("localhost") || host.includes("127.0.0.1"))) {
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  const content = `User-Agent: *
Allow: /
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
