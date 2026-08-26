"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import PortraitFrame from "@/components/ui/PortraitFrame";
import MagneticButton from "@/components/ui/MagneticButton";
import ShatterText from "@/components/ui/ShatterText";
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
        {/* Final crescendo — the silver light re-gathers as the closing scene
            arrives, blooming from a tight core to a full glow. */}
        <motion.div
          aria-hidden
          className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full blur-3xl"
          initial={{ opacity: 0.04, scale: 0.7 }}
          whileInView={{ opacity: 0.16, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={reduced ? { duration: 0 } : { duration: 2.2, ease: easeLuxe }}
          style={{
            background:
              "radial-gradient(circle, #E5E5E5 0%, rgba(229,229,229,0.16) 38%, transparent 70%)",
          }}
        />
        <motion.div
          aria-hidden
          initial={{ x: "30%" }}
          animate={{ x: "-30%" }}
          transition={
            reduced
              ? { duration: 0, repeat: 0 }
              : { duration: 38, ease: "linear", repeat: Infinity, repeatType: "mirror" }
          }
          className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/30 to-transparent"
        />

        {/* Final ritual — light converges on the ask: two hairline beams
            angle in toward the CTA and a pool of silver gathers behind it,
            so the whole scene funnels to one action. */}
        <motion.div
          aria-hidden
          className="absolute left-0 top-[30%] h-px w-[46%] origin-left hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(229,229,229,0.5))",
            transform: "rotate(9deg)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.8, ease: easeLuxe, delay: 0.3 }}
        />
        <motion.div
          aria-hidden
          className="absolute right-0 top-[22%] h-px w-[38%] origin-right hidden lg:block"
          style={{
            background:
              "linear-gradient(270deg, transparent, rgba(229,229,229,0.4))",
            transform: "rotate(-11deg)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.8, ease: easeLuxe, delay: 0.55 }}
        />
        <motion.div
          aria-hidden
          className="absolute left-[52%] top-[52%] h-[380px] w-[380px] -translate-x-1/2 rounded-full blur-3xl hidden lg:block"
          style={{
            background:
              "radial-gradient(circle, rgba(229,229,229,0.14), transparent 68%)",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2.4, ease: easeLuxe, delay: 0.5 }}
        />

        {/* Final ritual — the Entry Sphere's memory returns: a small chrome
            orb breathes above the closing scene, the world ending where it
            began. */}
        <motion.div
          aria-hidden
          className="absolute right-[12%] top-[14%] hidden md:block"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2, ease: easeLuxe }}
        >
          <motion.div
            animate={
              reduced
                ? undefined
                : { scale: [1, 1.05, 1], borderRadius: [
                    "48% 52% 50% 50% / 52% 48% 52% 48%",
                    "52% 48% 51% 49% / 48% 52% 49% 51%",
                    "48% 52% 50% 50% / 52% 48% 52% 48%",
                  ] }
            }
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
            style={{
              width: 58,
              height: 58,
              background:
                "radial-gradient(circle at 36% 30%, #ffffff 0%, #e5e5e5 14%, #9a9a9a 44%, #3a3a3a 72%, #0c0c0c 100%)",
              boxShadow:
                "inset 0 -8px 18px rgba(0,0,0,0.7), inset 0 5px 11px rgba(255,255,255,0.18), 0 16px 40px -12px rgba(0,0,0,0.85), 0 0 34px -6px rgba(229,229,229,0.28)",
            }}
          />
        </motion.div>
      </div>

      <div className="relative max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* portrait signature — rises into the closing light */}
          <Reveal className="lg:col-span-4 max-w-xs mx-auto lg:mx-0">
            <Parallax distance={46} lift fade>
              <PortraitFrame
                src="/images/portrait/portrait-full-02.png"
                alt="Avendano Shintaro — contact portrait"
                variant="full"
              />
            </Parallax>
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
                <ShatterText text={tr("ct_title_a", lang)} as="span" />
                <br />
                <span className="italic font-light">{tr("ct_title_b", lang)}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-8 font-jpserif text-base md:text-lg text-offwhite/80 leading-loose max-w-2xl mx-auto lg:mx-0">
                {tr("ct_body", lang)}
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-10">
              <MagneticButton>
                <a
                  href={`mailto:${EMAIL}?subject=Portfolio%20Inquiry`}
                  data-prox
                  className="lg-btn lg-btn--lg group gap-6"
                >
                  <Mail size={18} strokeWidth={1.1} className="text-silver-bright" />
                  <span className="font-serif text-lg md:text-xl tracking-tight">{EMAIL}</span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.25}
                    className="text-offwhite/70 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </MagneticButton>
            </Reveal>

            <Reveal delay={0.32} className="mt-10 flex flex-wrap justify-center lg:justify-start gap-3">
              <MagneticButton>
                <a
                  href={`mailto:${EMAIL}?subject=Portfolio%20Inquiry`}
                  data-prox
                  className="lg-btn lg-btn--primary text-[11px] tracking-wider2 uppercase"
                >
                  {tr("ct_send", lang)}
                  <ArrowUpRight size={14} strokeWidth={1.25} />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#projects"
                  data-prox
                  className="lg-btn lg-btn--quiet text-[11px] tracking-wider2 uppercase"
                >
                  {tr("ct_view", lang)}
                  <ArrowUpRight size={14} strokeWidth={1.25} />
                </a>
              </MagneticButton>
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
