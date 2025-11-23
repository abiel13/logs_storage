"use client";

import { MessageI } from "@/app/page";
import { SearchlogsOrNet } from "@/lib/actions/logs.actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const helperPills = [
  "Summarize failed cron jobs",
  "Reconnect instructions",
  "Latest security alerts",
];

const Input = ({ setMessage }: { setMessage: any }) => {
  const [question, setQuestion] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) {
      setError("Ask something specific to get a meaningful response.");
      return;
    }
    setError("");
    setIsThinking(true);

    setMessage((prev: MessageI[]) => [
      ...prev,
      {
        text: trimmed,
        type: "sent",
      },
    ]);

    try {
      const response = await SearchlogsOrNet(trimmed);

      if (response === "Redirect") {
        router.push(`/search-logs/${encodeURIComponent(trimmed)}`);
        return;
      }

      setMessage((prev: MessageI[]) => [
        ...prev,
        {
          text: response,
          type: "recieved",
        },
      ]);
    } catch (err) {
      setError("Something went wrong. Try again in a moment.");
    } finally {
      setIsThinking(false);
      setQuestion("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel rounded-[28px] border border-white/5 px-5 py-4 md:px-6 md:py-6 space-y-4"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="relative flex-1">
          <label className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Ask logai
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit();
              }
            }}
            rows={2}
            className="mt-2 w-full resize-none rounded-2xl border border-white/5 bg-white/5 px-4 py-4 text-base text-white placeholder:text-slate-500 focus:border-white/40 focus:outline-none"
            placeholder="e.g. “Why did the ingestion pipeline slow down yesterday?”"
          />
          <p className="absolute bottom-3 right-4 text-xs text-slate-400">
            ↵ Enter to send
          </p>
        </div>
        <button
          type="submit"
          disabled={isThinking}
          className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#0ea5e9] to-[#6366f1] px-8 py-4 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(14,165,233,0.25)] transition disabled:opacity-60"
        >
          {isThinking ? "Thinking..." : "Launch Search"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-slate-400">
        {helperPills.map((pill) => (
          <button
            key={pill}
            type="button"
            onClick={() => setQuestion(pill)}
            className="rounded-full border border-white/10 px-3 py-1 text-left transition hover:border-white/40 hover:text-white"
          >
            {pill}
          </button>
        ))}
      </div>
      {error && <p className="text-sm text-rose-400">{error}</p>}
    </form>
  );
};

export default Input;
