import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Terms of Service - FBSave Pro",
  description: "Terms of Service, acceptable use guidelines, and trademark disclaimers for FBSave Pro.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white relative">
      <Header />

      <main className="flex-1 z-10 max-w-4xl mx-auto px-4 py-12 w-full">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-medium">Terms of Service</span>
        </nav>

        <div className="bg-[#131b2d]/65 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/5 shadow-xl space-y-6 text-sm text-slate-300 leading-relaxed">
          <h1 className="text-3xl font-extrabold text-white mb-2">Terms of Service</h1>
          <p className="text-xs text-cyan-400 font-mono">Last Updated: November 2026</p>

          <p>
            By accessing or using FBSave Pro (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you disagree with any portion of these terms, please discontinue use of the Service immediately.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-t border-white/5">1. Permitted and Personal Use</h2>
          <p>
            FBSave Pro is provided strictly for personal, non-commercial, educational, and backup archiving purposes. You are solely responsible for ensuring you have appropriate rights, permissions, or fair-use justification for any media content you download.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-t border-white/5">2. Intellectual Property & Copyright</h2>
          <p>
            FBSave Pro respects the intellectual property rights of content creators and copyright owners. You agree not to use this service to infringe copyright or redistribute content without permission from the copyright holder.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-t border-white/5">3. Trademark Disclaimer</h2>
          <p>
            &quot;Facebook&quot;, &quot;Meta&quot;, and related names and logos are trademarks of Meta Platforms, Inc. FBSave Pro is an independent third-party tool and is in no way affiliated with, authorized, maintained, sponsored, or endorsed by Meta Platforms, Inc.
          </p>

          <h2 className="text-xl font-bold text-white pt-4 border-t border-white/5">4. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. We do not guarantee uninterrupted availability or error-free parsing of third-party platforms.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
