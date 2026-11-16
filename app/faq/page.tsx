import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Facebook Video Downloader FAQ & Troubleshooting - FBSave",
  description:
    "Common questions, troubleshooting tips, and answers about downloading Facebook videos, Reels, sound, and private posts.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Is FBSave Pro completely free to use?",
      a: "Yes! FBSave is 100% free with no hidden charges, subscription tiers, or download limits. You can download as many videos and reels as you need.",
    },
    {
      q: "Can I download private Facebook videos?",
      a: "Due to Facebook's security and privacy restrictions, only videos posted publicly (with the globe 🌐 privacy icon) can be retrieved by our automated parser. Private videos in closed groups or friends-only posts cannot be accessed.",
    },
    {
      q: "Does FBSave store or keep copies of the downloaded videos?",
      a: "No. FBSave does not host or store any videos or audio on its servers. All media streams directly from Facebook's Content Delivery Network (CDN) to your device through an encrypted tunnel.",
    },
    {
      q: "Why do some videos not have a 1080p Full HD option?",
      a: "The available qualities depend on the original video uploaded to Facebook. If the creator uploaded in 720p or 480p, that is the maximum resolution Facebook processed and made available.",
    },
    {
      q: "Where are the downloaded files saved on my device?",
      a: "Files are automatically saved to your device's default 'Downloads' folder. On iPhone/iPad, you can open the Files app or use Safari's download manager to save the file into your Camera Roll/Photos app.",
    },
    {
      q: "Do downloaded videos have watermarks?",
      a: "No. All MP4 video streams extracted via FBSave Pro are clean, high-bitrate files with zero watermarks or added logos.",
    },
    {
      q: "How can I extract only the audio (MP3) from a Facebook video?",
      a: "Paste the video link into our downloader and select the 'Audio' or 'M4A/MP3' stream option. You can also visit our dedicated /video-to-mp3 tool.",
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
          <span className="text-slate-200 font-medium">FAQ & Troubleshooting</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold mb-4 shadow-sm">
            <span>❓</span>
            <span>Frequently Asked Questions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Got Questions? <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
              We&apos;ve Got Answers
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about downloading Facebook videos, formats, and troubleshooting errors.
          </p>
        </div>

        {/* FAQs List */}
        <div className="space-y-4 mb-16">
          {faqs.map((f, idx) => (
            <div key={idx} className="bg-[#131b2d]/65 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-md">
              <h3 className="text-base font-bold text-white mb-2 flex items-start gap-2.5">
                <span className="text-cyan-400 font-extrabold">Q:</span>
                <span>{f.q}</span>
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-6">{f.a}</p>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="text-center bg-[#131b2d]/65 backdrop-blur-md p-8 rounded-3xl border border-white/5">
          <h3 className="text-lg font-bold text-white mb-2">Still need help or encountering an issue?</h3>
          <p className="text-xs text-slate-400 mb-4">
            Check that the video is public and valid, or explore our complete site directory.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sitemap"
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl border border-white/10 transition-all"
            >
              Explore Site Map
            </Link>
            <Link
              href="/"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
            >
              Try Downloader
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
