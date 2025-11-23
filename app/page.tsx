"use client";
import Input from "@/components/Input";
import React, { useState } from "react";

export type MessageI = {
  text: string;
  type: "sent" | "recieved";
};

const Home = () => {
  const [message, setMessage] = useState<MessageI[]>([]);

  const highlights = [
    {
      title: "Real-time intelligence",
      body: "LogAI surfaces anomalies across your log archive with a conversational interface.",
      badge: "Live",
    },
    {
      title: "Hybrid search",
      body: "Deterministic log lookups backed by AI reasoning when context is missing.",
      badge: "Dual engine",
    },
    {
      title: "Human-ready outputs",
      body: "Clear summaries, follow-up suggestions, and clickable drill-downs for every response.",
      badge: "Readable",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <header className="text-center space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          LogAI console
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold text-white">
          Audit-grade memory for every log you ship.
        </h1>
        <p className="mx-auto max-w-2xl text-base text-slate-400">
          Ask natural questions, combine search + AI reasoning, and pivot into
          full log context with a single tap.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((card) => (
          <div
            key={card.title}
            className="glass-panel rounded-3xl border border-white/5 px-5 py-6"
          >
            <span className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-slate-300">
              {card.badge}
            </span>
            <h2 className="mt-4 text-xl font-semibold text-white">
              {card.title}
            </h2>
            <p className="mt-2 text-sm text-slate-400">{card.body}</p>
          </div>
        ))}
      </section>

      <section className="glass-panel rounded-[32px] border border-white/5 p-5 md:p-8 flex flex-col gap-6 min-h-[55vh]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              conversation
            </p>
            <h3 className="text-2xl font-semibold text-white">
              Ask LogAI anything
            </h3>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
            {message.length ? `${message.length} exchanges` : "new dialogue"}
          </span>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {message.length ? (
            message.map((mes: MessageI, idx: number) => (
              <div
                key={`${mes.type}-${idx}`}
                className={`max-w-[78%] rounded-3xl px-5 py-4 text-sm leading-relaxed shadow-[0_10px_35px_rgba(15,23,42,0.35)] ${mes.type === "sent"
                    ? "ml-auto bg-gradient-to-r from-[#38bdf8]/80 to-[#6366f1]/80 text-white"
                    : "bg-white/5 border border-white/5 text-slate-100"
                  }`}
              >
                {mes.text}
              </div>
            ))
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 p-8 text-center text-slate-400">
              <p className="text-lg font-medium text-white">
                Start by asking what changed.
              </p>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                “Show me failed deploys this morning” or “Summarize customer
                impact of the last outage.”
              </p>
            </div>
          )}
        </div>

        <Input setMessage={setMessage} />
      </section>
    </div>
  );
};

export default Home;
