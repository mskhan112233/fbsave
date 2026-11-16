# FBSave Pro - Facebook Video & Reel Downloader 🎬

A modern, high-performance Facebook Video Downloader featuring a simple, clean UI, the best user experience (UX), and a dedicated **Quality Choice Option** (1080p Full HD, 720p HD, 480p/360p SD, and Audio Only MP3/M4A).

---

## ✨ Key Features

- **🎯 Simple UI & Best UX**:
  - Clean, dark-mode glassmorphic interface built with Tailwind CSS.
  - One-click **"📋 Paste"** button that reads links directly from your clipboard.
  - Quick **"Try Sample Reel"** demo button to test immediately without searching for a Facebook link.
  - Real-time video preview with title, duration badge, uploader information, and embedded video preview modal.
- **⚡ Quality Choice Option**:
  - **1080p (Full HD)**: Crisp, high-definition progressive video.
  - **720p (HD)**: Balanced high-quality video with synced audio.
  - **480p / 360p (SD)**: Fast download with compact file size.
  - **Audio Only (M4A/MP3)**: Extract crystal-clear music, podcasts, or speech tracks directly.
  - Real-time display of approximate file size and format for every stream.
- **📥 Direct Attachment Downloads**:
  - Video streams are proxied with proper `Content-Disposition: attachment; filename="..."` headers so clicking "Download" immediately prompts your browser's native download manager instead of getting blocked by CORS or opening an external tab.
  - "Copy Link" and "Open in New Tab" fallback actions included.
- **🔗 Universal Facebook Link Support**:
  - Facebook Reels (`facebook.com/reel/...`)
  - Facebook Watch (`facebook.com/watch/...`)
  - Short links (`fb.watch/...`)
  - Share links (`facebook.com/share/r/...`)
  - Public posts and mobile links (`m.facebook.com`)

---

## 🚀 How to Run

You have two convenient ways to run this application:

### Option 1: Next.js Full-Stack App (Port 3001)
```bash
cd fbsave
npm run dev
# or for production:
npm run build
npm run start -- -p 3001
```
Open **[http://localhost:3001](http://localhost:3001)** in your browser.

### Option 2: Standalone Fast Python Server (Port 5000)
Zero setup required! Uses standard library HTTP server with multithreading and `yt-dlp`:
```bash
python server.py
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser.

---

## 🛠️ Project Structure

```
facebook/
├── server.py              # Standalone Python multithreaded server & UI
├── fbsave_core.py         # Facebook extractor engine powered by yt-dlp
├── fbsave/                # Next.js 16 full-stack web application
│   ├── app/
│   │   ├── api/
│   │   │   ├── extract/   # POST /api/extract - video metadata & quality parsing
│   │   │   └── download/  # GET /api/download - streaming attachment proxy
│   │   ├── globals.css    # Tailwind CSS styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Main page with Quality Chooser & reactive UX
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## 💡 How It Works

1. **Copy Link**: Copy any Facebook video, reel, or watch link.
2. **Paste & Analyze**: Click **Paste** or enter the link. The extractor fetches available formats, resolutions, audio streams, and metadata.
3. **Choose Quality**: Select your desired quality (1080p FHD, 720p HD, SD, or Audio Only).
4. **Download**: Click **Download** to save the file directly to your downloads folder with the video title!
