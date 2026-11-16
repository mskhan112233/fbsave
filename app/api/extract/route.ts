import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

// Fallback sample data for testing & instant preview
const SAMPLE_DATA = {
  success: true,
  title: "Facebook Reel: Amazing Nature & Cinematic Drone Footage (4K 60FPS)",
  thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  duration: "01:42",
  duration_seconds: 102,
  uploader: "National Visuals Official",
  source_url: "https://www.facebook.com/reel/1234567890",
  formats: [
    {
      id: "1080p",
      label: "1080p (Full HD)",
      quality: "HD",
      height: 1080,
      width: 1920,
      ext: "mp4",
      filesize: 34603008,
      filesize_str: "33.0 MB",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      type: "video"
    },
    {
      id: "720p",
      label: "720p (HD)",
      quality: "HD",
      height: 720,
      width: 1280,
      ext: "mp4",
      filesize: 18874368,
      filesize_str: "18.0 MB",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      type: "video"
    },
    {
      id: "480p",
      label: "480p (SD)",
      quality: "SD",
      height: 480,
      width: 854,
      ext: "mp4",
      filesize: 9437184,
      filesize_str: "9.0 MB",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      type: "video"
    },
    {
      id: "360p",
      label: "360p (SD Low)",
      quality: "SD",
      height: 360,
      width: 640,
      ext: "mp4",
      filesize: 5242880,
      filesize_str: "5.0 MB",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      type: "video"
    },
    {
      id: "audio_only",
      label: "Audio Only (M4A/MP3)",
      quality: "Audio",
      height: null,
      width: null,
      ext: "m4a",
      filesize: 2097152,
      filesize_str: "2.0 MB",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      type: "audio"
    }
  ]
};

// Node.js fallback scraper
async function scrapeDirectNode(url: string): Promise<any> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });

    const html = await res.text();

    const hdMatch = html.match(/["'](?:browser_native_hd_url|playable_url_quality_hd)["']\s*:\s*["']([^"']+)["']/);
    const sdMatch = html.match(/["'](?:browser_native_sd_url|playable_url)["']\s*:\s*["']([^"']+)["']/);
    const titleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/);
    const thumbMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/);

    const clean = (s?: string) => (s ? s.replace(/\\\//g, "/").replace(/&amp;/g, "&") : null);

    const hdUrl = clean(hdMatch?.[1]);
    const sdUrl = clean(sdMatch?.[1]);
    const title = clean(titleMatch?.[1]) || "Facebook Video";
    const thumbnail = clean(thumbMatch?.[1]) || undefined;

    const formats: any[] = [];
    if (hdUrl) {
      formats.push({
        id: "1080p",
        label: "1080p / 720p (Full HD)",
        quality: "HD",
        height: 1080,
        width: 1920,
        ext: "mp4",
        filesize_str: "Direct HD MP4",
        url: hdUrl,
        type: "video",
      });
    }
    if (sdUrl) {
      formats.push({
        id: "480p",
        label: "480p / 360p (SD Quality)",
        quality: "SD",
        height: 480,
        width: 854,
        ext: "mp4",
        filesize_str: "Direct SD MP4",
        url: sdUrl,
        type: "video",
      });
    }

    if (formats.length > 0) {
      return {
        success: true,
        title,
        thumbnail,
        duration: "Reel / Video",
        uploader: "Facebook Creator",
        source_url: url,
        formats,
      };
    }
  } catch (e) {
    // ignore
  }
  return null;
}

function runPythonExtractor(url: string): Promise<any> {
  return new Promise((resolve) => {
    const cwd = process.cwd();
    const parentDir = path.resolve(cwd, "..");

    // Pass inline script that explicitly sets up sys.path and uses marker
    const pyCode = `
import sys, os, json
for p in [r"${cwd.replace(/\\/g, "\\\\")}", r"${parentDir.replace(/\\/g, "\\\\")}"]:
    if p not in sys.path:
        sys.path.insert(0, p)
try:
    import fbsave_core
    url = sys.argv[1]
    res = fbsave_core.extract_facebook_info(url)
    print("__FBSAVE_JSON__" + json.dumps(res))
except Exception as e:
    print("__FBSAVE_JSON__" + json.dumps({"success": False, "error": str(e)}))
`;

    const py = spawn("python", ["-c", pyCode, url]);

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (d) => { stdout += d.toString(); });
    py.stderr.on("data", (d) => { stderr += d.toString(); });

    py.on("close", async () => {
      const marker = "__FBSAVE_JSON__";
      const idx = stdout.indexOf(marker);
      if (idx !== -1) {
        try {
          const jsonStr = stdout.substring(idx + marker.length).trim();
          const parsed = JSON.parse(jsonStr);
          if (parsed && parsed.success) {
            resolve(parsed);
            return;
          }
        } catch {
          // ignore
        }
      }

      // Try Node.js fallback scraper
      const fallback = await scrapeDirectNode(url);
      if (fallback && fallback.success) {
        resolve(fallback);
        return;
      }

      resolve({
        success: false,
        error:
          "Could not extract video streams. Please ensure the Facebook link is public (not in a private group or friends-only).",
      });
    });

    py.on("error", async () => {
      const fallback = await scrapeDirectNode(url);
      if (fallback && fallback.success) {
        resolve(fallback);
        return;
      }
      resolve({ success: false, error: "Extractor service unavailable" });
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = (body.url || "").trim();

    if (!url) {
      return NextResponse.json({ success: false, error: "Please enter a valid Facebook URL" }, { status: 400 });
    }

    if (url.includes("sample-nature-drone") || url.includes("sample")) {
      return NextResponse.json(SAMPLE_DATA);
    }

    const result = await runPythonExtractor(url);
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = (searchParams.get("url") || "").trim();

  if (!url || url.includes("sample")) {
    return NextResponse.json(SAMPLE_DATA);
  }

  const result = await runPythonExtractor(url);
  return NextResponse.json(result);
}
