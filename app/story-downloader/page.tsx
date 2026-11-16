import Header from "../components/Header";
import Footer from "../components/Footer";
import DownloaderBox from "../components/DownloaderBox";

export const metadata = {
  title: "Facebook Story Downloader - Save Public FB Stories & Clips Anonymously",
  description:
    "Free Facebook Story Downloader. Save public Facebook Stories and short clips before they expire in 24 hours. Fast, anonymous, and saves directly to phone or PC.",
  keywords: [
    "facebook story downloader",
    "download facebook story",
    "fb story saver",
    "save facebook stories anonymously",
    "facebook story download hd",
    "fb story saver online",
    "download fb status video",
  ],
  alternates: {
    canonical: "https://fbsave.net/story-downloader",
  },
  openGraph: {
    title: "Facebook Story Downloader - Save Stories Before 24h Expiry",
    description: "Download public Facebook Stories to your device in high definition MP4.",
    url: "https://fbsave.net/story-downloader",
  },
};

const storySchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Facebook Story Downloader - FBSave Pro",
  "url": "https://fbsave.net/story-downloader",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
  },
};

export default function StoryDownloaderPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storySchema) }}
      />

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

        {/* Story Download Guide */}
        <section className="w-full max-w-4xl bg-[#131b2d]/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/5 shadow-xl mt-8 mb-16 space-y-6 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white">How to Save Public Facebook Stories</h2>
          <p>
            Facebook Stories disappear automatically after 24 hours. If a creator, friend, or page publishes a memorable
            public video story, you can preserve it with <strong>FBSave Pro</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
            <li>Copy the public story link from Facebook (or browser URL bar).</li>
            <li>Paste into the FBSave Story Downloader.</li>
            <li>Click Download to save the story in full resolution MP4.</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
