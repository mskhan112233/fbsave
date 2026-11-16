"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Reels", href: "/reels-downloader" },
    { label: "Stories", href: "/story-downloader" },
    { label: "Audio MP3", href: "/video-to-mp3" },
    { label: "Guide", href: "/how-to-download" },
    { label: "Sitemap", href: "/sitemap" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0f1523]/80 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo size="md" variant="full" badgeText="HD & 4K" />

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 px-2 py-1 rounded-xl border border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls & Fast Status */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/reels-downloader"
            className="text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="hidden sm:inline">Try Reels</span>
            <span className="sm:hidden">Reels</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            100% Free
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 border border-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d1322] border-b border-white/10 px-4 py-4 space-y-2 animate-fade-in shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-blue-600/20 px-3.5 py-2.5 rounded-xl border border-white/5 transition-all flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-slate-500">→</span>
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Fast & Unlimited Downloads</span>
            <span className="text-cyan-400 font-semibold">1080p Full HD</span>
          </div>
        </div>
      )}
    </header>
  );
}
