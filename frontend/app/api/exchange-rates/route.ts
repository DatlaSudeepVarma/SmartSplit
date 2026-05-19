import { NextRequest, NextResponse } from "next/server";
import {
  ALLOWED_CURRENCIES,
  fetchLatestRates,
} from "@/lib/server/exchangeProviders";

export async function GET(request: NextRequest) {
  const base = request.nextUrl.searchParams.get("base")?.toUpperCase() ?? "USD";
  if (!ALLOWED_CURRENCIES.includes(base as (typeof ALLOWED_CURRENCIES)[number])) {
    return NextResponse.json({ error: "Unsupported base currency" }, { status: 400 });
  }

  try {
    const { rates, updatedAt, source } = await fetchLatestRates(base);

    const out: Record<string, number> = {};
    for (const code of ALLOWED_CURRENCIES) {
      if (rates[code] != null) out[code] = rates[code];
    }

    const missing = ALLOWED_CURRENCIES.filter((c) => out[c] == null);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Rates unavailable for: ${missing.join(", ")}` },
        { status: 502 }
      );
    }

    return NextResponse.json({
      base,
      rates: out,
      updatedAt,
      source,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch rates" }, { status: 500 });
  }
}
