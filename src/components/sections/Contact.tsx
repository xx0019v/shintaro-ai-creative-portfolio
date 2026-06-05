"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import PortraitFrame from "@/components/ui/PortraitFrame";
import { easeLuxe } from "@/lib/motion";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

const EMAIL = "f24ba001@chuo.ac.jp";

export default function Contact() {
  const reduced = useReducedMotion();
  const { lang } = useLang();

  return (
    <section id="contact" className="relative py-32 md:py-56 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full opacity-[0.12] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #E5E5E5 0%, rgba(229,229,229,0.16) 38%, transparent 70%)",
          }}
        />
        {!reduced && (
          <motion.div
            aria-hidden
            initial={{ x: "30%" }}
            animate={{ x: "-30%" }}
            transition={{ duration: 38, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/30 to-transparent"
          />
        )}
      </div>

      <div className="relative max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* portrait signature */}
          <Reveal className="lg:col-span-4 max-w-xs mx-auto lg:mx-0">
            <PortraitFrame
              src="/images/portrait/portrait-full-02.png"
              alt="Avendano Shintaro — contact portrait"
              variant="full"
            />
            <p className="mt-4 text-center text-[10px] tracking-wider2 uppercase text-silver-muted">
              Signature · 2026
            </p>
          </Reveal>

          <div className="lg:col-span-8 text-center lg:text-left">
            <Reveal>
              <div className="inline-flex items-center gap-4 text-[10px] tracking-wider2 text-silver-bright uppercase">
                <span className="idx">10</span>
                <span className="h-px w-10 bg-silver/40" />
                <span>{tr("ct_label", lang)}</span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-8 font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-offwhite">
                {tr("ct_title_a", lang)} <br />
                <span className="italic font-light">{tr("ct_title_b", lang)}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-8 font-jpserif text-base md:text-lg text-offwhite/80 leading-loose max-w-2xl mx-auto lg:mx-0">
                {tr("ct_body", lang)}
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-10">
              <a
                href={`mailto:${EMAIL}?subject=Portfolio%20Inquiry`}
                className="group inline-flex items-center gap-6 hairline-silver px-8 py-5 hover:bg-offwhite/[0.04] transition-colors duration-500"
              >
                <Mail size={18} strokeWidth={1.1} className="text-silver-bright" />
                <span className="font-serif text-lg md:text-xl tracking-tight">{EMAIL}</span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.25}
                  className="text-offwhite/70 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Reveal>

            <Reveal delay={0.32} className="mt-10 flex flex-wrap justify-center lg:justify-start gap-3">
              <a
                href={`mailto:${EMAIL}?subject=Portfolio%20Inquiry`}
                className="inline-flex items-center gap-3 px-6 py-3 bg-offwhite text-base text-[11px] tracking-wider2 uppercase hover:bg-silver transition-colors duration-500"
              >
                {tr("ct_send", lang)}
                <ArrowUpRight size={14} strokeWidth={1.25} />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-3 px-6 py-3 hairline text-[11px] tracking-wider2 uppercase text-offwhite/85 hover:text-offwhite hover:border-silver/60 transition-colors duration-500"
              >
                {tr("ct_view", lang)}
                <ArrowUpRight size={14} strokeWidth={1.25} />
              </a>
            </Reveal>

            <Reveal delay={0.4} className="mt-16">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: easeLuxe }}
                className="rule-silver origin-center max-w-xl"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
