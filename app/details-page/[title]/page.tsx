"use client";

import { fetchOneByTitle } from "@/lib/actions/logs.actions";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const DetailsPage = () => {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title as string);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      const logs = await fetchOneByTitle(decodedTitle);
      if (!ignore) {
        setData(logs);
        setLoading(false);
      }
    };
    load();

    return () => {
      ignore = true;
    };
  }, [decodedTitle]);

  const paragraphs = useMemo<string[]>(
    () => data?.solution?.split("\n\n").filter(Boolean) ?? [],
    [data?.solution]
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
        <Link
          href="/search-logs"
          className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/40 hover:text-white"
        >
          ← Back to all logs
        </Link>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">
          detail view
        </span>
      </div>

      <section className="glass-panel rounded-[32px] border border-white/10 px-6 py-8 md:px-10 md:py-12">
        {loading ? (
          <div className="space-y-4">
            <div className="h-8 w-1/2 rounded-full bg-white/10 animate-pulse" />
            <div className="h-5 w-3/4 rounded-full bg-white/10 animate-pulse" />
            <div className="h-5 w-full rounded-full bg-white/10 animate-pulse" />
            <div className="h-5 w-2/3 rounded-full bg-white/10 animate-pulse" />
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              insight
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-white">
              {decodedTitle}
            </h1>
            <div className="mt-6 flex flex-col gap-5 text-base leading-relaxed text-slate-200">
              {paragraphs.length
                ? paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-slate-200">
                    {paragraph}
                  </p>
                ))
                : (
                  <p className="text-slate-400">
                    No solution available for this log yet.
                  </p>
                )}
            </div>
          </>
        )}
      </section>

      {data?.solution && (
        <div className="grid gap-4 md:grid-cols-2">
          {["Share summary", "Open in search"].map((cta) => (
            <button
              key={cta}
              className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-white/40 hover:text-white"
            >
              {cta}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
