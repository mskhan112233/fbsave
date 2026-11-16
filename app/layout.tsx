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
    default: "FBSave Pro - Free Facebook Video & Reels Downloader (1080p HD)",
    template: "%s | FBSave Pro",
  },
  description:
    "Fast, free Facebook video downloader in 1080p Full HD, 720p, SD, and MP3 audio. Download Facebook Reels, Watch videos, Stories, and clips with zero watermarks.",
  keywords: [
    "facebook video downloader",
    "download facebook reels",
    "facebook reel downloader",
    "save facebook video 1080p",
    "facebook story downloader",
    "fb to mp3 converter",
    "facebook video saver hd",
    "fbsave",
  ],
  authors: [{ name: "FBSave Pro Team" }],
  creator: "FBSave Pro",
  publisher: "FBSave Pro",
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
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo-icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo-icon.svg" }],
  },
  openGraph: {
    title: "FBSave Pro - Best Facebook Video & Reels Downloader",
    description: "Download Facebook videos and reels in 1080p Full HD with audio. 100% free and fast.",
    url: "https://fbsave.net",
    siteName: "FBSave Pro",
    images: [
      {
        url: "/logo.svg",
        width: 340,
        height: 72,
        alt: "FBSave Pro Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FBSave Pro - Facebook Video Downloader",
    description: "Download Facebook Reels and Videos in 1080p Full HD without watermarks.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-slate-100">{children}</body>
    </html>
  );
}
