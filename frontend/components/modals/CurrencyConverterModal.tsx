"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpDown,
  ChevronDown,
  LineChart,
  Loader2,
  X,
} from "lucide-react";
import CurrencyTrendChart from "../charts/CurrencyTrendChart";
import { ThemeContext } from "../../context/AppContext";
import { CURRENCIES } from "../../lib/constants";
import {
  fetchExchangeRates,
  fetchRateHistory,
  getPairRate,
  type ExchangeRatesResponse,
  type RateHistoryResponse,
} from "../../lib/exchangeRates";
import { Currency } from "../../types";

const CURRENCIES_LIST = Object.keys(CURRENCIES) as Currency[];

const CURRENCY_META: Record<Currency, { flag: string; locale: string }> = {
  USD: { flag: "🇺🇸", locale: "en-US" },
  INR: { flag: "🇮🇳", locale: "en-IN" },
  EUR: { flag: "🇪🇺", locale: "de-DE" },
  GBP: { flag: "🇬🇧", locale: "en-GB" },
  AED: { flag: "🇦🇪", locale: "ar-AE" },
};

function formatMoney(value: number, currency: Currency): string {
  const { locale } = CURRENCY_META[currency];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatRate(value: number): string {
  if (value >= 100) return value.toFixed(2);
  if (value >= 1) return value.toFixed(4);
  return value.toFixed(5);
}

function formatUtcTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
      timeZoneName: "short",
    });
  } catch {
    return "—";
  }
}

type CurrencyConverterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CurrencyConverterModal = ({
  isOpen,
  onClose,
}: CurrencyConverterModalProps) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const panelRef = useRef<HTMLDivElement>(null);

  const [from, setFrom] = useState<Currency>("USD");
  const [to, setTo] = useState<Currency>("INR");
  const [amount, setAmount] = useState("1000");
  const [ratesData, setRatesData] = useState<ExchangeRatesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTrend, setShowTrend] = useState(false);
  const [history, setHistory] = useState<RateHistoryResponse | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const loadRates = useCallback(async (base: Currency) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchExchangeRates(base);
      setRatesData(data);
    } catch {
      setError("Could not load live rates. Try again.");
      setRatesData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setShowTrend(false);
      setHistory(null);
      return;
    }
    void loadRates(from);
  }, [isOpen, from, loadRates]);

  useEffect(() => {
    if (!isOpen || !showTrend) return;
    let cancelled = false;
    setHistoryLoading(true);
    setHistoryError(null);
    void fetchRateHistory(from, to, 5)
      .then((data) => {
        if (!cancelled) setHistory(data);
      })
      .catch(() => {
        if (!cancelled) {
          setHistoryError("Could not load 5-day trend.");
          setHistory(null);
        }
      })
      .finally(() => {
        if (!cancelled) setHistoryLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, showTrend, from, to]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if ((target as Element).closest?.("[data-conv-trigger]")) return;
      onClose();
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isOpen, onClose]);

  const parsedAmount = useMemo(() => {
    const n = parseFloat(amount.replace(/,/g, ""));
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }, [amount]);

  const rateFromTo = useMemo(() => {
    if (!ratesData) return null;
    const rate = getPairRate(from, to, ratesData.rates, ratesData.base);
    return rate > 0 ? rate : null;
  }, [ratesData, from, to]);

  const converted = useMemo(() => {
    if (!rateFromTo || parsedAmount === 0) return 0;
    return parsedAmount * rateFromTo;
  }, [parsedAmount, rateFromTo]);

  const rateToFrom = useMemo(() => {
    if (!rateFromTo || rateFromTo === 0) return null;
    return 1 / rateFromTo;
  }, [rateFromTo]);

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
    setAmount(converted > 0 ? String(converted) : amount);
    setHistory(null);
  };

  const panelBg = isDark ? "bg-[#1c1c1e]" : "bg-[#f5f4f0]";
  const cardBg = isDark ? "bg-[#2c2c2e]" : "bg-white";
  const muted = isDark ? "text-white/45" : "text-gray-400";
  const text = isDark ? "text-white" : "text-gray-900";
  const border = isDark ? "border-white/10" : "border-gray-200/80";
  const selectBg = isDark ? "bg-[#3a3a3c]" : "bg-white";

  const currencyPill = (value: Currency, onChange: (c: Currency) => void) => (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Currency)}
        className={`appearance-none rounded-full py-2 pl-3 pr-8 text-sm font-semibold shadow-sm ring-1 ${selectBg} ${text} ${isDark ? "ring-white/10" : "ring-gray-200"}`}
        aria-label={`Select ${value} currency`}
      >
        {CURRENCIES_LIST.map((c) => (
          <option key={c} value={c}>
            {CURRENCY_META[c].flag} {c}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 ${muted}`}
      />
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className={`absolute left-0 top-[calc(100%+0.5rem)] z-[120] w-[min(calc(100vw-1.5rem),22rem)] overflow-hidden rounded-2xl shadow-2xl ring-1 ${
            isDark
              ? "ring-white/10 shadow-black/50"
              : "ring-black/5 shadow-gray-400/30"
          } ${panelBg}`}
          role="dialog"
          aria-label="Currency converter"
        >
          <motion.div className={`flex justify-end px-3 pt-3 ${panelBg}`}>
            <button
              type="button"
              onClick={onClose}
              className={`rounded-full p-1.5 ${isDark ? "text-white/50 hover:bg-white/10" : "text-gray-400 hover:bg-black/5"}`}
              aria-label="Close converter"
            >
              <X size={18} />
            </button>
          </motion.div>

          <motion.div className={`space-y-0 px-4 pb-4 ${panelBg}`}>
            {/* From */}
            <motion.div className={`rounded-2xl p-4 ${cardBg} shadow-sm`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value.replace(/[^\d.]/g, ""))
                    }
                    className={`w-full bg-transparent text-2xl font-bold tracking-tight outline-none ${text}`}
                    aria-label="Amount to convert"
                  />
                  <p className={`mt-1 text-xs ${muted}`}>Amount to convert</p>
                </div>
                {currencyPill(from, setFrom)}
              </div>
              {ratesData && rateFromTo != null && (
                <p className={`mt-3 text-right text-xs ${muted}`}>
                  1 {from} = {formatRate(rateFromTo)} {to}
                </p>
              )}
            </motion.div>

            {/* Swap */}
            <motion.div className="relative flex justify-center py-1">
              <motion.div
                className={`absolute inset-x-4 top-1/2 h-px -translate-y-1/2 ${border} border-t`}
                aria-hidden
              />
              <button
                type="button"
                onClick={swapCurrencies}
                className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-md ring-1 ${cardBg} ${isDark ? "ring-white/10 hover:bg-[#3a3a3c]" : "ring-gray-200 hover:bg-gray-50"}`}
                aria-label="Swap currencies"
              >
                <ArrowUpDown size={16} className={text} />
              </button>
            </motion.div>

            {/* To */}
            <motion.div className={`rounded-2xl p-4 ${cardBg} shadow-sm`}>
              <motion.div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  {loading && !ratesData ? (
                    <div className={`flex h-9 items-center gap-2 text-2xl font-bold ${muted}`}>
                      <Loader2 size={22} className="animate-spin" />
                    </div>
                  ) : (
                    <p className={`truncate text-2xl font-bold tracking-tight ${text}`}>
                      {formatMoney(converted, to)}
                    </p>
                  )}
                  <p className={`mt-1 text-xs ${muted}`}>Converted amount</p>
                </div>
                {currencyPill(to, setTo)}
              </motion.div>
              {ratesData && rateToFrom != null && (
                <p className={`mt-3 text-right text-xs ${muted}`}>
                  1 {to} = {formatRate(rateToFrom)} {from}
                </p>
              )}
            </motion.div>

            {error && (
              <p className="text-center text-xs text-red-500 dark:text-red-400">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={() => setShowTrend((v) => !v)}
              className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-colors ${
                showTrend
                  ? isDark
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-gray-300 bg-gray-100 text-gray-900"
                  : isDark
                    ? "border-white/15 bg-[#2c2c2e] text-white hover:bg-[#3a3a3c]"
                    : "border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-50"
              }`}
            >
              <LineChart size={18} />
              {showTrend ? "Hide 5-day trend" : "View 5-day rate trend"}
            </button>

            <AnimatePresence>
              {showTrend && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <motion.div
                    className={`mt-3 rounded-2xl p-4 ${cardBg} shadow-sm`}
                  >
                    {historyLoading ? (
                      <div
                        className={`flex h-36 items-center justify-center gap-2 ${muted}`}
                      >
                        <Loader2 size={20} className="animate-spin" />
                        <span className="text-xs">Loading trend…</span>
                      </div>
                    ) : historyError ? (
                      <p className="py-8 text-center text-xs text-red-500 dark:text-red-400">
                        {historyError}
                      </p>
                    ) : history ? (
                      <CurrencyTrendChart
                        points={history.points}
                        from={from}
                        to={to}
                        isDark={isDark}
                        changePct={history.changePct}
                      />
                    ) : null}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {ratesData && rateFromTo != null && rateToFrom != null && (
              <motion.div
                className={`mt-3 space-y-1 text-[10px] leading-relaxed ${muted}`}
              >
                <p>
                  1 {from} = {formatRate(rateFromTo)} {to} • 1 {to} ={" "}
                  {formatRate(rateToFrom)} {from}
                </p>
                <p className="text-right">
                  Mid-market rate at {formatUtcTime(ratesData.updatedAt)}
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CurrencyConverterModal;
