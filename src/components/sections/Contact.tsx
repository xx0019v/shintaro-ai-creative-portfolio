"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { easeLuxe } from "@/lib/motion";

const EMAIL = "f24ba001@chuo.ac.jp";

export default function Contact() {
  const reduced = useReducedMotion();

  return (
    <section id="contact" className="relative py-32 md:py-56 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full opacity-[0.18] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #C8A96A 0%, rgba(200,169,106,0.16) 38%, transparent 70%)",
          }}
        />
        {!reduced && (
          <motion.div
            aria-hidden
            initial={{ x: "30%" }}
            animate={{ x: "-30%" }}
            transition={{ duration: 38, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent"
          />
        )}
      </div>

      <div className="relative max-w-editorial mx-auto px-6 md:px-10 lg:px-16 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-4 text-[10px] tracking-wider2 text-champagne uppercase">
            <span className="idx">10</span>
            <span className="h-px w-10 bg-champagne/40" />
            <span>Contact</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-8 font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight text-ivory">
            Let's create <br />
            <span className="italic font-light">
              something meaningful.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-10 text-base md:text-lg text-ivory/80 leading-relaxed max-w-2xl mx-auto">
            For internship opportunities, project collaboration, website
            production, or portfolio inquiries — feel free to reach out.
          </p>
          <p className="mt-4 font-jpserif text-sm text-muted leading-loose max-w-2xl mx-auto">
            インターンシップ、プロジェクト相談、Web制作、ポートフォリオに関するお問い合わせはこちらからご連絡ください。
          </p>
        </Reveal>

        {/* Email card */}
        <Reveal delay={0.25} className="mt-12">
          <a
            href={`mailto:${EMAIL}?subject=Portfolio%20Inquiry`}
            className="group inline-flex items-center gap-6 hairline-gold px-8 py-5 hover:bg-ivory/[0.04] transition-colors duration-500"
          >
            <Mail size={18} strokeWidth={1.1} className="text-champagne" />
            <span className="font-serif text-lg md:text-xl tracking-tight">
              {EMAIL}
            </span>
            <ArrowUpRight
              size={16}
              strokeWidth={1.25}
              className="text-ivory/70 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </Reveal>

        {/* CTA pair */}
        <Reveal delay={0.32} className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${EMAIL}?subject=Portfolio%20Inquiry`}
            className="inline-flex items-center gap-3 px-6 py-3 bg-ivory text-base text-[11px] tracking-wider2 uppercase hover:bg-champagne transition-colors duration-500"
          >
            Send Email
            <ArrowUpRight size={14} strokeWidth={1.25} />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-3 px-6 py-3 hairline text-[11px] tracking-wider2 uppercase text-ivory/85 hover:text-ivory hover:border-champagne/60 transition-colors duration-500"
          >
            View Projects
            <ArrowUpRight size={14} strokeWidth={1.25} />
          </a>
        </Reveal>

        <Reveal delay={0.4} className="mt-16">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: easeLuxe }}
            className="gold-rule origin-center max-w-xl mx-auto"
          />
        </Reveal>
      </div>
    </section>
  );
}
