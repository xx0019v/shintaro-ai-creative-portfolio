"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { easeLuxe } from "@/lib/motion";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { MagneticLink } from "@/components/ui/MagneticText";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

const NAV = [
  { key: "nav_about", href: "#about", id: "about" },
  { key: "nav_projects", href: "#projects", id: "projects" },
  { key: "nav_skills", href: "#skills", id: "skills" },
  { key: "nav_contact", href: "#contact", id: "contact" },
] as const;

// The nav links jump to these sections; we also count nearby sections
// toward the same link so the underline tracks the reading position.
const ACTIVE_GROUPS: Record<string, string[]> = {
  about: ["about"],
  projects: ["projects", "fragrance", "client", "keychain", "leadership"],
  skills: ["skills", "strengths", "education"],
  contact: ["contact"],
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>("");
  const { lang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which nav group the reader is currently in (for the underline)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ratios = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          ratios.set((e.target as HTMLElement).id, e.intersectionRatio);
        }
        let bestId = "";
        let best = 0;
        for (const [id, r] of ratios) {
          if (r > best) {
            best = r;
            bestId = id;
          }
        }
        const nav = Object.keys(ACTIVE_GROUPS).find((k) =>
          ACTIVE_GROUPS[k].includes(bestId)
        );
        if (nav) setActiveNav(nav);
      },
      { threshold: [0, 0.25, 0.5] }
    );
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: easeLuxe, delay: 0.2 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-base/60 backdrop-blur-2xl border-b border-offwhite/[0.05]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#top" className="group flex items-center gap-3" aria-label="Home">
              <span className="h-1.5 w-1.5 rounded-full bg-silver group-hover:bg-offwhite transition-colors" />
              {/* Surname only below md. At 390px the wide-tracked full name
                  ran straight into the JP/EN toggle with no gap left. */}
              <span className="font-serif text-sm tracking-wider2 uppercase text-offwhite md:hidden">
                Avendano
              </span>
              <span className="hidden font-serif text-base tracking-wider2 uppercase text-offwhite md:inline">
                Avendano&nbsp;Shintaro
              </span>
            </a>

            <div className="hidden md:flex items-center gap-10">
              <nav className="flex items-center gap-10">
                {NAV.map((item) => (
                  <MagneticLink
                    key={item.href}
                    href={item.href}
                    active={activeNav === item.id}
                    className="text-[12px] tracking-wider2 uppercase text-offwhite/75 hover:text-offwhite transition-colors"
                  >
                    {tr(item.key, lang)}
                  </MagneticLink>
                ))}
              </nav>
              <LanguageToggle />
            </div>

            <div className="md:hidden flex items-center gap-3">
              <LanguageToggle />
              <button
                aria-label="Open menu"
                className="p-2 -mr-2 text-offwhite/85"
                onClick={() => setOpen(true)}
              >
                <Menu size={20} strokeWidth={1.25} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeLuxe }}
            className="fixed inset-0 z-[60] bg-base/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-10">
              <span className="font-serif text-sm tracking-wider2 uppercase text-offwhite">
                Menu
              </span>
              <button
                aria-label="Close menu"
                className="p-2 -mr-2 text-offwhite/85"
                onClick={() => setOpen(false)}
              >
                <X size={20} strokeWidth={1.25} />
              </button>
            </div>
            <nav className="px-6 md:px-10 mt-12">
              <ul className="space-y-8">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: easeLuxe, delay: 0.1 + i * 0.08 }}
                  >
                    <a
                      onClick={() => setOpen(false)}
                      href={item.href}
                      className="font-serif text-4xl tracking-tight text-offwhite hover:text-silver transition-colors"
                    >
                      {tr(item.key, lang)}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="rule-silver mt-16" />
              <p className="mt-8 text-[11px] tracking-wider2 uppercase text-silver-muted">
                AI · Web · Branding · Direction
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
