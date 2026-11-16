import os
import sys
import json
import urllib.request
import urllib.parse
from http.server import HTTPServer, BaseHTTPRequestHandler
from socketserver import ThreadingMixIn
import fbsave_core

PORT = 5000

SAMPLE_DATA = {
    "success": True,
    "title": "Facebook Reel: Amazing Nature & Cinematic Drone Footage (4K 60FPS)",
    "thumbnail": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "duration": "01:42",
    "duration_seconds": 102,
    "uploader": "National Visuals Official",
    "source_url": "https://www.facebook.com/reel/1234567890",
    "formats": [
        {
            "id": "1080p",
            "label": "1080p (Full HD)",
            "quality": "HD",
            "height": 1080,
            "width": 1920,
            "ext": "mp4",
            "filesize": 34603008,
            "filesize_str": "33.0 MB",
            "url": "https://www.w3schools.com/html/mov_bbb.mp4",
            "type": "video"
        },
        {
            "id": "720p",
            "label": "720p (HD)",
            "quality": "HD",
            "height": 720,
            "width": 1280,
            "ext": "mp4",
            "filesize": 18874368,
            "filesize_str": "18.0 MB",
            "url": "https://www.w3schools.com/html/mov_bbb.mp4",
            "type": "video"
        },
        {
            "id": "480p",
            "label": "480p (SD)",
            "quality": "SD",
            "height": 480,
            "width": 854,
            "ext": "mp4",
            "filesize": 9437184,
            "filesize_str": "9.0 MB",
            "url": "https://www.w3schools.com/html/mov_bbb.mp4",
            "type": "video"
        },
        {
            "id": "360p",
            "label": "360p (SD Low)",
            "quality": "SD",
            "height": 360,
            "width": 640,
            "ext": "mp4",
            "filesize": 5242880,
            "filesize_str": "5.0 MB",
            "url": "https://www.w3schools.com/html/mov_bbb.mp4",
            "type": "video"
        },
        {
            "id": "audio_only",
            "label": "Audio Only (M4A/MP3)",
            "quality": "Audio",
            "height": None,
            "width": None,
            "ext": "m4a",
            "filesize": 2097152,
            "filesize_str": "2.0 MB",
            "url": "https://www.w3schools.com/html/mov_bbb.mp4",
            "type": "audio"
        }
    ]
}

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FBSave - Facebook Video Downloader HD</title>
  <meta name="description" content="Download Facebook videos and reels in 1080p Full HD, 720p, 480p, 360p or Audio with simple UI and best UX.">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#f0f7ff',
              100: '#e0effe',
              500: '#1877f2', // Facebook Blue
              600: '#0d65d9',
              700: '#0b52b3',
            }
          }
        }
      }
    }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .glass {
      background: rgba(18, 24, 38, 0.75);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .glass-card {
      background: rgba(23, 31, 48, 0.65);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.07);
    }
    .glow {
      box-shadow: 0 0 50px -10px rgba(24, 119, 242, 0.3);
    }
  </style>
</head>
<body class="bg-[#0b0f19] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-brand-500 selection:text-white">

  <!-- Background decorative glows -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-brand-500/20 via-blue-600/10 to-transparent blur-[120px] rounded-full"></div>
    <div class="absolute top-[35%] -left-32 w-96 h-96 bg-purple-600/10 blur-[140px] rounded-full"></div>
    <div class="absolute top-[45%] -right-32 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full"></div>
  </div>

  <!-- Navbar -->
  <header class="sticky top-0 z-50 glass border-b border-white/5">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-blue-400 flex items-center justify-center shadow-lg shadow-brand-500/25">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
        <div>
          <span class="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">FBSave</span>
          <span class="ml-1.5 px-2 py-0.5 text-[11px] font-semibold tracking-wide bg-brand-500/20 text-brand-400 border border-brand-500/30 rounded-full">HD Quality</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button onclick="loadSample()" class="text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-all flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          Try Sample Demo
        </button>
        <div class="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Ready & Free
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1 z-10 max-w-5xl mx-auto px-4 py-12 w-full flex flex-col items-center">
    
    <!-- Hero Section -->
    <div class="text-center max-w-2xl mx-auto mb-10">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-5">
        <svg class="w-4 h-4 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
        Universal Facebook Video & Reel Extractor
      </div>
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
        Facebook Video Downloader <br>
        <span class="bg-gradient-to-r from-brand-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">With Quality Choice</span>
      </h1>
      <p class="text-slate-400 text-base sm:text-lg">
        Download Facebook Reels, Watch videos, Stories, and Clips in <span class="text-slate-200 font-semibold">1080p FHD, 720p HD, SD</span> or direct <span class="text-slate-200 font-semibold">Audio MP3</span> with one click.
      </p>
    </div>

    <!-- Input Form Section (Best UX) -->
    <div class="w-full max-w-3xl mb-10">
      <form id="downloadForm" onsubmit="handleExtract(event)" class="glass p-2 sm:p-2.5 rounded-2xl shadow-2xl glow transition-all focus-within:border-brand-500/50">
        <div class="flex flex-col sm:flex-row items-center gap-2">
          
          <!-- Input field -->
          <div class="relative flex-1 w-full flex items-center">
            <div class="absolute left-4 text-slate-400 pointer-events-none">
              <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
            </div>
            <input 
              id="videoUrl" 
              type="text" 
              placeholder="Paste Facebook video, reel, or watch link here..." 
              required
              class="w-full pl-12 pr-20 py-3.5 bg-slate-900/60 text-white placeholder-slate-500 rounded-xl text-sm sm:text-base outline-none border border-transparent focus:border-brand-500/40 transition-all"
            />
            <!-- Paste & Clear actions -->
            <div class="absolute right-2 flex items-center gap-1">
              <button 
                type="button" 
                id="clearBtn"
                onclick="clearInput()" 
                class="hidden text-xs text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-all"
                title="Clear input"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <button 
                type="button" 
                onclick="pasteClipboard()" 
                class="text-xs font-medium text-brand-400 hover:text-brand-300 bg-brand-500/10 hover:bg-brand-500/20 px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1"
                title="Paste from clipboard"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                <span>Paste</span>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            id="submitBtn"
            class="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-brand-600 to-blue-500 hover:from-brand-500 hover:to-blue-400 text-white font-semibold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <span id="btnText">Get Video</span>
            <svg id="btnIcon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            <svg id="btnSpinner" class="hidden w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          </button>
        </div>
      </form>

      <!-- Quick helper tags -->
      <div class="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
        <span class="text-slate-500">Supports:</span>
        <span class="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">FB Reels</span>
        <span class="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">Watch Videos</span>
        <span class="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">Public Posts</span>
        <span class="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">fb.watch</span>
        <button onclick="loadSample()" class="text-brand-400 hover:underline ml-1">Try example video</button>
      </div>
    </div>

    <!-- Error Banner -->
    <div id="errorBox" class="hidden w-full max-w-3xl mb-8 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-sm flex items-start gap-3">
      <svg class="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <div class="flex-1">
        <div class="font-semibold text-rose-200">Unable to retrieve video</div>
        <div id="errorMessage" class="text-xs text-rose-300/90 mt-1">Please ensure the link is public and correctly formatted.</div>
      </div>
    </div>

    <!-- Results Section (Best UX & Quality Chooser) -->
    <div id="resultCard" class="hidden w-full max-w-3xl glass-card rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl border border-white/10">
      
      <!-- Video Details & Thumbnail -->
      <div class="flex flex-col md:flex-row gap-6 items-start pb-6 border-b border-white/10">
        
        <!-- Thumbnail with preview overlay -->
        <div class="relative w-full md:w-64 h-48 rounded-2xl overflow-hidden bg-slate-900 flex-shrink-0 group shadow-lg">
          <img id="resThumbnail" src="" alt="Video thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <!-- Duration pill -->
          <div id="resDuration" class="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold px-2 py-0.5 rounded-md">
            00:00
          </div>

          <!-- Play Preview button -->
          <button onclick="playPreview()" class="absolute inset-0 m-auto w-12 h-12 rounded-full bg-brand-500/90 hover:bg-brand-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all">
            <svg class="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </button>
        </div>

        <!-- Video Metadata -->
        <div class="flex-1 flex flex-col justify-between h-full">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-2.5">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Facebook Verified Stream
            </div>
            <h2 id="resTitle" class="text-lg sm:text-xl font-bold text-white line-clamp-2 leading-snug mb-2">
              Video Title
            </h2>
            <div class="flex items-center gap-2 text-sm text-slate-400">
              <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <span id="resUploader" class="text-slate-300 font-medium">Uploader Name</span>
            </div>
          </div>

          <div class="mt-4 pt-3 flex items-center gap-2">
            <span class="text-xs text-slate-400">Status:</span>
            <span class="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Ready to download
            </span>
          </div>
        </div>
      </div>

      <!-- Quality Choose Option (Key User Requirement) -->
      <div class="pt-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
              Choose Video Quality
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">Select your desired resolution or audio extraction:</p>
          </div>
          <span class="text-xs text-slate-500" id="formatCount">0 options available</span>
        </div>

        <!-- Quality Options Grid -->
        <div id="qualityOptionsGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <!-- Dynamically populated cards -->
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <!-- Download Selected Quality -->
          <button 
            id="downloadActionBtn"
            onclick="triggerDownload()" 
            class="w-full sm:flex-1 py-4 px-6 bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-brand-500/25 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            <span id="downloadBtnText">Download Selected (1080p HD)</span>
          </button>

          <!-- Copy Direct Link -->
          <button 
            onclick="copySelectedLink()" 
            class="w-full sm:w-auto py-4 px-5 bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-sm rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2"
            title="Copy Direct Video Link"
          >
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
            <span>Copy Link</span>
          </button>

          <!-- Open in Tab -->
          <button 
            onclick="openSelectedLink()" 
            class="w-full sm:w-auto py-4 px-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-medium text-sm rounded-2xl border border-white/10 transition-all flex items-center justify-center"
            title="Open in new tab"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <div id="videoModal" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-white/10 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
        <div class="p-4 border-b border-white/10 flex items-center justify-between">
          <h4 class="font-bold text-white text-sm">Video Player Preview</h4>
          <button onclick="closePreview()" class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="p-2 bg-black flex items-center justify-center">
          <video id="modalVideoPlayer" controls class="max-h-[60vh] w-full rounded-lg"></video>
        </div>
      </div>
    </div>

    <!-- Features / Why Choose FB Save -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mb-16">
      <div class="glass-card p-6 rounded-2xl border border-white/5">
        <div class="w-10 h-10 rounded-xl bg-blue-500/10 text-brand-400 flex items-center justify-center mb-4">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        </div>
        <h3 class="font-bold text-white text-base mb-1.5">Full HD 1080p</h3>
        <p class="text-slate-400 text-xs leading-relaxed">Save videos in original maximum quality with crisp visuals and synchronized clear audio.</p>
      </div>

      <div class="glass-card p-6 rounded-2xl border border-white/5">
        <div class="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <h3 class="font-bold text-white text-base mb-1.5">Direct High-Speed</h3>
        <p class="text-slate-400 text-xs leading-relaxed">Powered by high-performance stream tunneling that triggers instant browser download prompts.</p>
      </div>

      <div class="glass-card p-6 rounded-2xl border border-white/5">
        <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
        </div>
        <h3 class="font-bold text-white text-base mb-1.5">Audio Extraction</h3>
        <p class="text-slate-400 text-xs leading-relaxed">Extract audio tracks directly into M4A/MP3 without downloading the entire heavy video.</p>
      </div>
    </div>

    <!-- How to use Steps (UX Enhancement) -->
    <div class="w-full max-w-4xl glass-card rounded-3xl p-8 mb-16 border border-white/5">
      <h3 class="text-center font-bold text-xl text-white mb-8">How to Download Facebook Videos in 3 Easy Steps</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex flex-col items-center text-center">
          <div class="w-12 h-12 rounded-2xl bg-brand-500/15 border border-brand-500/30 text-brand-400 font-extrabold text-lg flex items-center justify-center mb-4">
            1
          </div>
          <h4 class="font-bold text-white text-sm mb-1.5">Copy Facebook Link</h4>
          <p class="text-xs text-slate-400">Open Facebook, click "Share" on any Reel or Video, and tap "Copy Link".</p>
        </div>

        <div class="flex flex-col items-center text-center">
          <div class="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 font-extrabold text-lg flex items-center justify-center mb-4">
            2
          </div>
          <h4 class="font-bold text-white text-sm mb-1.5">Paste & Pick Quality</h4>
          <p class="text-xs text-slate-400">Paste the URL above. Choose your preferred quality (1080p, 720p, SD, or Audio).</p>
        </div>

        <div class="flex flex-col items-center text-center">
          <div class="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-extrabold text-lg flex items-center justify-center mb-4">
            3
          </div>
          <h4 class="font-bold text-white text-sm mb-1.5">Save to Device</h4>
          <p class="text-xs text-slate-400">Click "Download Selected" and the video will be saved directly into your device.</p>
        </div>
      </div>
    </div>

    <!-- FAQ Accordion -->
    <div class="w-full max-w-3xl glass-card rounded-3xl p-8 border border-white/5">
      <h3 class="font-bold text-xl text-white mb-6 text-center">Frequently Asked Questions</h3>
      <div class="space-y-4 text-sm">
        <details class="group bg-slate-900/40 p-4 rounded-xl border border-white/5 cursor-pointer">
          <summary class="font-semibold text-slate-200 list-none flex justify-between items-center">
            <span>Is this Facebook video downloader completely free?</span>
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="text-xs text-slate-400 mt-3 leading-relaxed">
            Yes! FBSave is 100% free with no account creation, subscription, or software installation needed.
          </p>
        </details>

        <details class="group bg-slate-900/40 p-4 rounded-xl border border-white/5 cursor-pointer">
          <summary class="font-semibold text-slate-200 list-none flex justify-between items-center">
            <span>Can I download Facebook Reels?</span>
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="text-xs text-slate-400 mt-3 leading-relaxed">
            Yes! Full support for Facebook Reels (`facebook.com/reel/...` and `fb.watch`), as well as Watch videos, stories, and mobile posts.
          </p>
        </details>

        <details class="group bg-slate-900/40 p-4 rounded-xl border border-white/5 cursor-pointer">
          <summary class="font-semibold text-slate-200 list-none flex justify-between items-center">
            <span>Why choose between 1080p and 720p?</span>
            <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p class="text-xs text-slate-400 mt-3 leading-relaxed">
            1080p (Full HD) gives the sharpest clarity for large displays and editing. 720p or 480p SD offers a much smaller file size for rapid downloading and mobile sharing.
          </p>
        </details>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="glass border-t border-white/5 py-8 mt-12 text-center text-xs text-slate-500">
    <div class="max-w-6xl mx-auto px-4">
      <p class="mb-2">FBSave is an independent educational tool and is not affiliated with Meta or Facebook.</p>
      <p>© 2026 FBSave Pro Downloader. All rights reserved.</p>
    </div>
  </footer>

  <!-- Toast Notification Container -->
  <div id="toast" class="fixed bottom-6 right-6 z-50 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none">
    <div class="glass px-4 py-3 rounded-xl shadow-2xl border border-brand-500/30 text-white text-xs font-semibold flex items-center gap-2">
      <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      <span id="toastMessage">Notification</span>
    </div>
  </div>

  <script>
    let currentVideoData = null;
    let selectedFormatIndex = 0;

    const videoUrlInput = document.getElementById('videoUrl');
    const clearBtn = document.getElementById('clearBtn');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
    const btnSpinner = document.getElementById('btnSpinner');
    const errorBox = document.getElementById('errorBox');
    const errorMessage = document.getElementById('errorMessage');
    const resultCard = document.getElementById('resultCard');

    videoUrlInput.addEventListener('input', () => {
      clearBtn.classList.toggle('hidden', !videoUrlInput.value);
    });

    function clearInput() {
      videoUrlInput.value = '';
      clearBtn.classList.add('hidden');
      videoUrlInput.focus();
    }

    async function pasteClipboard() {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          videoUrlInput.value = text.trim();
          clearBtn.classList.remove('hidden');
          showToast('Pasted link from clipboard!');
          handleExtract(new Event('submit'));
        }
      } catch (err) {
        showToast('Please allow clipboard access or paste manually');
      }
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      const toastMessage = document.getElementById('toastMessage');
      toastMessage.textContent = msg;
      toast.classList.remove('translate-y-20', 'opacity-0');
      setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
      }, 3000);
    }

    function setLoading(isLoading) {
      submitBtn.disabled = isLoading;
      if (isLoading) {
        btnText.textContent = 'Extracting...';
        btnIcon.classList.add('hidden');
        btnSpinner.classList.remove('hidden');
        errorBox.classList.add('hidden');
      } else {
        btnText.textContent = 'Get Video';
        btnIcon.classList.remove('hidden');
        btnSpinner.classList.add('hidden');
      }
    }

    async function handleExtract(e) {
      if (e) e.preventDefault();
      const url = videoUrlInput.value.trim();
      if (!url) return;

      setLoading(true);
      errorBox.classList.add('hidden');
      resultCard.classList.add('hidden');

      try {
        const response = await fetch('/api/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: url })
        });
        const data = await response.json();

        if (data.success && data.formats && data.formats.length > 0) {
          renderResult(data);
        } else {
          throw new Error(data.error || 'No downloadable streams found for this Facebook link. Ensure it is a public video.');
        }
      } catch (err) {
        errorBox.classList.remove('hidden');
        errorMessage.textContent = err.message || 'Failed to fetch video. Please check the URL.';
      } finally {
        setLoading(false);
      }
    }

    function renderResult(data) {
      currentVideoData = data;
      selectedFormatIndex = 0;

      // Populate metadata
      document.getElementById('resThumbnail').src = data.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';
      document.getElementById('resTitle').textContent = data.title || 'Facebook Video';
      document.getElementById('resUploader').textContent = data.uploader || 'Facebook Creator';
      document.getElementById('resDuration').textContent = data.duration || 'Video';
      document.getElementById('formatCount').textContent = `${data.formats.length} quality options`;

      // Render quality options grid
      const grid = document.getElementById('qualityOptionsGrid');
      grid.innerHTML = '';

      data.formats.forEach((fmt, idx) => {
        const isSelected = idx === 0;
        const isAudio = fmt.type === 'audio';
        const isHD = fmt.quality === 'HD';

        const card = document.createElement('div');
        card.id = `quality-opt-${idx}`;
        card.onclick = () => selectQuality(idx);
        card.className = `cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ${
          isSelected 
            ? 'bg-brand-500/15 border-brand-500 shadow-md shadow-brand-500/10' 
            : 'bg-slate-900/50 border-white/5 hover:border-white/20 hover:bg-slate-900/80'
        }`;

        card.innerHTML = `
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl ${isAudio ? 'bg-amber-500/15 text-amber-400' : isHD ? 'bg-brand-500/20 text-brand-400' : 'bg-slate-800 text-slate-300'} flex items-center justify-center font-bold text-xs">
              ${isAudio ? '🎵' : isHD ? 'HD' : 'SD'}
            </div>
            <div>
              <div class="font-bold text-sm text-white flex items-center gap-2">
                <span>${fmt.label}</span>
                ${isHD ? '<span class="px-1.5 py-0.5 text-[10px] font-semibold bg-brand-500/30 text-brand-300 rounded">Best</span>' : ''}
                ${isAudio ? '<span class="px-1.5 py-0.5 text-[10px] font-semibold bg-amber-500/30 text-amber-300 rounded">Audio</span>' : ''}
              </div>
              <div class="text-xs text-slate-400 mt-0.5">
                ${fmt.filesize_str || 'Direct MP4'} • ${fmt.ext.toUpperCase()}
              </div>
            </div>
          </div>
          
          <div class="w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-600'}">
            ${isSelected ? '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>' : ''}
          </div>
        `;
        grid.appendChild(card);
      });

      updateDownloadBtnLabel();
      resultCard.classList.remove('hidden');
      resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function selectQuality(idx) {
      if (!currentVideoData || !currentVideoData.formats) return;
      selectedFormatIndex = idx;
      
      currentVideoData.formats.forEach((_, i) => {
        const el = document.getElementById(`quality-opt-${i}`);
        if (!el) return;
        const isSelected = i === idx;
        
        el.className = `cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ${
          isSelected 
            ? 'bg-brand-500/15 border-brand-500 shadow-md shadow-brand-500/10' 
            : 'bg-slate-900/50 border-white/5 hover:border-white/20 hover:bg-slate-900/80'
        }`;
        
        const radioIndicator = el.querySelector('div:last-child');
        if (radioIndicator) {
          radioIndicator.className = `w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-600'}`;
          radioIndicator.innerHTML = isSelected ? '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>' : '';
        }
      });

      updateDownloadBtnLabel();
    }

    function updateDownloadBtnLabel() {
      if (!currentVideoData) return;
      const fmt = currentVideoData.formats[selectedFormatIndex];
      const btn = document.getElementById('downloadBtnText');
      btn.textContent = `Download ${fmt.label} (${fmt.ext.toUpperCase()})`;
    }

    function triggerDownload() {
      if (!currentVideoData) return;
      const fmt = currentVideoData.formats[selectedFormatIndex];
      if (!fmt || !fmt.url) return;

      const title = encodeURIComponent(currentVideoData.title || 'facebook_video');
      const quality = encodeURIComponent(fmt.label);
      const ext = encodeURIComponent(fmt.ext || 'mp4');
      const downloadUrl = `/api/download?url=${encodeURIComponent(fmt.url)}&title=${title}&quality=${quality}&ext=${ext}`;

      showToast(`Starting ${fmt.label} download...`);
      
      // Trigger native download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.setAttribute('download', `${currentVideoData.title || 'facebook_video'}_${fmt.quality}.${fmt.ext}`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    function copySelectedLink() {
      if (!currentVideoData) return;
      const fmt = currentVideoData.formats[selectedFormatIndex];
      if (!fmt || !fmt.url) return;
      
      navigator.clipboard.writeText(fmt.url).then(() => {
        showToast('Direct video link copied to clipboard!');
      }).catch(() => {
        showToast('Link copied');
      });
    }

    function openSelectedLink() {
      if (!currentVideoData) return;
      const fmt = currentVideoData.formats[selectedFormatIndex];
      if (!fmt || !fmt.url) return;
      window.open(fmt.url, '_blank');
    }

    function playPreview() {
      if (!currentVideoData) return;
      const fmt = currentVideoData.formats[selectedFormatIndex] || currentVideoData.formats[0];
      if (!fmt || !fmt.url) return;

      const modal = document.getElementById('videoModal');
      const player = document.getElementById('modalVideoPlayer');
      player.src = fmt.url;
      modal.classList.remove('hidden');
      player.play().catch(() => {});
    }

    function closePreview() {
      const modal = document.getElementById('videoModal');
      const player = document.getElementById('modalVideoPlayer');
      player.pause();
      player.src = '';
      modal.classList.add('hidden');
    }

    async function loadSample() {
      videoUrlInput.value = 'https://www.facebook.com/reel/sample-nature-drone';
      clearBtn.classList.remove('hidden');
      setLoading(true);
      errorBox.classList.add('hidden');
      try {
        const res = await fetch('/api/sample');
        const data = await res.json();
        renderResult(data);
        showToast('Loaded sample video demo!');
      } catch (err) {
        showToast('Loaded demo data');
      } finally {
        setLoading(false);
      }
    }
  </script>
</body>
</html>
"""

class FacebookDownloaderHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_HEAD(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        params = urllib.parse.parse_qs(parsed.query)

        if path == '/' or path == '/index.html':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(HTML_TEMPLATE.encode('utf-8'))
            return

        elif path == '/api/sample':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(SAMPLE_DATA).encode('utf-8'))
            return

        elif path == '/api/extract':
            urls = params.get('url')
            if not urls:
                self.send_json_error("Missing 'url' query parameter", 400)
                return
            target_url = urls[0]
            if "sample" in target_url:
                result = SAMPLE_DATA
            else:
                result = fbsave_core.extract_facebook_info(target_url)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode('utf-8'))
            return

        elif path == '/api/download':
            cdn_urls = params.get('url')
            if not cdn_urls:
                self.send_json_error("Missing 'url' parameter", 400)
                return
            cdn_url = cdn_urls[0]
            raw_title = params.get('title', ['facebook_video'])[0]
            quality = params.get('quality', ['HD'])[0]
            ext = params.get('ext', ['mp4'])[0]

            clean_title = "".join(c for c in raw_title if c.isalnum() or c in (' ', '-', '_')).strip()
            if not clean_title:
                clean_title = "facebook_video"
            filename = f"{clean_title}_{quality}.{ext}".replace(' ', '_')

            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Accept': '*/*'
            }
            if 'fbcdn.net' in cdn_url or 'facebook.com' in cdn_url:
                headers['Referer'] = 'https://www.facebook.com/'

            # Stream proxy from Facebook CDN
            try:
                req = urllib.request.Request(cdn_url, headers=headers)
                with urllib.request.urlopen(req, timeout=30) as remote_stream:
                    content_length = remote_stream.headers.get('Content-Length')
                    content_type = 'video/mp4' if ext == 'mp4' else 'audio/mp4'

                    self.send_response(200)
                    self.send_header('Content-Type', content_type)
                    self.send_header('Content-Disposition', f'attachment; filename="{filename}"')
                    if content_length:
                        self.send_header('Content-Length', content_length)
                    self.send_header('Accept-Ranges', 'bytes')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()

                    # Stream chunks
                    while True:
                        chunk = remote_stream.read(64 * 1024)
                        if not chunk:
                            break
                        self.wfile.write(chunk)
            except Exception as e:
                self.send_json_error(f"Download stream error: {str(e)}", 502)
            return

        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/extract':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            try:
                payload = json.loads(body) if body else {}
            except Exception:
                payload = {}
            target_url = payload.get('url', '').strip()
            if not target_url:
                self.send_json_error("Missing 'url' in request body", 400)
                return

            if "sample" in target_url:
                result = SAMPLE_DATA
            else:
                result = fbsave_core.extract_facebook_info(target_url)

            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode('utf-8'))
            return
        else:
            self.send_response(404)
            self.end_headers()

    def send_json_error(self, message, code=400):
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({'success': False, 'error': message}).encode('utf-8'))

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

def run():
    server = ThreadedHTTPServer(('0.0.0.0', PORT), FacebookDownloaderHandler)
    print(f"=====================================================")
    print(f"  FBSave - Facebook Video Downloader Server")
    print(f"  Local Web UI: http://localhost:{PORT}")
    print(f"  Network UI:  http://127.0.0.1:{PORT}")
    print(f"=====================================================")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        server.server_close()

if __name__ == '__main__':
    run()
