import Header from "../components/Header";
import Footer from "../components/Footer";
import DownloaderBox from "../components/DownloaderBox";

export const metadata = {
  title: "Facebook Reels Downloader - Save FB Reels in 1080p HD with Audio",
  description:
    "Free Facebook Reels Downloader. Download FB Reels videos in 1080p Full HD, 720p, or MP3 audio directly to your iPhone, Android, or PC.",
};

export default function ReelsDownloaderPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white relative">
      {/* Decorative backdrop gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-blue-600/20 via-cyan-500/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[35%] -left-32 w-96 h-96 bg-purple-600/10 blur-[140px] rounded-full" />
      </div>

      <Header />

      <main className="flex-1 z-10 max-w-5xl mx-auto px-4 py-12 w-full flex flex-col items-center">
        <DownloaderBox
          badgeText="Specialized Facebook Reels Downloader"
          headline={
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Facebook Reels Downloader <br />
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
                With Original Audio & 1080p HD
              </span>
            </h1>
          }
          subtitle={
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
              Extract and save any public Facebook Reel in stunning{" "}
              <span className="text-slate-200 font-semibold">1080p Full HD</span> with crisp synchronized sound. Fast,
              free, and with no watermark.
            </p>
          }
          placeholder="Paste Facebook Reel link (e.g., https://www.facebook.com/reel/...)"
          sampleUrl="https://www.facebook.com/reel/sample-nature-drone"
          sampleLabel="Try Demo Reel"
          supportedBadges={["FB Reels", "Mobile Reels", "Creator Shorts", "Original Audio Track", "1080p 60fps"]}
        />

        {/* Informational content section */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-16">
          <div className="bg-[#171f30]/65 backdrop-blur-md p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-cyan-400 flex items-center justify-center mb-4 text-xl">
              ⚡
            </div>
            <h3 className="font-bold text-white text-base mb-1.5">No Watermark</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Download clean raw Facebook reels without annoying watermarks or promotional logos.
            </p>
          </div>

          <div className="bg-[#171f30]/65 backdrop-blur-md p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 text-xl">
              🔊
            </div>
            <h3 className="font-bold text-white text-base mb-1.5">Full Audio Sync</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Always captures the original trending sound or music track merged seamlessly with video.
            </p>
          </div>

          <div className="bg-[#171f30]/65 backdrop-blur-md p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 text-xl">
              📱
            </div>
            <h3 className="font-bold text-white text-base mb-1.5">Mobile Friendly</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Works directly in Safari on iOS, Chrome on Android, and all desktop operating systems.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
