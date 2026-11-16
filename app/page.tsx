import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DownloaderBox from "./components/DownloaderBox";

export const metadata = {
  title: "Facebook Video Downloader - Save FB Videos & Reels in 1080p Full HD",
  description:
    "Free Facebook Video Downloader. Save Facebook Reels, Watch videos, Stories, and audio in 1080p Full HD, 720p, or MP3 with zero watermark. Fast, safe, and online.",
  alternates: {
    canonical: "https://fbsave.net",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How to download Facebook videos in 1080p Full HD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Copy the link of any public Facebook video or reel, paste it into FBSave Pro's search bar, click 'Get Video', select the 1080p HD format, and click Download. Your browser will save the full high-definition video directly to your device."
      }
    },
    {
      "@type": "Question",
      "name": "Can I download Facebook Reels with original audio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! FBSave Pro automatically merges and synchronizes high-quality original background music, voiceovers, and sound effects with the 1080p video stream."
      }
    },
    {
      "@type": "Question",
      "name": "Is FBSave Pro completely free without watermarks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, FBSave Pro is 100% free with unlimited downloads. All saved MP4 videos and MP3 audio files are completely clean with zero added watermarks, logos, or restrictions."
      }
    },
    {
      "@type": "Question",
      "name": "How do I save Facebook videos on iPhone or Android?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open Safari on iPhone or Chrome on Android, visit fbsave.net, paste your Facebook video URL, and hit Download. On iPhone, Safari will download the MP4 file to your Downloads folder, where you can tap 'Save Video' to add it to your Camera Roll."
      }
    },
    {
      "@type": "Question",
      "name": "Can I convert Facebook videos to MP3 audio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, FBSave Pro includes a dedicated Facebook to MP3 audio converter. Simply paste your link and select the 'Audio' stream option to download high-fidelity 320kbps/128kbps audio."
      }
    },
    {
      "@type": "Question",
      "name": "Why choose FBSave Pro over SaveFrom or SnapSave?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FBSave Pro features a clean modern interface without intrusive pop-up ads, malware warnings, or mandatory app installations. It also provides true 1080p streams with synced sound where other tools often produce muted files."
      }
    }
  ]
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            <h3 className="font-bold text-white text-base mb-1.5">Full HD 1080p & 4K</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Extract and save Facebook reels and videos in true 1080p, 720p HD, and 4K with crystal clear synced audio.
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
              High-speed direct streaming tunnel bypasses CORS limits and saves directly into your device downloads.
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
            <h3 className="font-bold text-white text-base mb-1.5">Audio & MP3 Extractor</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Extract high-bitrate M4A/MP3 sound directly from Facebook videos without downloading the whole video file.
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

        {/* SEO In-Depth Guide & Keyword Section */}
        <section className="w-full max-w-4xl space-y-12 mb-16">
          {/* Section: Why FBSave Pro */}
          <div className="bg-[#131b2d]/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/5 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              The Best Online Facebook Video Downloader in 2026
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              <strong>FBSave Pro</strong> is engineered to provide the fastest, safest, and highest-quality way to
              download videos from Facebook. Whether you want to save trending <strong>Facebook Reels</strong>, archive
              heartfelt <strong>Stories</strong>, keep educational <strong>Watch series</strong>, or extract background
              music into an <strong>MP3 file</strong>, our cloud parser decodes the highest bitrate stream available on
              Facebook&apos;s Content Delivery Network.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                <span className="text-cyan-400 text-lg">✨</span>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">True 1080p Full HD</h3>
                  <p className="text-slate-400">
                    Unlike standard web downloaders that compromise on 480p SD, FBSave Pro parses true 1080p and 720p HD
                    streams with full sound.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                <span className="text-cyan-400 text-lg">🛡️</span>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">Zero Watermarks & Clean MP4</h3>
                  <p className="text-slate-400">
                    No added logos or branding. You receive the exact original video file as uploaded by the content creator.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                <span className="text-cyan-400 text-lg">⚡</span>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">No Software or Extension Needed</h3>
                  <p className="text-slate-400">
                    Runs directly in your browser on iPhone (Safari), Android (Chrome), Windows, Mac, and Linux.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                <span className="text-cyan-400 text-lg">🎵</span>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">Instant Facebook to MP3</h3>
                  <p className="text-slate-400">
                    Extract speeches, podcasts, music, and voiceovers directly into audio tracks with one click.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Comparison Matrix */}
          <div className="bg-[#131b2d]/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/5 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              FBSave Pro vs. Other Facebook Video Downloaders
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Compare features, video resolutions, and user safety with typical download tools:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Feature</th>
                    <th className="py-3 px-4 text-cyan-400 font-bold bg-cyan-500/10 rounded-t-xl">FBSave Pro</th>
                    <th className="py-3 px-4">SaveFrom / FDown</th>
                    <th className="py-3 px-4">Other Online Scrapers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">1080p Full HD Resolution</td>
                    <td className="py-3 px-4 font-bold text-emerald-400 bg-cyan-500/5">✅ Yes (Full HD)</td>
                    <td className="py-3 px-4 text-slate-400">⚠️ Often SD 480p only</td>
                    <td className="py-3 px-4 text-slate-400">❌ Muted or missing</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Audio Sync with Video</td>
                    <td className="py-3 px-4 font-bold text-emerald-400 bg-cyan-500/5">✅ Synced original sound</td>
                    <td className="py-3 px-4 text-slate-400">⚠️ Sometimes silent</td>
                    <td className="py-3 px-4 text-slate-400">❌ Missing audio track</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Intrusive Pop-up Ads</td>
                    <td className="py-3 px-4 font-bold text-emerald-400 bg-cyan-500/5">✅ Zero pop-up ads</td>
                    <td className="py-3 px-4 text-rose-400">❌ Aggressive pop-unders</td>
                    <td className="py-3 px-4 text-rose-400">❌ Redirect ads</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Direct MP3 Audio Conversion</td>
                    <td className="py-3 px-4 font-bold text-emerald-400 bg-cyan-500/5">✅ Built-in 320kbps</td>
                    <td className="py-3 px-4 text-slate-400">⚠️ Separate website required</td>
                    <td className="py-3 px-4 text-slate-400">❌ Not supported</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">iPhone & Android Mobile Ready</td>
                    <td className="py-3 px-4 font-bold text-emerald-400 bg-cyan-500/5">✅ Native browser direct save</td>
                    <td className="py-3 px-4 text-slate-400">⚠️ Requires companion app</td>
                    <td className="py-3 px-4 text-slate-400">⚠️ Broken on iOS Safari</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Pricing & Registration</td>
                    <td className="py-3 px-4 font-bold text-emerald-400 bg-cyan-500/5">✅ 100% Free & Unlimited</td>
                    <td className="py-3 px-4 text-slate-400">Free with heavy ads</td>
                    <td className="py-3 px-4 text-slate-400">Paid tiers / limitations</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Frequently Asked Questions (FAQ) */}
          <div className="bg-[#131b2d]/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/5 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Quick answers about downloading Facebook reels, watch videos, audio, and formats:
            </p>

            <div className="space-y-4">
              {faqSchema.mainEntity.map((item, idx) => (
                <div key={idx} className="bg-slate-900/50 p-5 rounded-2xl border border-white/5">
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 flex items-center gap-2">
                    <span className="text-cyan-400 font-extrabold text-xs">Q:</span>
                    <span>{item.name}</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed pl-5">{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Search Keywords & Direct Tool Links */}
          <div className="bg-[#131b2d]/70 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-xl text-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Popular Tools & Search Queries
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/reels-downloader"
                className="bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 px-3.5 py-2 rounded-xl border border-white/10 text-xs font-medium transition-all"
              >
                Facebook Reels Downloader
              </Link>
              <Link
                href="/story-downloader"
                className="bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 px-3.5 py-2 rounded-xl border border-white/10 text-xs font-medium transition-all"
              >
                Facebook Story Downloader
              </Link>
              <Link
                href="/video-to-mp3"
                className="bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 px-3.5 py-2 rounded-xl border border-white/10 text-xs font-medium transition-all"
              >
                Facebook to MP3 Converter
              </Link>
              <Link
                href="/how-to-download"
                className="bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 px-3.5 py-2 rounded-xl border border-white/10 text-xs font-medium transition-all"
              >
                How to Download FB Videos
              </Link>
              <Link
                href="/faq"
                className="bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 px-3.5 py-2 rounded-xl border border-white/10 text-xs font-medium transition-all"
              >
                Download Troubleshooting & FAQ
              </Link>
              <Link
                href="/sitemap"
                className="bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 px-3.5 py-2 rounded-xl border border-blue-500/30 text-xs font-semibold transition-all"
              >
                Complete Visual Site Map 🗺️
              </Link>
            </div>
          </div>
        </section>

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
                  Catalog
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
