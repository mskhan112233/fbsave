"use client";

import { useState } from "react";

interface FormatOption {
  id: string;
  label: string;
  quality: "HD" | "SD" | "Audio";
  height?: number | null;
  width?: number | null;
  ext: string;
  filesize?: number | null;
  filesize_str?: string;
  url: string;
  type: "video" | "audio";
}

interface VideoMetadata {
  success: boolean;
  title?: string;
  thumbnail?: string;
  duration?: string;
  duration_seconds?: number;
  uploader?: string;
  source_url?: string;
  formats?: FormatOption[];
  error?: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoMetadata | null>(null);
  const [selectedFormatIndex, setSelectedFormatIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        showToast("Pasted link from clipboard!");
        fetchVideo(text.trim());
      }
    } catch {
      showToast("Please allow clipboard permission or paste manually");
    }
  };

  const fetchVideo = async (targetUrl: string) => {
    if (!targetUrl) return;
    setLoading(true);
    setError(null);
    setVideoData(null);

    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });
      const data = await res.json();

      if (data.success && data.formats && data.formats.length > 0) {
        setVideoData(data);
        setSelectedFormatIndex(0);
        showToast("Video streams extracted successfully!");
      } else {
        throw new Error(data.error || "No downloadable video streams found. Ensure the video is public.");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to process Facebook link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVideo(url.trim());
  };

  const loadSample = () => {
    setUrl("https://www.facebook.com/reel/sample-nature-drone");
    fetchVideo("https://www.facebook.com/reel/sample-nature-drone");
  };

  const selectedFormat = videoData?.formats?.[selectedFormatIndex];

  const handleDownload = () => {
    if (!videoData || !selectedFormat) return;
    const downloadUrl = `/api/download?url=${encodeURIComponent(selectedFormat.url)}&title=${encodeURIComponent(
      videoData.title || "facebook_video"
    )}&quality=${encodeURIComponent(selectedFormat.label)}&ext=${encodeURIComponent(selectedFormat.ext)}`;

    showToast(`Downloading ${selectedFormat.label}...`);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.setAttribute("download", `${videoData.title || "facebook_video"}_${selectedFormat.quality}.${selectedFormat.ext}`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyLink = () => {
    if (!selectedFormat) return;
    navigator.clipboard.writeText(selectedFormat.url).then(() => {
      showToast("Direct video URL copied to clipboard!");
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white relative">
      {/* Decorative backdrop gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-blue-600/20 via-blue-500/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[35%] -left-32 w-96 h-96 bg-purple-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-[45%] -right-32 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#121826]/75 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                FBSave Pro
              </span>
              <span className="ml-1.5 px-2 py-0.5 text-[11px] font-semibold tracking-wide bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                HD & 1080p
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadSample}
              className="text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Try Sample Reel
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Free & Fast
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 z-10 max-w-5xl mx-auto px-4 py-12 w-full flex flex-col items-center">
        {/* Hero Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-5">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            High Definition Facebook Video Downloader
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Facebook Video Downloader <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              With Quality Options
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Download Facebook Reels, Watch videos, Stories, and Clips in{" "}
            <span className="text-slate-200 font-semibold">1080p Full HD, 720p, 480p, SD</span> or direct{" "}
            <span className="text-slate-200 font-semibold">Audio MP3</span> with zero hassle.
          </p>
        </div>

        {/* Input Bar Section */}
        <div className="w-full max-w-3xl mb-10">
          <form
            onSubmit={handleSubmit}
            className="bg-[#121826]/75 backdrop-blur-md border border-white/10 p-2 sm:p-2.5 rounded-2xl shadow-2xl transition-all focus-within:border-blue-500/50"
          >
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full flex items-center">
                <div className="absolute left-4 text-slate-400 pointer-events-none">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste Facebook video, reel, or watch link here..."
                  required
                  className="w-full pl-12 pr-20 py-3.5 bg-slate-900/60 text-white placeholder-slate-500 rounded-xl text-sm sm:text-base outline-none border border-transparent focus:border-blue-500/40 transition-all"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  {url && (
                    <button
                      type="button"
                      onClick={() => setUrl("")}
                      className="text-xs text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                      title="Clear"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="text-xs font-medium text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    title="Paste from clipboard"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <span>Paste</span>
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-semibold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span>Extracting...</span>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Get Video</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick format tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
            <span className="text-slate-500">Supports:</span>
            <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">FB Reels</span>
            <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">Watch Videos</span>
            <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">Public Posts</span>
            <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">fb.watch</span>
            <button onClick={loadSample} className="text-blue-400 hover:underline ml-1 cursor-pointer">
              Try example video
            </button>
          </div>
        </div>

        {/* Error Box */}
        {error && (
          <div className="w-full max-w-3xl mb-8 p-5 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-300 text-sm flex items-start gap-3 shadow-lg">
            <svg className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <div className="font-semibold text-rose-200">Unable to retrieve video</div>
              <div className="text-xs text-rose-300/90 mt-1 leading-relaxed">{error}</div>
              <div className="mt-3 pt-3 border-t border-rose-500/20 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-slate-400">💡 Tip: Make sure the video is public (not in a private group or friends-only).</span>
                <button
                  type="button"
                  onClick={loadSample}
                  className="text-xs font-semibold text-white bg-rose-500/20 hover:bg-rose-500/30 px-3 py-1.5 rounded-lg border border-rose-500/30 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Try Demo Reel</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Result Card & Quality Chooser */}
        {videoData && (
          <div className="w-full max-w-3xl bg-[#171f30]/65 backdrop-blur-md rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl border border-white/10">
            {/* Video Overview */}
            <div className="flex flex-col md:flex-row gap-6 items-start pb-6 border-b border-white/10">
              {/* Thumbnail */}
              <div className="relative w-full md:w-64 h-48 rounded-2xl overflow-hidden bg-slate-900 flex-shrink-0 group shadow-lg">
                <img
                  src={
                    videoData.thumbnail ||
                    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                  }
                  alt="Video thumbnail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold px-2 py-0.5 rounded-md">
                  {videoData.duration || "Video"}
                </div>
                <button
                  onClick={() => setPreviewOpen(true)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all cursor-pointer"
                  title="Play Preview"
                >
                  <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              {/* Title & Info */}
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-2.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    Facebook Verified Stream
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white line-clamp-2 leading-snug mb-2">
                    {videoData.title || "Facebook Video"}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-slate-300 font-medium">{videoData.uploader || "Facebook Creator"}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center gap-2">
                  <span className="text-xs text-slate-400">Status:</span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Ready to download
                  </span>
                </div>
              </div>
            </div>

            {/* Quality Options Section (Quality Choice) */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                    Choose Video Quality
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Select resolution or audio extraction:</p>
                </div>
                <span className="text-xs text-slate-500">{videoData.formats?.length || 0} quality options</span>
              </div>

              {/* Grid of quality options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {videoData.formats?.map((fmt, idx) => {
                  const isSelected = selectedFormatIndex === idx;
                  const isAudio = fmt.type === "audio";
                  const isHD = fmt.quality === "HD";

                  return (
                    <div
                      key={fmt.id || idx}
                      onClick={() => setSelectedFormatIndex(idx)}
                      className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-blue-600/15 border-blue-500 shadow-md shadow-blue-500/10"
                          : "bg-slate-900/50 border-white/5 hover:border-white/20 hover:bg-slate-900/80"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl ${
                            isAudio
                              ? "bg-amber-500/15 text-amber-400"
                              : isHD
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-slate-800 text-slate-300"
                          } flex items-center justify-center font-bold text-xs`}
                        >
                          {isAudio ? "🎵" : isHD ? "HD" : "SD"}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white flex items-center gap-2">
                            <span>{fmt.label}</span>
                            {isHD && (
                              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-blue-500/30 text-blue-300 rounded">
                                Best
                              </span>
                            )}
                            {isAudio && (
                              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-amber-500/30 text-amber-300 rounded">
                                Audio
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            {fmt.filesize_str || "Direct MP4"} • {fmt.ext.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-blue-500 bg-blue-500 text-white" : "border-slate-600"
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handleDownload}
                  className="w-full sm:flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download {selectedFormat?.label || "Selected"}</span>
                </button>

                <button
                  onClick={copyLink}
                  className="w-full sm:w-auto py-4 px-5 bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-sm rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  title="Copy Direct Video Link"
                >
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  <span>Copy Link</span>
                </button>

                {selectedFormat?.url && (
                  <a
                    href={selectedFormat.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto py-4 px-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-medium text-sm rounded-2xl border border-white/10 transition-all flex items-center justify-center cursor-pointer"
                    title="Open in new tab"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Video Preview Modal */}
        {previewOpen && selectedFormat?.url && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">Video Player Preview</h4>
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-2 bg-black flex items-center justify-center">
                <video src={selectedFormat.url} controls autoPlay className="max-h-[60vh] w-full rounded-lg" />
              </div>
            </div>
          </div>
        )}

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mb-16">
          <div className="bg-[#171f30]/65 backdrop-blur-md p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-white text-base mb-1.5">Full HD 1080p</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Extract and save Facebook reels and videos in true 1080p or 720p HD with synced audio.
            </p>
          </div>

          <div className="bg-[#171f30]/65 backdrop-blur-md p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-white text-base mb-1.5">Direct Fast Tunnel</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Direct streaming download prompts save files directly into your downloads directory without CORS blocks.
            </p>
          </div>

          <div className="bg-[#171f30]/65 backdrop-blur-md p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <h3 className="font-bold text-white text-base mb-1.5">Audio Extraction</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Extract high bitrate M4A/MP3 sound directly from Facebook videos without downloading the whole video.
            </p>
          </div>
        </div>

        {/* 3 Step Guide */}
        <div className="w-full max-w-4xl bg-[#171f30]/65 backdrop-blur-md rounded-3xl p-8 mb-16 border border-white/5">
          <h3 className="text-center font-bold text-xl text-white mb-8">How to Download Facebook Videos in 3 Easy Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 font-extrabold text-lg flex items-center justify-center mb-4">
                1
              </div>
              <h4 className="font-bold text-white text-sm mb-1.5">Copy Facebook Link</h4>
              <p className="text-xs text-slate-400">Open Facebook, click "Share" on any Reel or Video, and tap "Copy Link".</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 font-extrabold text-lg flex items-center justify-center mb-4">
                2
              </div>
              <h4 className="font-bold text-white text-sm mb-1.5">Paste & Pick Quality</h4>
              <p className="text-xs text-slate-400">Paste the URL above. Choose your preferred quality (1080p, 720p, SD, or Audio).</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-extrabold text-lg flex items-center justify-center mb-4">
                3
              </div>
              <h4 className="font-bold text-white text-sm mb-1.5">Save to Device</h4>
              <p className="text-xs text-slate-400">Click "Download" and the video will be saved directly to your computer.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#121826]/75 backdrop-blur-md border-t border-white/5 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4">
          <p className="mb-2">FBSave is an independent educational tool and is not affiliated with Meta or Facebook.</p>
          <p>© 2026 FBSave Pro Downloader. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-[#121826]/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-2xl border border-blue-500/30 text-white text-xs font-semibold flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
