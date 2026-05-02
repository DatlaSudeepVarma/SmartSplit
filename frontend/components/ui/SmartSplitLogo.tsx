"use client";

import React, { useId } from 'react';

/** SVG mark only — no raster box; works on light and dark backgrounds. */
const SmartSplitLogo = ({ className = "" }: { className?: string }) => {
  const gid = useId().replace(/:/g, '');
  const gradId = `ss_logo_grad_${gid}`;
  return (
    <div className={`flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 ${className}`}>
      <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="2" y1="32" x2="32" y2="2" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="55%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        <rect x="7" y="9" width="4" height="6" rx="1" fill={`url(#${gradId})`} />
        <rect x="14" y="5" width="4" height="10" rx="1" fill={`url(#${gradId})`} />
        <rect x="21" y="2" width="4" height="13" rx="1" fill={`url(#${gradId})`} />
        <path
          d="M2 16C2 13.2386 4.23858 11 7 11H29C30.6569 11 32 12.3431 32 14V29C32 30.6569 30.6569 32 29 32H7C4.23858 32 2 29.7614 2 27V16Z"
          fill={`url(#${gradId})`}
        />
        <path d="M32 19H26C24.3431 19 23 20.3431 23 22V24C23 25.6569 24.3431 27 26 27H32" className="fill-white dark:fill-gray-950" />
        <circle cx="27.5" cy="23" r="1.5" className="fill-brand-blue dark:fill-sky-400" />
      </svg>
    </div>
  );
};

export default SmartSplitLogo;


