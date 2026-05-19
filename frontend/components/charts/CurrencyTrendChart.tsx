"use client";

import React, { useMemo } from "react";
import type { RateHistoryPoint } from "../../lib/exchangeRates";

type CurrencyTrendChartProps = {
  points: RateHistoryPoint[];
  from: string;
  to: string;
  isDark?: boolean;
  changePct: number;
};

function formatShortDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatRate(value: number): string {
  if (value >= 100) return value.toFixed(2);
  if (value >= 1) return value.toFixed(4);
  return value.toFixed(5);
}

const CurrencyTrendChart = ({
  points,
  from,
  to,
  isDark = false,
  changePct,
}: CurrencyTrendChartProps) => {
  const { path, areaPath, coords, minY, maxY } = useMemo(() => {
    const w = 280;
    const h = 120;
    const padX = 8;
    const padY = 12;
    const rates = points.map((p) => p.rate);
    const min = Math.min(...rates);
    const max = Math.max(...rates);
    const range = max - min || max * 0.01 || 1;

    const innerW = w - padX * 2;
    const innerH = h - padY * 2;

    const coords = points.map((p, i) => {
      const x = padX + (i / Math.max(points.length - 1, 1)) * innerW;
      const y = padY + innerH - ((p.rate - min) / range) * innerH;
      return { x, y, ...p };
    });

    const line = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
    const area =
      line +
      ` L ${coords[coords.length - 1].x} ${h - padY} L ${coords[0].x} ${h - padY} Z`;

    return { path: line, areaPath: area, coords, minY: min, maxY: max };
  }, [points]);

  const trendUp = changePct >= 0;
  const stroke = trendUp
    ? isDark
      ? "#6ec9b8"
      : "#0d9488"
    : isDark
      ? "#f0847f"
      : "#e07a6f";
  const fill = trendUp
    ? isDark
      ? "rgba(110, 201, 184, 0.15)"
      : "rgba(13, 148, 136, 0.12)"
    : isDark
      ? "rgba(240, 132, 127, 0.15)"
      : "rgba(224, 122, 111, 0.12)";

  const grid = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const label = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";

  return (
    <div className="w-full">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <p
          className={`text-xs font-medium ${isDark ? "text-white/70" : "text-gray-600"}`}
        >
          1 {from} → {to}
        </p>
        <p
          className={`text-xs font-semibold tabular-nums ${
            trendUp
              ? isDark
                ? "text-[#6ec9b8]"
                : "text-teal-700"
              : isDark
                ? "text-[#f0847f]"
                : "text-red-600"
          }`}
        >
          {changePct >= 0 ? "+" : ""}
          {changePct.toFixed(2)}% (5d)
        </p>
      </div>

      <svg
        viewBox="0 0 280 120"
        className="h-auto w-full"
        role="img"
        aria-label={`Exchange rate trend from ${from} to ${to} over 5 days`}
      >
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={8}
            x2={272}
            y1={12 + t * 96}
            y2={12 + t * 96}
            stroke={grid}
            strokeWidth={1}
          />
        ))}
        <path d={areaPath} fill={fill} />
        <path
          d={path}
          fill="none"
          stroke={stroke}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {coords.map((c, i) => (
          <g key={c.date}>
            <circle cx={c.x} cy={c.y} r={4} fill={stroke} />
            {i === coords.length - 1 && (
              <circle
                cx={c.x}
                cy={c.y}
                r={7}
                fill="none"
                stroke={stroke}
                strokeWidth={1.5}
                opacity={0.5}
              />
            )}
          </g>
        ))}
      </svg>

      <div className="mt-2 flex justify-between gap-1">
        {points.map((p) => (
          <div key={p.date} className="min-w-0 flex-1 text-center">
            <p
              className="truncate text-[9px] font-medium"
              style={{ color: label }}
            >
              {formatShortDate(p.date)}
            </p>
            <p
              className={`text-[9px] font-semibold tabular-nums ${isDark ? "text-white/80" : "text-gray-700"}`}
            >
              {formatRate(p.rate)}
            </p>
          </div>
        ))}
      </div>

      <p
        className={`mt-2 text-center text-[10px] ${isDark ? "text-white/35" : "text-gray-400"}`}
      >
        Range: {formatRate(minY)} – {formatRate(maxY)}
      </p>
    </div>
  );
};

export default CurrencyTrendChart;
