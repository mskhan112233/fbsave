import Header from "../components/Header";
import Footer from "../components/Footer";
import DownloaderBox from "../components/DownloaderBox";

export const metadata = {
  title: "Facebook to MP3 - Extract Audio from Facebook Videos",
  description:
    "Extract 320kbps MP3 / M4A audio tracks from Facebook videos and reels online for free without downloading the full video.",
};

export default function VideoToMp3Page() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-amber-600/15 via-blue-600/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[35%] -left-32 w-96 h-96 bg-cyan-600/10 blur-[140px] rounded-full" />
      </div>

      <Header />

      <main className="flex-1 z-10 max-w-5xl mx-auto px-4 py-12 w-full flex flex-col items-center">
        <DownloaderBox
          badgeText="Facebook Audio & MP3 Extractor"
          headline={
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Facebook to MP3 Converter <br />
              <span className="bg-gradient-to-r from-amber-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
                High Quality Audio Tracks
              </span>
            </h1>
          }
          subtitle={
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
              Rip music, podcasts, lectures, and speech from Facebook videos directly into clean{" "}
              <span className="text-amber-300 font-semibold">M4A & MP3 audio</span> files in seconds.
            </p>
          }
          placeholder="Paste Facebook video link to extract audio..."
          sampleUrl="https://www.facebook.com/reel/sample-nature-drone"
          sampleLabel="Try Demo Audio"
          supportedBadges={["MP3 Format", "M4A Audio", "320kbps", "128kbps", "Original Sound"]}
        />
      </main>

      <Footer />
    </div>
  );
}
