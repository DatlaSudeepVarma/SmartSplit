export const ALLOWED_CURRENCIES = ["USD", "INR", "EUR", "GBP", "AED"] as const;
export type AllowedCurrency = (typeof ALLOWED_CURRENCIES)[number];

export function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Latest rates: 1 `from` = rates[to] units of `to` (Frankfurter ECB). */
export async function fetchFrankfurterLatest(
  from: string,
  targets: string[]
): Promise<{ rates: Record<string, number>; updatedAt: string } | null> {
  const to = targets.filter((c) => c !== from).join(",");
  if (!to) return { rates: { [from]: 1 }, updatedAt: new Date().toISOString() };

  const url = `https://api.frankfurter.app/latest?from=${from}&to=${to}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    date?: string;
    rates?: Record<string, number>;
  };
  if (!data.rates) return null;

  const rates: Record<string, number> = { [from]: 1 };
  for (const code of targets) {
    if (code === from) continue;
    const r = data.rates[code];
    if (typeof r === "number" && r > 0) rates[code] = r;
  }
  return {
    rates,
    updatedAt: data.date ? `${data.date}T12:00:00.000Z` : new Date().toISOString(),
  };
}

export async function fetchOpenErLatest(
  base: string,
  targets: string[]
): Promise<{ rates: Record<string, number>; updatedAt: string } | null> {
  const res = await fetch(`https://open.er-api.com/v6/latest/${base}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    result?: string;
    rates?: Record<string, number>;
    time_last_update_utc?: string;
  };
  if (data.result !== "success" || !data.rates) return null;

  const rates: Record<string, number> = { [base]: 1 };
  for (const code of targets) {
    if (code === base) continue;
    const r = data.rates[code];
    if (typeof r === "number" && r > 0) rates[code] = r;
  }
  return {
    rates,
    updatedAt: data.time_last_update_utc ?? new Date().toISOString(),
  };
}

export async function fetchLatestRates(
  base: string
): Promise<{ rates: Record<string, number>; updatedAt: string; source: string }> {
  const targets = [...ALLOWED_CURRENCIES];
  const frank = await fetchFrankfurterLatest(base, targets);
  const missing = targets.filter((c) => frank?.rates[c] == null && c !== base);

  if (frank && missing.length === 0) {
    return { ...frank, source: "frankfurter" };
  }

  const openEr = await fetchOpenErLatest(base, targets);
  if (!openEr) {
    if (frank) return { ...frank, source: "frankfurter-partial" };
    throw new Error("No rate provider available");
  }

  if (frank) {
    return {
      rates: { ...openEr.rates, ...frank.rates, [base]: 1 },
      updatedAt: frank.updatedAt,
      source: "frankfurter+open.er-api",
    };
  }

  return { ...openEr, source: "open.er-api" };
}

export async function fetchFrankfurterSeries(
  from: string,
  to: string,
  start: string,
  end: string
): Promise<Record<string, number> | null> {
  const url = `https://api.frankfurter.app/${start}..${end}?from=${from}&to=${to}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    rates?: Record<string, Record<string, number>>;
  };
  if (!data.rates) return null;

  const series: Record<string, number> = {};
  for (const [date, dayRates] of Object.entries(data.rates)) {
    const rate = dayRates[to];
    if (typeof rate === "number" && rate > 0) series[date] = rate;
  }
  return Object.keys(series).length > 0 ? series : null;
}

export async function fetchHostSeries(
  from: string,
  to: string,
  start: string,
  end: string
): Promise<Record<string, number> | null> {
  const url = `https://api.exchangerate.host/timeseries?start_date=${start}&end_date=${end}&base=${from}&symbols=${to}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    rates?: Record<string, Record<string, number>>;
  };
  if (!data.rates) return null;

  const series: Record<string, number> = {};
  for (const [date, dayRates] of Object.entries(data.rates)) {
    const rate = dayRates[to];
    if (typeof rate === "number" && rate > 0) series[date] = rate;
  }
  return Object.keys(series).length > 0 ? series : null;
}

export async function fetchUsdPivotSeries(
  from: string,
  to: string,
  start: string,
  end: string
): Promise<Record<string, number> | null> {
  const url = `https://api.frankfurter.app/${start}..${end}?from=USD&to=${from},${to}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    rates?: Record<string, Record<string, number>>;
  };
  if (!data.rates) return null;

  const series: Record<string, number> = {};
  for (const [date, dayRates] of Object.entries(data.rates)) {
    const fromUsd = from === "USD" ? 1 : dayRates[from];
    const toUsd = to === "USD" ? 1 : dayRates[to];
    if (typeof fromUsd === "number" && typeof toUsd === "number" && fromUsd > 0) {
      series[date] = toUsd / fromUsd;
    }
  }
  return Object.keys(series).length > 0 ? series : null;
}

/** 1 `from` → `to` using rates table where base is `from`. */
export function pairRate(
  from: string,
  to: string,
  rates: Record<string, number>,
  base: string
): number {
  if (from === to) return 1;
  if (from === base) return rates[to] ?? 0;
  if (to === base) return 1 / (rates[from] ?? 1);
  const inBase = 1 / (rates[from] ?? 1);
  return inBase * (rates[to] ?? 0);
}
