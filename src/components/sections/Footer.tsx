"use client";

import { ArrowUp } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

const TAGS = ["AI", "Web", "Branding", "Visual Design", "Project Direction"];

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="relative border-t border-offwhite/[0.08]">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-serif text-base md:text-lg tracking-tight text-offwhite">
              Avendano Shintaro
            </p>
            <p className="mt-2 text-[10px] tracking-wider2 uppercase text-silver-muted">
              {tr("ft_role", lang)}
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] tracking-wider2 uppercase text-silver-muted">
            {TAGS.map((t, i) => (
              <li key={t} className="flex items-center gap-2">
                {i > 0 && <span className="h-px w-2 bg-silver-muted/40" />}
                {t}
              </li>
            ))}
          </ul>

          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-[10px] tracking-wider2 uppercase text-offwhite/70 hover:text-silver-bright transition-colors"
          >
            <ArrowUp
              size={14}
              strokeWidth={1.25}
              className="transition-transform duration-500 group-hover:-translate-y-1"
            />
            {tr("ft_back", lang)}
          </a>
        </div>

        <div className="mt-10 rule-silver" />

        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[10px] tracking-wider2 uppercase text-silver-muted">
          <p>© 2026 Avendano Shintaro. All rights reserved.</p>
          <p>{tr("ft_built", lang)}</p>
        </div>
      </div>
    </footer>
  );
}
