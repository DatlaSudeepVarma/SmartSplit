import { Currency } from "../types";

export type ExchangeRatesResponse = {
  base: Currency;
  rates: Record<Currency, number>;
  updatedAt: string;
};

const SUPPORTED: Currency[] = ["USD", "INR", "EUR", "GBP", "AED"];

const CACHE_KEY = "v2";
const cache = new Map<string, { data: ExchangeRatesResponse; expires: number }>();
const CACHE_MS = 3 * 60 * 1000;

function pickRates(
  base: Currency,
  allRates: Record<string, number>
): Record<Currency, number> {
  const out = {} as Record<Currency, number>;
  for (const code of SUPPORTED) {
    if (code === base) {
      out[code] = 1;
    } else {
      const rate = allRates[code];
      if (typeof rate === "number" && rate > 0) out[code] = rate;
    }
  }
  return out;
}

export async function fetchExchangeRates(
  base: Currency = "USD"
): Promise<ExchangeRatesResponse> {
  const cached = cache.get(`${CACHE_KEY}:${base}`);
  if (cached && cached.expires > Date.now()) return cached.data;

  const res = await fetch(`/api/exchange-rates?base=${base}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to load exchange rates");
  }
  const json = (await res.json()) as {
    base: string;
    rates: Record<string, number>;
    updatedAt: string;
  };

  const rates = pickRates(base, json.rates);
  const missing = SUPPORTED.filter((c) => rates[c] == null);
  if (missing.length > 0) {
    throw new Error(`Rates unavailable for: ${missing.join(", ")}`);
  }

  const data: ExchangeRatesResponse = {
    base,
    rates,
    updatedAt: json.updatedAt,
  };
  cache.set(`${CACHE_KEY}:${base}`, { data, expires: Date.now() + CACHE_MS });
  return data;
}

export type RateHistoryPoint = { date: string; rate: number };

export type RateHistoryResponse = {
  from: Currency;
  to: Currency;
  points: RateHistoryPoint[];
  changePct: number;
  min: number;
  max: number;
  latestRate?: number;
};

const historyCache = new Map<
  string,
  { data: RateHistoryResponse; expires: number }
>();
const HISTORY_CACHE_MS = 30 * 60 * 1000;

export async function fetchRateHistory(
  from: Currency,
  to: Currency,
  days = 5
): Promise<RateHistoryResponse> {
  const key = `${CACHE_KEY}:${from}-${to}-${days}`;
  const cached = historyCache.get(key);
  if (cached && cached.expires > Date.now()) return cached.data;

  const res = await fetch(
    `/api/exchange-rates/history?from=${from}&to=${to}&days=${days}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to load rate history");

  const data = (await res.json()) as RateHistoryResponse;
  historyCache.set(key, { data, expires: Date.now() + HISTORY_CACHE_MS });
  return data;
}

/** Exchange rate for 1 unit of `from` in `to` (same formula as server/chart). */
export function getPairRate(
  from: Currency,
  to: Currency,
  rates: Record<Currency, number>,
  base: Currency
): number {
  if (from === to) return 1;
  if (from === base) return rates[to] ?? 0;
  if (to === base) return 1 / (rates[from] || 1);
  const inBase = 1 / (rates[from] || 1);
  return inBase * (rates[to] ?? 0);
}

export function convertAmount(
  amount: number,
  from: Currency,
  to: Currency,
  ratesFromBase: Record<Currency, number>,
  base: Currency
): number {
  return amount * getPairRate(from, to, ratesFromBase, base);
}
