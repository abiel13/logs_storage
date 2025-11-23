"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

const quickFilters = [
  "Unauthorized access",
  "Latency spikes",
  "Database timeout",
  "Memory leak",
];

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const shouldRender = useMemo(() => pathname !== "/", [pathname]);
  if (!shouldRender) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search-logs/${encodeURIComponent(trimmed)}`);
  };

  const handleQuickClick = (chip: string) => {
    setQuery(chip);
    router.push(`/search-logs/${encodeURIComponent(chip)}`);
  };

  return (
    <div className="w-full space-y-3">
      <form
        onSubmit={handleSubmit}
        className="glass-panel flex flex-wrap items-center gap-4 rounded-3xl px-4 py-4 md:px-6"
      >
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            search logs
          </p>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Try “Failed deployments last 24h”"
            className="mt-1 w-full bg-transparent text-lg text-white placeholder:text-slate-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#06b6d4] px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(99,102,241,0.25)] transition hover:scale-[1.02]"
        >
          Search
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleQuickClick(chip)}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300 transition hover:border-white/40 hover:text-white"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;