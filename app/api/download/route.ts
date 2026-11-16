import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cdnUrl = searchParams.get("url");
  const rawTitle = searchParams.get("title") || "facebook_video";
  const quality = searchParams.get("quality") || "HD";
  const ext = searchParams.get("ext") || "mp4";

  if (!cdnUrl) {
    return NextResponse.json({ success: false, error: "Missing video URL parameter" }, { status: 400 });
  }

  const cleanTitle = rawTitle.replace(/[^a-zA-Z0-9_\-]/g, "_").substring(0, 50) || "facebook_video";
  const filename = `${cleanTitle}_${quality}.${ext}`;

  try {
    const headers: Record<string, string> = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept": "*/*"
    };

    if (cdnUrl.includes("facebook.com") || cdnUrl.includes("fbcdn.net")) {
      headers["Referer"] = "https://www.facebook.com/";
    }

    const upstreamRes = await fetch(cdnUrl, { headers });

    if (!upstreamRes.ok || !upstreamRes.body) {
      return NextResponse.json(
        { success: false, error: `Upstream error (${upstreamRes.status}): ${upstreamRes.statusText}` },
        { status: 502 }
      );
    }

    const contentType = ext === "m4a" || ext === "mp3" ? "audio/mp4" : "video/mp4";
    const resHeaders = new Headers();
    resHeaders.set("Content-Type", contentType);
    resHeaders.set("Content-Disposition", `attachment; filename="${filename}"`);
    resHeaders.set("Access-Control-Allow-Origin", "*");

    const contentLength = upstreamRes.headers.get("content-length");
    if (contentLength) {
      resHeaders.set("Content-Length", contentLength);
    }

    return new NextResponse(upstreamRes.body as any, {
      status: 200,
      headers: resHeaders
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Stream download error" }, { status: 500 });
  }
}
