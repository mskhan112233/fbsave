import Header from "../components/Header";
import Footer from "../components/Footer";
import DownloaderBox from "../components/DownloaderBox";

export const metadata = {
  title: "Facebook Story Downloader - Save Public FB Stories & Clips",
  description:
    "Save public Facebook Stories and short clips before they vanish in 24 hours. Free, fast, and anonymous story saver.",
};

export default function StoryDownloaderPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-blue-600/20 via-cyan-500/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[35%] -right-32 w-96 h-96 bg-purple-600/10 blur-[140px] rounded-full" />
      </div>

      <Header />

      <main className="flex-1 z-10 max-w-5xl mx-auto px-4 py-12 w-full flex flex-col items-center">
        <DownloaderBox
          badgeText="Facebook Story Downloader"
          headline={
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Facebook Story Downloader <br />
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
                Save Stories Before They Expire
              </span>
            </h1>
          }
          subtitle={
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
              Archive public Facebook stories, ephemeral clips, and video status posts in original quality directly to
              your gallery.
            </p>
          }
          placeholder="Paste Facebook Story link..."
          sampleUrl="https://www.facebook.com/reel/sample-nature-drone"
          sampleLabel="Try Demo Story Link"
          supportedBadges={["FB Stories", "24h Expiry Clips", "Video Status", "MP4 Stream", "HD Quality"]}
        />
      </main>

      <Footer />
    </div>
  );
}
