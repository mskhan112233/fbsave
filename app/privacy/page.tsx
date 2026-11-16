import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacy Policy - FBSave Pro",
  description: "Learn how FBSave Pro protects your privacy. We do not store files or track personal identifying information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white relative">
      <Header />

      <main className="flex-1 z-10 max-w-4xl mx-auto px-4 py-12 w-full">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-medium">Privacy Policy</span>
        </nav>

        <div className="bg-[#131b2d]/65 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/5 shadow-xl space-y-6 text-sm text-slate-300 leading-relaxed">
          <h1 className="text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
          <p className="text-xs text-cyan-400 font-mono">Last Updated: November 2026</p>

          <p>
            At FBSave Pro (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), we take your personal privacy seriously.
            This Privacy Policy document describes the types of information we collect, how it is handled, and our commitment to zero-retention data safety.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-t border-white/5">1. No Storage of Videos or Media</h2>
          <p>
            FBSave Pro does not host, upload, or retain copies of videos, audio, or user content on its servers. When you request a download, our system fetches public CDN stream metadata and transfers the data stream directly to your web browser. No copy is kept on our infrastructure.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-t border-white/5">2. No Account or Registration Required</h2>
          <p>
            You can use FBSave Pro completely anonymously. We do not require registration, login, email addresses, names, credit cards, or phone numbers.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-t border-white/5">3. Web Logs & Analytics</h2>
          <p>
            Like standard web services, minimal non-personally identifiable diagnostic logs (such as request timestamps and HTTP status codes) may be temporarily processed for rate limiting, DDoS prevention, and service stability. These logs are automatically rotated and purged.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-t border-white/5">4. Cookies and Local Storage</h2>
          <p>
            We do not use tracking cookies to build user profiling across the web. Modern web browsers may store minimal local session preferences solely for UI operation.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-t border-white/5">5. Third-Party Links</h2>
          <p>
            FBSave Pro provides links to external websites and social networks (such as Facebook / Meta). We are not responsible for the privacy practices or terms of external domains.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
