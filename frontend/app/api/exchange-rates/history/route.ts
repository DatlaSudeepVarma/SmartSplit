import { NextRequest, NextResponse } from "next/server";
import {
  ALLOWED_CURRENCIES,
  fetchFrankfurterSeries,
  fetchHostSeries,
  fetchLatestRates,
  fetchUsdPivotSeries,
  formatDate,
  pairRate,
} from "@/lib/server/exchangeProviders";

function lastNDates(days: number): { start: string; end: string; today: string } {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - (days + 2));
  return {
    start: formatDate(start),
    end: formatDate(end),
    today: formatDate(end),
  };
}

export async function GET(request: NextRequest) {
  const from = request.nextUrl.searchParams.get("from")?.toUpperCase() ?? "USD";
  const to = request.nextUrl.searchParams.get("to")?.toUpperCase() ?? "INR";
  const days = Math.min(
    10,
    Math.max(2, parseInt(request.nextUrl.searchParams.get("days") ?? "5", 10))
  );

  if (
    !ALLOWED_CURRENCIES.includes(from as (typeof ALLOWED_CURRENCIES)[number]) ||
    !ALLOWED_CURRENCIES.includes(to as (typeof ALLOWED_CURRENCIES)[number]) ||
    from === to
  ) {
    return NextResponse.json({ error: "Invalid currency pair" }, { status: 400 });
  }

  const { start, end, today } = lastNDates(days);

  try {
    let series =
      (await fetchFrankfurterSeries(from, to, start, end)) ??
      (await fetchHostSeries(from, to, start, end));

    if (!series && (from === "AED" || to === "AED")) {
      series = await fetchHostSeries(from, to, start, end);
    }

    if (!series) {
      series = await fetchUsdPivotSeries(from, to, start, end);
    }

    if (!series) {
      return NextResponse.json(
        { error: "Historical rates unavailable for this pair" },
        { status: 502 }
      );
    }

    // Align last chart point with live converter (same Frankfurter latest rate)
    try {
      const latest = await fetchLatestRates(from);
      const liveRate = pairRate(from, to, latest.rates, from);
      if (liveRate > 0) {
        series[today] = liveRate;
      }
    } catch {
      // keep historical-only series
    }

    const points = Object.entries(series)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-days)
      .map(([date, rate]) => ({ date, rate }));

    if (points.length < 2) {
      return NextResponse.json(
        { error: "Not enough historical data" },
        { status: 502 }
      );
    }

    const first = points[0].rate;
    const last = points[points.length - 1].rate;
    const changePct = first > 0 ? ((last - first) / first) * 100 : 0;

    return NextResponse.json({
      from,
      to,
      points,
      changePct,
      min: Math.min(...points.map((p) => p.rate)),
      max: Math.max(...points.map((p) => p.rate)),
      latestRate: last,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}
