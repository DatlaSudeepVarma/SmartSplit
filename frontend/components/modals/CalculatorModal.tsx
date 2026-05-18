"use client";

import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { History, Moon, Sun, X } from "lucide-react";
import { ThemeContext } from "../../context/AppContext";

type CalcKey =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "."
  | "AC"
  | "+/-"
  | "%"
  | "÷"
  | "×"
  | "-"
  | "+"
  | "="
  | "history";

const OP_SYMBOL: Record<string, string> = {
  "/": "÷",
  "*": "×",
  "-": "-",
  "+": "+",
};

const KEYPAD: CalcKey[][] = [
  ["AC", "+/-", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["history", "0", ".", "="],
];

function formatDisplay(value: string): string {
  if (value === "Error") return value;
  const parts = value.split(".");
  const intPart = parts[0] ?? "0";
  const neg = intPart.startsWith("-");
  const digits = neg ? intPart.slice(1) : intPart;
  const withCommas = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedInt = neg ? `-${withCommas}` : withCommas;
  if (parts.length === 2) return `${formattedInt}.${parts[1]}`;
  return formattedInt;
}

function parseDisplay(value: string): number {
  return parseFloat(value.replace(/,/g, ""));
}

type CalculatorModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CalculatorModal = ({ isOpen, onClose }: CalculatorModalProps) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const panelRef = useRef<HTMLDivElement>(null);

  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const reset = useCallback(() => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }, []);

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if ((target as Element).closest?.("[data-calc-trigger]")) return;
      onClose();
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isOpen, onClose]);

  const expression =
    storedValue != null && operator
      ? `${formatDisplay(String(storedValue))} ${OP_SYMBOL[operator] ?? operator}`
      : "";

  const performCalculation = (prev: number, next: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + next;
      case "-":
        return prev - next;
      case "*":
        return prev * next;
      case "/":
        return next === 0 ? NaN : prev / next;
      default:
        return next;
    }
  };

  const handleEquals = () => {
    if (storedValue == null || !operator) return;
    const current = parseDisplay(display);
    const result = performCalculation(storedValue, current, operator);
    if (Number.isNaN(result) || !Number.isFinite(result)) {
      setDisplay("Error");
      setStoredValue(null);
      setOperator(null);
      setWaitingForOperand(true);
      return;
    }
    const resultStr = String(result);
    setLastResult(resultStr);
    setDisplay(resultStr);
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handleOperator = (nextOp: string) => {
    const current = parseDisplay(display);
    if (storedValue == null) {
      setStoredValue(current);
    } else if (!waitingForOperand) {
      const result = performCalculation(storedValue, current, operator!);
      if (Number.isNaN(result) || !Number.isFinite(result)) {
        setDisplay("Error");
        setStoredValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }
      setStoredValue(result);
      setDisplay(String(result));
    }
    const internal =
      nextOp === "÷" ? "/" : nextOp === "×" ? "*" : nextOp;
    setOperator(internal);
    setWaitingForOperand(true);
  };

  const handleKey = (key: CalcKey) => {
    if (key === "AC") {
      reset();
      return;
    }
    if (key === "+/-") {
      if (display === "0" || display === "Error") return;
      setDisplay((d) => (d.startsWith("-") ? d.slice(1) : `-${d}`));
      return;
    }
    if (key === "%") {
      const n = parseDisplay(display);
      if (Number.isNaN(n)) return;
      setDisplay(String(n / 100));
      setWaitingForOperand(false);
      return;
    }
    if (key === "history") {
      if (lastResult) {
        setDisplay(lastResult);
        setWaitingForOperand(false);
      }
      return;
    }
    if (key === "=") {
      handleEquals();
      return;
    }
    if (key === "÷" || key === "×" || key === "-" || key === "+") {
      handleOperator(key);
      return;
    }
    if (key === ".") {
      if (waitingForOperand) {
        setDisplay("0.");
        setWaitingForOperand(false);
        return;
      }
      if (!display.includes(".")) setDisplay(`${display}.`);
      return;
    }
    if (/\d/.test(key)) {
      if (waitingForOperand || display === "0" || display === "Error") {
        setDisplay(key);
        setWaitingForOperand(false);
      } else {
        setDisplay(display + key);
      }
    }
  };

  const keyClass = (key: CalcKey): string => {
    const base =
      "flex h-14 items-center justify-center rounded-2xl text-2xl font-normal transition-transform active:scale-95 select-none";
    if (key === "=") {
      return `${base} ${isDark ? "text-[#f0847f]" : "text-[#e07a6f]"}`;
    }
    if (["÷", "×", "-", "+"].includes(key)) {
      return `${base} ${isDark ? "text-[#f0847f]" : "text-[#e07a6f]"}`;
    }
    if (["AC", "+/-", "%"].includes(key)) {
      return `${base} ${isDark ? "text-[#6ec9b8]" : "text-[#5eb3a6]"}`;
    }
    if (key === "history") {
      return `${base} ${isDark ? "text-white/90" : "text-gray-900"}`;
    }
    return `${base} ${isDark ? "text-white" : "text-gray-900"}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className={`absolute left-0 top-[calc(100%+0.5rem)] z-[120] w-[min(calc(100vw-1.5rem),20rem)] overflow-hidden rounded-[1.75rem] shadow-2xl ring-1 ${
            isDark
              ? "bg-[#1a1a1c] ring-white/10 shadow-black/50"
              : "bg-white ring-black/5 shadow-gray-400/25"
          }`}
          role="dialog"
          aria-label="Calculator"
        >
          {/* Header: theme toggle */}
          <motion.div
            className={`flex items-center justify-between px-4 pt-3 pb-1 ${isDark ? "bg-[#1a1a1c]" : "bg-white"}`}
          >
            <div
              className={`flex items-center rounded-full p-0.5 ${
                isDark ? "bg-[#2a2a2c]" : "bg-gray-100"
              }`}
            >
              <button
                type="button"
                onClick={() => theme !== "light" && toggleTheme()}
                className={`rounded-full p-2 transition-colors ${
                  !isDark ? "bg-white shadow-sm" : "text-white/40 hover:text-white/70"
                }`}
                aria-label="Light mode"
              >
                <Sun size={16} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => theme !== "dark" && toggleTheme()}
                className={`rounded-full p-2 transition-colors ${
                  isDark ? "bg-[#3a3a3c] shadow-sm text-white" : "text-gray-400 hover:text-gray-600"
                }`}
                aria-label="Dark mode"
              >
                <Moon size={16} strokeWidth={2} />
              </button>
            </motion.div>
            <button
              type="button"
              onClick={onClose}
              className={`rounded-full p-1.5 ${isDark ? "text-white/50 hover:bg-white/10" : "text-gray-400 hover:bg-gray-100"}`}
              aria-label="Close calculator"
            >
              <X size={18} />
            </button>
          </motion.div>

          {/* Display */}
          <motion.div
            className={`px-5 pb-4 pt-2 text-right ${isDark ? "bg-[#1a1a1c]" : "bg-white"}`}
          >
            <p
              className={`min-h-[1.25rem] truncate text-base font-normal ${
                isDark ? "text-white/45" : "text-gray-400"
              }`}
            >
              {expression && (
                <>
                  {expression.split(" ").map((part, i) => (
                    <span key={i}>
                      {i > 0 && " "}
                      {["÷", "×", "-", "+"].includes(part) ? (
                        <span className={isDark ? "text-[#f0847f]" : "text-[#e07a6f]"}>
                          {part}
                        </span>
                      ) : (
                        part
                      )}
                    </span>
                  ))}
                </>
              )}
            </motion.div>
            <p
              className={`truncate text-4xl font-semibold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {formatDisplay(display)}
            </p>
          </motion.div>

          {/* Keypad */}
          <motion.div
            className={`rounded-t-[1.75rem] px-3 pb-4 pt-3 ${
              isDark ? "bg-[#252527]" : "bg-[#f5f5f7]"
            }`}
          >
            <div className="grid grid-cols-4 gap-1">
              {KEYPAD.flat().map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleKey(key)}
                  className={keyClass(key)}
                  aria-label={key === "history" ? "Last result" : key}
                >
                  {key === "history" ? (
                    <History size={22} strokeWidth={1.75} />
                  ) : (
                    key
                  )}
                </button>
              ))}
            </motion.div>
            <div
              className={`mx-auto mt-3 h-1 w-28 rounded-full ${
                isDark ? "bg-white/20" : "bg-gray-300"
              }`}
              aria-hidden
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalculatorModal;
