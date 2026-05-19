"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Loader2, Send, Sparkles, User } from "lucide-react";
import { api } from "../../lib/api";
import type { ChatMessage } from "../../lib/api/chat";

const SUGGESTIONS = [
  "Give me SIP tips for my income",
  "How much am I tracking in trips?",
  "Summarize my pending settlements",
  "Budget advice from my expenses",
];

type ProfileChatbotProps = {
  userName?: string;
};

const ProfileChatbot = ({ userName }: ProfileChatbotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hi${userName ? ` ${userName.split(" ")[0]}` : ""}! I'm SmartSplit AI. I use your profile and trip data from the database, and I can help with SIP investment tips, expense splits, and budgeting. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [contextSummary, setContextSummary] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const history = messages.filter((m) => m.role === "user" || m.role === "assistant");
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    scrollToBottom();

    try {
      const res = await api.sendChatMessage(trimmed, history);
      setContextSummary(res.contextSummary ?? null);
      setMessages((prev) => [...prev, { role: "assistant", content: res.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reach the server. Make sure the backend is running and you're signed in.",
        },
      ]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  return (
    <div className="flex h-[min(520px,70vh)] flex-col overflow-hidden rounded-[28px] border border-brand-blue/15 bg-white/80 shadow-xl shadow-brand-blue/10 backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50">
      <motion.div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-green text-white shadow-lg shadow-brand-blue/25">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-black text-gray-900 dark:text-white">SmartSplit AI</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Profile data · SIP tips
            </p>
          </div>
        </div>
        {contextSummary && (
          <span className="hidden rounded-full bg-brand-blue/10 px-3 py-1 text-[10px] font-bold text-brand-blue sm:inline dark:bg-brand-blue/20">
            {contextSummary}
          </span>
        )}
      </motion.div>

      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                  msg.role === "user"
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "bg-brand-blue/15 text-brand-blue dark:bg-brand-blue/25"
                }`}
              >
                {msg.role === "user" ? (
                  <User size={14} className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sparkles size={14} />
                )}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-brand-blue text-white"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Loader2 size={16} className="animate-spin" />
            Thinking…
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 px-4 py-3 dark:border-white/10">
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => void send(s)}
              disabled={loading}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-bold text-gray-600 transition hover:border-brand-blue/30 hover:text-brand-blue disabled:opacity-50 dark:border-white/10 dark:bg-gray-800 dark:text-gray-300"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about SIPs, trips, or your profile…"
            className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-blue/40 dark:border-white/10 dark:bg-gray-800 dark:text-white"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue text-white transition hover:bg-brand-skyblue disabled:opacity-50"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileChatbot;
