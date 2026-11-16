"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface SitemapItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
  icon: string;
  priority: string;
  changeFreq: string;
  isExternal?: boolean;
}

interface SitemapCategory {
  category: string;
  description: string;
  color: string;
  items: SitemapItem[];
}

const sitemapData: SitemapCategory[] = [
  {
    category: "Core Downloader Tools",
    description: "High-performance video and media extraction engines for all Facebook content formats.",
    color: "from-blue-600/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30",
    items: [
      {
        title: "Facebook Video Downloader (Home)",
        description: "Primary tool to download Facebook videos, Watch shows, posts, and public clips in 1080p Full HD.",
        href: "/",
        badge: "1080p HD",
        icon: "🎬",
        priority: "1.0",
        changeFreq: "Daily",
      },
      {
        title: "Facebook Reels Downloader",
        description: "Specialized engine to download short-form Facebook Reels with original background audio in high bitrate.",
        href: "/reels-downloader",
        badge: "Reels",
        icon: "⚡",
        priority: "0.9",
        changeFreq: "Weekly",
      },
      {
        title: "Facebook Story Downloader",
        description: "Save public Facebook stories to your phone or computer before the 24-hour expiration window closes.",
        href: "/story-downloader",
        badge: "Stories",
        icon: "⏱️",
        priority: "0.9",
        changeFreq: "Weekly",
      },
      {
        title: "Facebook to MP3 / Audio Converter",
        description: "Extract soundtrack, speech, and high-fidelity MP3/M4A audio directly from any Facebook video URL.",
        href: "/video-to-mp3",
        badge: "MP3 Audio",
        icon: "🎵",
        priority: "0.8",
        changeFreq: "Weekly",
      },
    ],
  },
  {
    category: "Guides, Help & Tutorials",
    description: "Detailed walkthroughs, troubleshooting tips, and answers to common download questions.",
    color: "from-purple-600/20 to-indigo-500/20 text-indigo-400 border-indigo-500/30",
    items: [
      {
        title: "How to Download Facebook Videos",
        description: "Complete visual step-by-step guide for saving videos on iPhone, Android, Windows, and Mac.",
        href: "/how-to-download",
        badge: "Tutorial",
        icon: "📖",
        priority: "0.8",
        changeFreq: "Monthly",
      },
      {
        title: "FAQ & Troubleshooting",
        description: "Answers regarding private videos, link validation, sound sync, file formats, and download speed.",
        href: "/faq",
        badge: "Support",
        icon: "❓",
        priority: "0.7",
        changeFreq: "Monthly",
      },
    ],
  },
  {
    category: "Crawlers, Feeds & Technical",
    description: "Machine-readable indexes, search engine protocols, and crawler configuration endpoints.",
    color: "from-emerald-600/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    items: [
      {
        title: "XML Sitemap Protocol",
        description: "Official Sitemaps.org compliant XML feed utilized by Google, Bing, and search engine spiders.",
        href: "/sitemap.xml",
        badge: "sitemap.xml",
        icon: "🗺️",
        priority: "0.7",
        changeFreq: "Monthly",
        isExternal: true,
      },
      {
        title: "Robots Exclusion Protocol",
        description: "Robots.txt rule sheet specifying spider indexing guidelines and API disallow filters.",
        href: "/robots.txt",
        badge: "robots.txt",
        icon: "🤖",
        priority: "0.5",
        changeFreq: "Monthly",
        isExternal: true,
      },
      {
        title: "Stream Extraction API Endpoint",
        description: "Backend JSON endpoint powering stream discovery and resolution mapping for Facebook URLs.",
        href: "/api/extract",
        badge: "POST API",
        icon: "⚙️",
        priority: "N/A",
        changeFreq: "Backend",
        isExternal: true,
      },
      {
        title: "Download Tunnel API Endpoint",
        description: "Binary streaming tunnel that serves downloadable attachments with custom file headers.",
        href: "/api/download",
        badge: "GET API",
        icon: "📦",
        priority: "N/A",
        changeFreq: "Backend",
        isExternal: true,
      },
    ],
  },
  {
    category: "Legal, Compliance & Disclaimers",
    description: "Transparent privacy measures, terms of acceptable use, and trademark notices.",
    color: "from-amber-600/20 to-orange-500/20 text-amber-400 border-amber-500/30",
    items: [
      {
        title: "Privacy Policy",
        description: "Our strict zero-logging policy: no personal data stored, no video streams hosted permanently.",
        href: "/privacy",
        badge: "Privacy",
        icon: "🔒",
        priority: "0.5",
        changeFreq: "Yearly",
      },
      {
        title: "Terms of Service",
        description: "Fair use requirements, user responsibilities, copyright guidelines, and Meta trademark notice.",
        href: "/terms",
        badge: "Terms",
        icon: "⚖️",
        priority: "0.5",
        changeFreq: "Yearly",
      },
    ],
  },
];

export default function SitemapPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = sitemapData
    .map((category) => {
      const filteredItems = category.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.href.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      return {
        ...category,
        items: filteredItems,
      };
    })
    .filter((cat) => cat.items.length > 0);

  const totalPages = sitemapData.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white relative">
      {/* Decorative backdrop gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-blue-600/15 via-blue-500/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -right-32 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full" />
      </div>

      <Header />

      <main className="flex-1 z-10 max-w-5xl mx-auto px-4 py-12 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-medium">Site Map</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-4 shadow-sm">
            <span>🗺️</span>
            <span>Comprehensive Sitemap Directory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            FBSave Pro{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
              Site Map
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Navigate through all available Facebook video downloaders, format guides, technical feeds, and policies.
            Both human-readable and search engine crawler accessible.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-400">
            <span className="bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{totalPages} URLs Cataloged</span>
            </span>
            <span className="bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 flex items-center gap-1.5">
              <span>Protocol:</span>
              <span className="text-cyan-300 font-mono">XML & HTML5</span>
            </span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 px-3 py-1.5 rounded-xl border border-blue-500/30 transition-all flex items-center gap-1 font-semibold"
            >
              <span>View Raw XML</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Search / Filter Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, guides, or legal pages..."
              className="w-full pl-11 pr-10 py-3 bg-[#121826]/80 text-white placeholder-slate-500 rounded-2xl text-sm border border-white/10 focus:border-cyan-400/50 outline-none backdrop-blur-md transition-all shadow-lg"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Catalog Categories */}
        <div className="space-y-10">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/5">
              <p className="text-slate-400 text-sm">No sitemap entries match &quot;{searchQuery}&quot;.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs text-cyan-400 font-semibold hover:underline"
              >
                Clear search query
              </button>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div
                key={category.category}
                className="bg-[#131b2d]/65 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/5 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/5 gap-2">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <span>{category.category}</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">{category.description}</p>
                  </div>
                  <span className="text-xs text-slate-500 font-mono self-start sm:self-auto">
                    {category.items.length} {category.items.length === 1 ? "page" : "pages"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item) => {
                    const CardElement = item.isExternal ? "a" : Link;
                    const extraProps = item.isExternal ? { target: "_blank", rel: "noreferrer" } : {};

                    return (
                      <CardElement
                        key={item.href}
                        href={item.href}
                        {...extraProps}
                        className="group p-5 rounded-2xl bg-[#0f1524]/80 border border-white/5 hover:border-cyan-500/40 hover:bg-[#162035]/80 transition-all flex flex-col justify-between shadow-md hover:shadow-cyan-500/5 cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xl select-none">{item.icon}</span>
                              <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                                {item.title}
                              </h3>
                            </div>
                            {item.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-cyan-300 border border-cyan-500/20">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="font-mono text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
                            {item.href}
                          </span>
                          <div className="flex items-center gap-2 text-slate-400">
                            <span>Priority: {item.priority}</span>
                            <span>•</span>
                            <span>{item.changeFreq}</span>
                          </div>
                        </div>
                      </CardElement>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-14 bg-gradient-to-r from-blue-900/40 via-sky-900/30 to-indigo-900/40 border border-blue-500/20 rounded-3xl p-8 text-center backdrop-blur-md">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-4 text-2xl">
            🚀
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Ready to download Facebook videos?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Simply paste your Facebook video, reel, or story URL into our high-speed downloader. No watermarks, no fees,
            and no registration.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all"
          >
            <span>Open Downloader</span>
            <span>→</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
