import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://fbsave.net"),
  title: {
    default: "Facebook Video Downloader - Save FB Videos & Reels in 1080p Full HD | FBSave Pro",
    template: "%s | FBSave Pro",
  },
  description:
    "Best Facebook Video Downloader online. Download FB videos, Facebook Reels, Stories, and Watch clips in 1080p Full HD, 720p, or high-bitrate MP3 audio. 100% free, fast, and no watermark.",
  keywords: [
    // Primary High-Volume Keywords
    "facebook video downloader",
    "download facebook video",
    "fb video downloader",
    "facebook downloader",
    "download facebook reels",
    "facebook reel downloader",
    "fb reel saver",
    "save facebook reels",
    "facebook story downloader",
    "fb story saver",
    "facebook to mp3",
    "facebook audio downloader",
    "convert facebook video to mp3",

    // Resolution & Quality Searches
    "facebook video downloader 1080p",
    "download facebook video 1080p full hd",
    "facebook video downloader 4k",
    "download fb video 720p",
    "facebook video saver hd",
    "facebook video download without watermark",
    "fb video download with audio",

    // Device & Platform Searches
    "save facebook video on iphone",
    "download facebook video android",
    "how to download facebook video mobile",
    "facebook video downloader for pc",
    "facebook watch video download",
    "download fb live video",
    "facebook clips downloader",

    // Competitor & Search Alternatives
    "fdown",
    "snapsave facebook",
    "savefrom facebook",
    "fbdown net alternative",
    "getfvid alternative",
    "fbsave",
    "fbsave pro",
  ],
  authors: [{ name: "FBSave Pro Team", url: "https://fbsave.net" }],
  creator: "FBSave Pro",
  publisher: "FBSave Pro",
  category: "Multimedia Tool",
  alternates: {
    canonical: "https://fbsave.net",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "72uMucmnbML64Yzi3IB1cgOv32rbEBgulPW5lEu4YDg",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Facebook Video Downloader - 1080p HD & MP3 | FBSave Pro",
    description:
      "Save Facebook videos, reels, stories, and watch clips in 1080p Full HD with sound. Free online Facebook downloader with zero watermark.",
    url: "https://fbsave.net",
    siteName: "FBSave Pro",
    images: [
      {
        url: "/logo.svg",
        width: 340,
        height: 72,
        alt: "FBSave Pro - Facebook Video Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Facebook Video Downloader in 1080p Full HD - FBSave Pro",
    description:
      "Download Facebook Reels, Stories, and Videos in crystal clear 1080p Full HD or convert directly to MP3 audio. 100% free.",
    images: ["/logo.svg"],
  },
};

const jsonLdGlobal = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://fbsave.net/#website",
      "url": "https://fbsave.net",
      "name": "FBSave Pro",
      "description": "High-Definition Facebook Video, Reels, and Story Downloader.",
      "publisher": {
        "@type": "Organization",
        "name": "FBSave Pro",
        "url": "https://fbsave.net",
        "logo": {
          "@type": "ImageObject",
          "url": "https://fbsave.net/logo.svg",
        },
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://fbsave.net/#app",
      "name": "FBSave Pro - Facebook Video Downloader",
      "url": "https://fbsave.net",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "All (Windows, macOS, Android, iOS, Linux)",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "18420",
        "bestRating": "5",
        "worstRating": "1",
      },
      "featureList": [
        "Facebook Reels 1080p HD Download",
        "Full Audio and Sound Synchronization",
        "Facebook Story Saver",
        "Direct Facebook to MP3 Audio Extraction",
        "Zero Watermark and Original Quality",
        "Fast Tunnel Streaming - No Redirects",
        "Mobile Optimized for Safari and Chrome",
      ],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGlobal) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-slate-100">{children}</body>
    </html>
  );
}
