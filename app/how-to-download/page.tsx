import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "How to Download Facebook Videos - Complete Step-by-Step Guide",
  description:
    "Learn how to download and save Facebook videos and reels on iPhone, Android, Windows, and Mac in 1080p Full HD.",
};

export default function HowToDownloadPage() {
  const steps = [
    {
      num: "01",
      title: "Copy the Facebook Video Link",
      desc: "Open the Facebook app or website. Navigate to the Reel, Watch video, or post. Click the 'Share' button and tap 'Copy Link'.",
      tip: "Ensure the post privacy is Public (indicated by the globe icon 🌐).",
    },
    {
      num: "02",
      title: "Paste the URL into FBSave",
      desc: "Go to fbsave.net in any web browser. Paste the copied link into the search input box and hit 'Get Video'.",
      tip: "You can click the 'Paste' button to automatically read from clipboard.",
    },
    {
      num: "03",
      title: "Choose Format & Quality",
      desc: "Review available streams: Full HD 1080p, 720p HD, Standard 480p, or direct Audio MP3. Tap your preferred resolution.",
      tip: "1080p is recommended for the clearest visual experience on modern screens.",
    },
    {
      num: "04",
      title: "Save Directly to Device",
      desc: "Click 'Download' and your browser will immediately begin saving the video file to your default Downloads folder or Camera Roll.",
      tip: "On iPhone, Safari will prompt 'Do you want to download?'. Tap Download, then tap the Safari downloads icon to save to Photos.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-blue-600/20 via-cyan-500/10 to-transparent blur-[120px] rounded-full" />
      </div>

      <Header />

      <main className="flex-1 z-10 max-w-4xl mx-auto px-4 py-12 w-full">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-medium">How to Download</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold mb-4 shadow-sm">
            <span>📖</span>
            <span>Comprehensive Step-by-Step Guide</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            How to Download Facebook Videos <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
              In High Quality 1080p
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base">
            Saving videos from Facebook is quick and easy. Follow these simple instructions for mobile and desktop.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="space-y-6 mb-16">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-[#131b2d]/65 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/5 flex flex-col sm:flex-row items-start gap-6 shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-black text-xl flex items-center justify-center flex-shrink-0">
                {s.num}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">{s.desc}</p>
                <div className="inline-flex items-center gap-1.5 text-xs text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
                  <span className="font-semibold">💡 Tip:</span>
                  <span>{s.tip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Device-Specific Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-[#171f30]/65 backdrop-blur-md p-6 rounded-2xl border border-white/5">
            <h4 className="font-bold text-white text-base mb-3 flex items-center gap-2">
              <span>📱</span>
              <span>On iPhone & iPad (iOS)</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
              <li>Open Safari (recommended browser for iOS downloads).</li>
              <li>Paste the Facebook URL into FBSave and hit download.</li>
              <li>Safari will ask for permission; tap &quot;Download&quot;.</li>
              <li>Tap the Downloads icon in Safari address bar, tap the file, then tap &quot;Save Video&quot; to export to Photos.</li>
            </ul>
          </div>

          <div className="bg-[#171f30]/65 backdrop-blur-md p-6 rounded-2xl border border-white/5">
            <h4 className="font-bold text-white text-base mb-3 flex items-center gap-2">
              <span>🤖</span>
              <span>On Android & Windows/Mac</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
              <li>Open Chrome, Firefox, or Edge.</li>
              <li>Paste the link and pick your preferred resolution (1080p / 720p).</li>
              <li>The MP4 video downloads directly to your device&apos;s Downloads folder.</li>
              <li>Play instantly with VLC or your gallery app.</li>
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-[#131b2d]/65 backdrop-blur-md p-8 rounded-3xl border border-white/5">
          <h3 className="text-lg font-bold text-white mb-2">Ready to test it out?</h3>
          <p className="text-xs text-slate-400 mb-4">Paste your first video link now.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
          >
            <span>Go to Downloader</span>
            <span>→</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
