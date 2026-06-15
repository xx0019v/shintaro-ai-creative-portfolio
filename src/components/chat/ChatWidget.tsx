"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

type Role = "user" | "assistant";
interface Msg {
  role: Role;
  content: string;
}

const EASE = [0.19, 1, 0.22, 1] as const;

const QUICK_KEYS = [
  "chat_q_ai",
  "chat_q_fragrance",
  "chat_q_signage",
  "chat_q_tsc",
  "chat_q_hire",
  "chat_q_lang",
] as const;

export default function ChatWidget() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // initial welcome message — refresh when language changes
  useEffect(() => {
    setMessages([
      { role: "assistant", content: tr("chat_welcome", lang) },
    ]);
  }, [lang]);

  useEffect(() => {
    if (open) {
      // scroll to bottom
      const el = listRef.current;
      if (el) el.scrollTop = el.scrollHeight;
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages.length, pending]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setPending(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });
      const j = await r.json();
      setMessages([
        ...next,
        { role: "assistant", content: String(j.reply ?? "…") },
      ]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            lang === "jp"
              ? "通信に失敗しました。もう一度お試しください。"
              : "Connection failed. Please try again.",
        },
      ]);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      {/* Floating launcher — bottom left so it doesn't fight SectionIndex */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.8 }}
        onClick={() => setOpen(true)}
        aria-label={tr("chat_open", lang)}
        className="fixed bottom-6 left-6 z-[60] hidden md:flex items-center gap-2 px-4 py-3 text-[10px] tracking-[0.32em] uppercase text-offwhite hairline-silver glass hover:border-silver-bright transition-colors duration-500"
      >
        <MessageCircle size={14} strokeWidth={1.4} className="text-silver-bright" />
        {tr("chat_open", lang)}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[80] flex items-end md:items-center md:justify-end"
            onClick={() => setOpen(false)}
          >
            <div
              className="absolute inset-0 bg-base/45 backdrop-blur-sm"
              aria-hidden
            />
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full md:w-[420px] md:mr-8 h-[80vh] md:h-[600px] glass hairline-silver flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="chat-title"
            >
              {/* header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-offwhite/[0.08]">
                <div>
                  <p
                    id="chat-title"
                    className="text-[10px] tracking-[0.36em] uppercase text-silver-bright"
                  >
                    {tr("chat_title", lang)}
                  </p>
                  <p className="mt-1 font-serif text-base text-offwhite leading-snug">
                    AVENDANO · AI
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={tr("chat_close", lang)}
                  className="text-offwhite/70 hover:text-offwhite transition-colors"
                >
                  <X size={18} strokeWidth={1.2} />
                </button>
              </div>

              {/* messages */}
              <div
                ref={listRef}
                className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[88%] ${
                      m.role === "user"
                        ? "ml-auto bg-silver-bright text-base"
                        : "mr-auto hairline text-offwhite/90"
                    } px-4 py-3 text-sm leading-relaxed`}
                  >
                    {m.content}
                  </div>
                ))}
                {pending && (
                  <div className="mr-auto hairline px-4 py-3 text-sm text-silver-muted inline-flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-silver-bright animate-pulse" />
                    {tr("chat_thinking", lang)}
                  </div>
                )}
              </div>

              {/* quick chips */}
              <div className="px-5 pt-3 flex flex-wrap gap-2">
                {QUICK_KEYS.map((k) => (
                  <button
                    key={k}
                    onClick={() => send(tr(k, lang))}
                    disabled={pending}
                    className="text-[10px] tracking-wider2 uppercase hairline px-3 py-1.5 text-offwhite/80 hover:hairline-silver hover:text-offwhite transition-colors duration-300 disabled:opacity-40"
                  >
                    {tr(k, lang)}
                  </button>
                ))}
              </div>

              {/* input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="px-5 py-4 border-t border-offwhite/[0.08] flex items-center gap-3"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={tr("chat_input_ph", lang)}
                  className="flex-1 bg-transparent text-sm text-offwhite placeholder:text-silver-muted/60 focus:outline-none"
                  disabled={pending}
                />
                <button
                  type="submit"
                  disabled={pending || !input.trim()}
                  aria-label={tr("chat_send", lang)}
                  className="text-silver-bright hover:text-offwhite disabled:opacity-30 transition-colors"
                >
                  <Send size={16} strokeWidth={1.3} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
