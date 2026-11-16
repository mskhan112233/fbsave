import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "full" | "icon" | "stacked";
  size?: "sm" | "md" | "lg" | "xl";
  showBadge?: boolean;
  badgeText?: string;
  className?: string;
  linkHref?: string;
}

export function LogoIcon({ size = "md", className = "" }: { size?: "sm" | "md" | "lg" | "xl"; className?: string }) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const dimMap = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  };

  const px = dimMap[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl group transition-transform duration-300 hover:scale-105 ${sizeMap[size]} ${className}`}
      style={{
        boxShadow: "0 8px 24px -4px rgba(37, 99, 235, 0.45), 0 2px 8px -2px rgba(6, 182, 212, 0.3)",
      }}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none"
        width={px}
        height={px}
      >
        <defs>
          {/* Main Background Gradient */}
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#0B1329" />
          </linearGradient>

          {/* Border Glow Gradient */}
          <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.2" />
          </linearGradient>

          {/* Arrow / Stream Gradient */}
          <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>

          {/* Play Triangle Gradient */}
          <linearGradient id="playGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2.5" floodColor="#38BDF8" floodOpacity="0.6" />
          </filter>

          <filter id="whiteGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#60A5FA" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Squircle Rounded Base */}
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="18"
          fill="url(#bgGrad)"
          stroke="url(#borderGrad)"
          strokeWidth="1.8"
        />

        {/* Ambient Top Highlight */}
        <ellipse cx="32" cy="14" rx="22" ry="8" fill="#60A5FA" fillOpacity="0.18" />

        {/* Subtle Geometric Tech Corner Accent */}
        <circle cx="50" cy="14" r="2.5" fill="#38BDF8" fillOpacity="0.85" filter="url(#cyanGlow)" />

        {/* Stylized Modern "F" Backbone */}
        {/* Vertical stem of F with rounded finish */}
        <path
          d="M17 19C17 16.7909 18.7909 15 21 15H29C30.6569 15 32 16.3431 32 18C32 19.6569 30.6569 21 29 21H23V27H28C29.6569 27 31 28.3431 31 30C31 31.6569 29.6569 33 28 33H23V46C23 47.6569 21.6569 49 20 49C18.3431 49 17 47.6569 17 46V19Z"
          fill="url(#playGrad)"
          filter="url(#whiteGlow)"
        />

        {/* Forward Play Triangle integrated with the F's upper arm */}
        <path
          d="M33 16.5C34.3333 15.7302 36 16.6925 36 18.2321V23.7679C36 25.3075 34.3333 26.2698 33 25.5L28.5 22.8C27.1667 22.0302 27.1667 20.0698 28.5 19.2L33 16.5Z"
          fill="#38BDF8"
          fillOpacity="0.9"
        />

        {/* High-Velocity Download Save Arrow (Cutting-edge dynamic chevron + spear) */}
        <g filter="url(#cyanGlow)">
          {/* Main Download Arrow pointing down */}
          <path
            d="M40 27V36.5H44.5C45.3907 36.5 45.8369 37.5771 45.2071 38.2071L37.7071 45.7071C37.3166 46.0976 36.6834 46.0976 36.2929 45.7071L28.7929 38.2071C28.1631 37.5771 28.6093 36.5 29.5 36.5H34V27C34 25.8954 34.8954 25 36 25H38C39.1046 25 40 25.8954 40 27Z"
            fill="url(#arrowGrad)"
          />
        </g>

        {/* Lower Capture Tray / Cradle arc */}
        <path
          d="M24 49C24 49 30 52 37 52C44 52 50 49 50 49"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.9"
          filter="url(#cyanGlow)"
        />
      </svg>
    </div>
  );
}

export default function Logo({
  variant = "full",
  size = "md",
  showBadge = true,
  badgeText = "HD & 4K",
  className = "",
  linkHref = "/",
}: LogoProps) {
  const textSizeMap = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const badgeSizeMap = {
    sm: "text-[9px] px-1.5 py-0.5",
    md: "text-[10px] sm:text-[11px] px-2 py-0.5",
    lg: "text-xs px-2.5 py-1",
    xl: "text-xs px-3 py-1",
  };

  const content = (
    <div className={`inline-flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* Icon Mark */}
      <LogoIcon size={size} />

      {/* Typography / Wordmark */}
      {variant !== "icon" && (
        <div className={`flex ${variant === "stacked" ? "flex-col" : "items-center gap-2"}`}>
          <div className="flex items-center tracking-tight font-extrabold select-none">
            <span className={`text-white transition-colors duration-200 group-hover:text-blue-200 ${textSizeMap[size]}`}>
              FB
            </span>
            <span
              className={`bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent font-black ml-0.5 ${textSizeMap[size]}`}
            >
              SAVE
            </span>
          </div>

          {showBadge && (
            <div className="flex items-center">
              <span
                className={`font-bold tracking-wider uppercase bg-blue-500/15 text-blue-300 border border-blue-400/30 rounded-full flex items-center gap-1 shadow-sm shadow-blue-500/20 group-hover:border-blue-400/50 transition-colors ${badgeSizeMap[size]}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>{badgeText}</span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (linkHref) {
    return (
      <Link href={linkHref} className="inline-block no-underline">
        {content}
      </Link>
    );
  }

  return content;
}
