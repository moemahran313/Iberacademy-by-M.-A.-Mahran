import React from 'react';

interface IberacademyLogoProps {
  variant?: 'full' | 'compact' | 'icon' | 'banner';
  className?: string;
  showSubtitle?: boolean;
  textColor?: string;
}

export const IberacademyLogo: React.FC<IberacademyLogoProps> = ({
  variant = 'full',
  className = '',
  showSubtitle = true,
}) => {
  // Unique SVG Vector representation accurately matching the uploaded Iberacademy typography and styling
  if (variant === 'icon') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ib-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF3838" />
              <stop offset="50%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#FA8231" />
            </linearGradient>
            <filter id="ib-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#FF3838" floodOpacity="0.3" />
            </filter>
          </defs>
          {/* Rounded Squircle Container */}
          <rect
            width="120"
            height="120"
            rx="28"
            fill="url(#ib-icon-grad)"
            filter="url(#ib-shadow)"
          />
          {/* Stylized 'Ib' mark inside */}
          <g fill="#FFFFFF">
            {/* 'I' stem */}
            <rect x="26" y="32" width="10" height="56" rx="5" />
            {/* 'b' stem */}
            <rect x="46" y="24" width="10" height="64" rx="5" />
            {/* 'b' bowl with stylized cut */}
            <path
              d="M56 50 C62 44, 78 44, 84 52 C90 60, 90 74, 84 82 C78 90, 62 90, 56 84"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="9"
              strokeLinecap="round"
            />
          </g>
          {/* Spanish flag accent dot */}
          <circle cx="92" cy="34" r="5" fill="#FFE600" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      <div className="flex items-center gap-3">
        {/* Stylized Vector Wordmark */}
        <div className="flex flex-col">
          <svg
            viewBox="0 0 640 160"
            className="h-10 sm:h-12 w-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="iber-grad-h" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#F43F5E" />
                <stop offset="18%" stopColor="#FF4D36" />
                <stop offset="45%" stopColor="#FF6B35" />
                <stop offset="75%" stopColor="#FA8231" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
              <linearGradient id="sub-grad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#FA8231" />
              </linearGradient>
            </defs>

            {/* Render "Iberacademy" with exact stylized stencil font aesthetic */}
            <g fill="url(#iber-grad-h)">
              {/* I */}
              <path d="M 22 28 C 26 28 29 31 29 35 L 29 110 C 29 114 26 117 22 117 C 18 117 15 114 15 110 L 15 35 C 15 31 18 28 22 28 Z" />
              
              {/* b */}
              <path d="M 50 18 C 54 18 57 21 57 25 L 57 110 C 57 114 54 117 50 117 C 46 117 43 114 43 110 L 43 25 C 43 21 46 18 50 18 Z" />
              <path d="M 56 62 C 63 52 82 52 91 61 C 99 71 99 92 90 102 C 81 111 63 111 56 102" fill="none" stroke="url(#iber-grad-h)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

              {/* e */}
              <path d="M 115 80 L 150 80 C 150 63 139 52 125 52 C 111 52 101 64 101 84 C 101 104 112 115 129 115 C 140 115 147 109 150 101" fill="none" stroke="url(#iber-grad-h)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

              {/* r */}
              <path d="M 168 56 C 172 56 175 59 175 63 L 175 110 C 175 114 172 117 168 117 C 164 117 161 114 161 110 L 161 63 C 161 59 164 56 168 56 Z" />
              <path d="M 174 69 C 180 57 193 54 204 57" fill="none" stroke="url(#iber-grad-h)" strokeWidth="12" strokeLinecap="round" />

              {/* a */}
              <path d="M 248 64 L 248 110 C 248 114 245 117 241 117 C 237 117 234 114 234 110 L 234 102 C 228 111 216 115 206 112 C 196 108 190 98 191 87 C 192 73 205 66 222 66 L 234 66 L 234 62 C 234 54 227 49 217 50 C 210 51 205 54 202 59" fill="none" stroke="url(#iber-grad-h)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />

              {/* c */}
              <path d="M 296 64 C 291 56 281 52 270 52 C 255 52 245 64 245 84 C 245 104 256 115 272 115 C 283 115 292 109 296 99" fill="none" stroke="url(#iber-grad-h)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

              {/* a */}
              <path d="M 345 64 L 345 110 C 345 114 342 117 338 117 C 334 117 331 114 331 110 L 331 102 C 325 111 313 115 303 112 C 293 108 287 98 288 87 C 289 73 302 66 319 66 L 331 66 L 331 62 C 331 54 324 49 314 50 C 307 51 302 54 299 59" fill="none" stroke="url(#iber-grad-h)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />

              {/* d */}
              <path d="M 395 18 C 399 18 402 21 402 25 L 402 110 C 402 114 399 117 395 117 C 391 117 388 114 388 110 L 388 102" fill="none" stroke="url(#iber-grad-h)" strokeWidth="12" strokeLinecap="round" />
              <path d="M 389 62 C 382 52 363 52 354 61 C 346 71 346 92 355 102 C 364 111 382 111 389 102" fill="none" stroke="url(#iber-grad-h)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

              {/* e */}
              <path d="M 430 80 L 465 80 C 465 63 454 52 440 52 C 426 52 416 64 416 84 C 416 104 427 115 444 115 C 455 115 462 109 465 101" fill="none" stroke="url(#iber-grad-h)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

              {/* m */}
              <path d="M 482 56 C 486 56 489 59 489 63 L 489 110 C 489 114 486 117 482 117 C 478 117 475 114 475 110 L 475 63 C 475 59 478 56 482 56 Z" />
              <path d="M 488 68 C 494 57 508 55 516 62 C 524 55 538 57 544 68 L 544 110" fill="none" stroke="url(#iber-grad-h)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

              {/* y */}
              <path d="M 561 56 C 565 56 568 59 568 63 L 568 92 C 568 102 574 108 584 108 C 594 108 600 102 600 92 L 600 63 C 600 59 603 56 607 56 C 611 56 614 59 614 63 L 614 96 C 614 114 602 128 584 128 C 572 128 561 122 556 112 L 556 116 C 556 126 548 134 538 134 C 532 134 527 131 525 126" fill="none" stroke="url(#iber-grad-h)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Subtitle: "by M. Mahran" */}
            {showSubtitle && (
              <g fill="url(#sub-grad)" opacity="0.95">
                <text
                  x="610"
                  y="155"
                  textAnchor="end"
                  fontSize="28"
                  fontWeight="600"
                  fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
                  letterSpacing="1px"
                >
                  by M. Mahran
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};
