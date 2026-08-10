import React from 'react';

export default function GeometricBackground() {
  // Tile dimensions for repeating geometric isometric pattern
  const tileWidth = 240;
  const tileHeight = 240;

  return (
    <div className="bg-svg-pattern">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ minWidth: '100vw', minHeight: '100vh' }}
      >
        <defs>
          {/* Subtle line gradient */}
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="blueAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.2" />
          </linearGradient>

          {/* Geometric Tile Pattern mirroring the reference image */}
          <pattern
            id="geometric-theme-pattern"
            width={tileWidth}
            height={tileHeight}
            patternUnits="userSpaceOnUse"
          >
            {/* Outer Rounded Isometric Diamond / Cube outlines */}
            <path
              d="M 120 10 L 230 65 L 230 175 L 120 230 L 10 175 L 10 65 Z"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Inner polygon grid lines */}
            <path
              d="M 120 10 L 120 230 M 10 65 L 230 175 M 10 175 L 230 65"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="0.8"
              strokeDasharray="4 4"
              opacity="0.5"
            />

            {/* Sub-shapes with rounded corners */}
            <rect
              x="60"
              y="60"
              width="120"
              height="120"
              rx="24"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="1"
              transform="rotate(45 120 120)"
            />

            {/* Subtle blue accent wireframe node */}
            <rect
              x="85"
              y="85"
              width="70"
              height="70"
              rx="16"
              fill="none"
              stroke="url(#blueAccentGrad)"
              strokeWidth="1.5"
              transform="rotate(45 120 120)"
            />

            {/* Node Dots at key vertices */}
            <circle cx="120" cy="10" r="2.5" fill="#93c5fd" opacity="0.6" />
            <circle cx="230" cy="65" r="2.5" fill="#93c5fd" opacity="0.6" />
            <circle cx="230" cy="175" r="2.5" fill="#93c5fd" opacity="0.6" />
            <circle cx="120" cy="230" r="2.5" fill="#93c5fd" opacity="0.6" />
            <circle cx="10" cy="175" r="2.5" fill="#93c5fd" opacity="0.6" />
            <circle cx="10" cy="65" r="2.5" fill="#93c5fd" opacity="0.6" />
          </pattern>
        </defs>

        {/* Ambient background glow circles */}
        <circle cx="20%" cy="30%" r="350" fill="url(#blueAccentGrad)" filter="blur(80px)" opacity="0.2" />
        <circle cx="80%" cy="70%" r="400" fill="url(#blueAccentGrad)" filter="blur(100px)" opacity="0.15" />

        {/* Full screen pattern rect */}
        <rect width="100%" height="100%" fill="url(#geometric-theme-pattern)" />
      </svg>
    </div>
  );
}
