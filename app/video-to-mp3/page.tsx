import Header from "../components/Header";
import Footer from "../components/Footer";
import DownloaderBox from "../components/DownloaderBox";

export const metadata = {
  title: "Facebook to MP3 - Convert & Download Facebook Video Audio (320kbps)",
  description:
    "Free Facebook to MP3 Converter. Extract high-quality MP3 and M4A audio tracks from Facebook videos and Reels online. 100% free, fast, and no software required.",
  keywords: [
    "facebook to mp3",
    "convert facebook video to mp3",
    "facebook audio downloader",
    "download audio from facebook video",
    "fb to mp3 converter",
    "facebook sound downloader",
    "extract audio from facebook reel",
    "facebook mp3 320kbps",
    "fb audio rip online",
  ],
  alternates: {
    canonical: "https://fbsave.net/video-to-mp3",
  },
  openGraph: {
    title: "Facebook to MP3 Audio Converter - High Bitrate 320kbps",
    description: "Extract clean audio and MP3 files from Facebook videos and reels online.",
    url: "https://fbsave.net/video-to-mp3",
  },
};

const audioSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Facebook to MP3 Converter - FBSave Pro",
  "url": "https://fbsave.net/video-to-mp3",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
  },
};

export default function VideoToMp3Page() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(audioSchema) }}
      />

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
                High Quality Audio Extraction
              </span>
            </h1>
          }
          subtitle={
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
              Rip music, speeches, podcasts, lectures, and background audio from Facebook videos directly into clean{" "}
              <span className="text-amber-300 font-semibold">M4A & MP3 audio</span> files in seconds.
            </p>
          }
          placeholder="Paste Facebook video link to extract audio..."
          sampleUrl="https://www.facebook.com/reel/sample-nature-drone"
          sampleLabel="Try Demo Audio"
          supportedBadges={["MP3 Format", "M4A Audio", "320kbps", "128kbps", "Original Sound"]}
        />

        {/* Informational audio guide */}
        <section className="w-full max-w-4xl bg-[#131b2d]/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/5 shadow-xl mt-8 mb-16 space-y-6 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white">Why Convert Facebook Videos to MP3?</h2>
          <p>
            Often you only need the audio portion of a Facebook video — such as a musical performance, an insightful
            podcast interview, motivational speech, or educational lesson. Downloading the complete video file consumes
            needless bandwidth and phone storage.
          </p>
          <p>
            With <strong>FBSave Pro&apos;s Facebook to MP3 Converter</strong>, our server separates the audio stream
            directly from Facebook&apos;s media server and packages it into a high-bitrate audio file ready to play in
            any media player or car audio system.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
