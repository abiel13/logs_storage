"use client";

import { fetchlogs } from "@/lib/actions/logs.actions";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 10;

const SearchPage = () => {
  const [data, setData] = useState<any>(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      const logs = await fetchlogs(offset);
      if (!ignore) {
        setData(logs);
        setLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [offset]);

  const totalPages = useMemo(() => {
    if (!data?.total) return 1;
    return Math.ceil(data.total / PAGE_SIZE);
  }, [data?.total]);

  const showingStart = data?.total ? offset + 1 : 0;
  const showingEnd = data?.total ? Math.min(offset + PAGE_SIZE, data.total) : 0;

  return (
    <div className="flex w-full flex-col gap-8">
      <header className="glass-panel rounded-3xl border border-white/5 px-6 py-6 flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          log inventory
        </p>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              {data?.total ?? "..."} stored logs
            </h1>
            <p className="text-sm text-slate-400">
              Browse the entire catalog or narrow down with a query above.
            </p>
          </div>
          <div className="rounded-full border border-white/10 px-4 py-1 text-sm text-slate-300">
            Page {Math.floor(offset / PAGE_SIZE) + 1} of {totalPages}
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="grid gap-3 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="glass-panel h-32 animate-pulse rounded-3xl border border-white/5"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {data?.data?.map((log: any) => (
              <div
                key={log.title}
                className="glass-panel rounded-[28px] border border-white/5 px-5 py-6 lg:px-8"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      log insight
                    </p>
                    <h2 className="text-xl font-semibold text-white">
                      {log.title}
                    </h2>
                    <p className="text-sm text-slate-400">
                      {log.solution.slice(0, 180)}...
                    </p>
                  </div>
                  <Link
                    href={`/details-page/${encodeURIComponent(log.title)}`}
                    className="mt-2 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#0ea5e9] px-6 py-2 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(99,102,241,0.25)] transition hover:scale-[1.01]"
                  >
                    View detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-200">
        <p>
          {data?.total
            ? `Showing ${showingStart}–${showingEnd} of ${data.total}`
            : "Loading results..."}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setOffset((prev) => Math.max(prev - PAGE_SIZE, 0))}
            disabled={!data?.hasPrev}
            className={`rounded-full px-4 py-2 transition ${data?.hasPrev
                ? "bg-white/10 text-white"
                : "bg-white/5 text-slate-500 cursor-not-allowed"
              }`}
          >
            Prev
          </button>
          <button
            onClick={() => setOffset((prev) => prev + PAGE_SIZE)}
            disabled={!data?.hasNext}
            className={`rounded-full px-4 py-2 transition ${data?.hasNext
                ? "bg-gradient-to-r from-[#6366f1] to-[#0ea5e9] text-white"
                : "bg-white/5 text-slate-500 cursor-not-allowed"
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
