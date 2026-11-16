import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#0b101c] border-t border-white/5 pt-14 pb-10 text-xs text-slate-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" variant="full" badgeText="PRO SUITE" />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              FBSave Pro is the premier, privacy-focused Facebook video downloader. Save Reels, Watch videos, Stories,
              and audio streams in high definition 1080p, 720p, or direct 320kbps MP3 without installing third-party
              software.
            </p>
            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Service Operational
              </span>
              <span>•</span>
              <span>No Account Required</span>
              <span>•</span>
              <span>Zero Logs</span>
            </div>
          </div>

          {/* Column 1: Tools */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[11px]">Downloader Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Facebook Video Downloader
                </Link>
              </li>
              <li>
                <Link href="/reels-downloader" className="hover:text-cyan-400 transition-colors">
                  Facebook Reels Downloader
                </Link>
              </li>
              <li>
                <Link href="/story-downloader" className="hover:text-cyan-400 transition-colors">
                  Facebook Story Downloader
                </Link>
              </li>
              <li>
                <Link href="/video-to-mp3" className="hover:text-cyan-400 transition-colors">
                  Facebook to MP3 Audio
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Guides & Help */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[11px]">Guides & Help</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/how-to-download" className="hover:text-cyan-400 transition-colors">
                  How to Download (Tutorial)
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-cyan-400 transition-colors">
                  FAQ & Troubleshooting
                </Link>
              </li>
              <li>
                <span className="text-slate-500">1080p Full HD Support</span>
              </li>
              <li>
                <span className="text-slate-500">Fast Stream Tunnel</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Site Map & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[11px]">Site Map & Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sitemap" className="text-cyan-400 font-semibold hover:underline flex items-center gap-1">
                  <span>Visual Site Map</span>
                  <span>🗺️</span>
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <span>XML Sitemap</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded border border-blue-500/30">
                    sitemap.xml
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors text-slate-500 hover:text-slate-300"
                >
                  robots.txt
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px] text-slate-500">
          <p>
            Disclaimer: FBSave is an independent educational tool and is not affiliated with, endorsed, or sponsored by
            Meta Platforms, Inc. or Facebook. We do not host copyrighted material on our servers.
          </p>
          <div className="flex-shrink-0 text-slate-400">
            © 2026 FBSave Pro Downloader. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
