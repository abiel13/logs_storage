"use client";

import { routes } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="glass-panel w-full lg:w-[280px] rounded-[28px] px-5 py-6 flex flex-col gap-8 self-start lg:sticky lg:top-10">
      <div className="space-y-3">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(14,165,233,0.8)]" />
          live
        </p>
        <div>
          <h1 className="text-3xl font-semibold text-white">LogAI</h1>
          <p className="text-sm text-slate-400 mt-1">
            Intelligent log memory & retrieval with AI assistance.
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-3">
        {routes.map((route) => {
          const isActive =
            pathname === route.route || pathname.startsWith(`${route.route}/`);
          return (
            <Link
              href={route.route}
              key={route.route}
              className={`glow-border relative flex items-center justify-between rounded-2xl border border-white/5 px-4 py-3 transition 
                ${isActive
                  ? "bg-white/15 text-white shadow-[0_10px_30px_rgba(99,102,241,0.2)]"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
            >
              <span className="flex items-center gap-3 text-sm font-medium">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg">
                  <route.Icon />
                </span>
                {route.title}
              </span>
              <FiArrowUpRight className="text-base" />
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-5 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-300 mb-2">
          freshness score
        </p>
        <p className="text-4xl font-semibold text-white">99.2%</p>
        <p className="text-sm text-slate-400 mt-2">
          Logs synced daily with intelligent change tracking.
        </p>
        <div className="mt-5 w-full overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={"/image.png"}
            alt="Log AI illustration"
            width={400}
            height={220}
            className="w-full object-cover"
            priority
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
