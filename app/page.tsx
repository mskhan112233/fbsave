import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DownloaderBox from "./components/DownloaderBox";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white relative">
      {/* Decorative backdrop gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-blue-600/20 via-blue-500/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[35%] -left-32 w-96 h-96 bg-purple-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-[45%] -right-32 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full" />
      </div>

      {/* Main Header with Logo and Navigation */}
      <Header />

      {/* Main Body */}
      <main className="flex-1 z-10 max-w-5xl mx-auto px-4 py-12 w-full flex flex-col items-center">
        {/* Core Downloader Component */}
        <DownloaderBox />

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mb-16">
          <div className="bg-[#171f30]/65 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-cyan-400 flex items-center justify-center mb-4">
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
              Extract and save Facebook reels and videos in true 1080p or 720p HD with crystal clear synced audio.
            </p>
          </div>

          <div className="bg-[#171f30]/65 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl hover:border-blue-500/30 transition-all">
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

          <div className="bg-[#171f30]/65 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl hover:border-emerald-500/30 transition-all">
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
        <div className="w-full max-w-4xl bg-[#171f30]/65 backdrop-blur-md rounded-3xl p-8 mb-16 border border-white/5 shadow-xl">
          <h3 className="text-center font-bold text-xl text-white mb-8">How to Download Facebook Videos in 3 Easy Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-cyan-400 font-extrabold text-lg flex items-center justify-center mb-4">
                1
              </div>
              <h4 className="font-bold text-white text-sm mb-1.5">Copy Facebook Link</h4>
              <p className="text-xs text-slate-400">Open Facebook, click &quot;Share&quot; on any Reel or Video, and tap &quot;Copy Link&quot;.</p>
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
              <p className="text-xs text-slate-400">Click &quot;Download&quot; and the video will be saved directly to your computer or mobile.</p>
            </div>
          </div>
        </div>

        {/* Site Map & Directory Banner */}
        <div className="w-full max-w-4xl bg-gradient-to-r from-blue-900/30 via-slate-900/40 to-cyan-900/30 border border-cyan-500/20 rounded-3xl p-8 mb-12 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-2xl flex-shrink-0">
              🗺️
            </div>
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span>Explore the Complete FBSave Site Map</span>
                <span className="text-[10px] uppercase font-bold bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  New
                </span>
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-lg">
                Browse our directory of specialized tools: Reels Downloader, Story Saver, Audio Extractor, step-by-step
                guides, and XML feeds.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <Link
              href="/sitemap"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Site Map</span>
              <span>→</span>
            </Link>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs rounded-xl border border-white/10 transition-all"
              title="Search engine XML feed"
            >
              sitemap.xml
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
