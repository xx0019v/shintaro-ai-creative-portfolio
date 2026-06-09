"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { easeLuxe } from "@/lib/motion";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

const NAV = [
  { key: "nav_about", href: "#about" },
  { key: "nav_projects", href: "#projects" },
  { key: "nav_skills", href: "#skills" },
  { key: "nav_contact", href: "#contact" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
              <span className="font-serif text-sm md:text-base tracking-wider2 uppercase text-offwhite">
                Avendano&nbsp;Shintaro
              </span>
            </a>

            <div className="hidden md:flex items-center gap-10">
              <nav className="flex items-center gap-10">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group relative text-[12px] tracking-wider2 uppercase text-offwhite/75 hover:text-offwhite transition-colors"
                  >
                    {tr(item.key, lang)}
                    <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-silver origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </a>
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
