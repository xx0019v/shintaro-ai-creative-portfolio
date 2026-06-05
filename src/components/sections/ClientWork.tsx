"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { CheckCircle2 } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { tr } from "@/lib/translations";

const SECTIONS = [
  "Hero",
  "Service",
  "Lessons",
  "Teachers",
  "Pricing",
  "Trial",
  "FAQ",
  "Contact",
];

export default function ClientWork() {
  const { lang } = useLang();

  return (
    <section className="relative py-32 md:py-48 bg-soft/40">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="04"
          labelKey="cw_label"
          titleEn={
            <>
              Online English <br className="hidden md:block" />
              <span className="italic font-light">Service Website</span>
            </>
          }
          jpTitleKey="cw_jp_title"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-7">
            <p className="font-jpserif text-base md:text-lg text-offwhite/85 leading-loose">
              {tr("cw_overview", lang)}
            </p>

            <div className="mt-10 hairline p-6">
              <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-4">
                {tr("cw_status", lang)}
              </p>
              <ul className="space-y-3 text-sm">
                <StatusRow done labelKey="cw_status_done" />
                <StatusRow labelKey="cw_status_domain" />
                <StatusRow labelKey="cw_status_launch" />
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 text-sm">
              <Meta label="Role" value="Web Design · Direction" />
              <Meta label="Service" value="Online English" />
              <Meta label="Scope" value="Structure · UI · Brand" />
              <Meta label="Pages" value="8 main sections" />
              <Meta label="Stage" value="Pre-launch" />
              <Meta label="Stack" value="Modern web" />
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-16 md:mt-20">
          <BrowserMock />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-6">
            <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-3">
              Design Goal
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-offwhite tracking-tight leading-snug">
              Professional, friendly,{" "}
              <span className="italic font-light">trustworthy.</span>
            </h3>
            <p className="mt-4 font-jpserif text-sm text-silver-muted leading-loose">
              {tr("cw_value", lang)}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-6">
            <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-3">
              Suggested Sections
            </p>
            <ul className="flex flex-wrap gap-2 text-[11px] text-offwhite/80">
              {SECTIONS.map((s) => (
                <li key={s} className="px-2.5 py-1 hairline tracking-wider uppercase">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatusRow({
  labelKey,
  done,
}: {
  labelKey: Parameters<typeof tr>[0];
  done?: boolean;
}) {
  const { lang } = useLang();
  return (
    <li className="flex items-start gap-4">
      {done ? (
        <CheckCircle2 size={16} strokeWidth={1.25} className="text-silver-bright mt-0.5" />
      ) : (
        <span className="mt-2 h-1.5 w-1.5 rounded-full border border-silver/50" />
      )}
      <p className="text-offwhite/90 font-jpserif">{tr(labelKey, lang)}</p>
    </li>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-2">{label}</dt>
      <dd className="text-offwhite/85">{value}</dd>
    </div>
  );
}

/* ---------- Browser mock — monochrome service preview ---------- */
function BrowserMock() {
  return (
    <div className="hairline-silver overflow-hidden">
      <div className="bg-base/80 px-5 py-3 border-b border-offwhite/[0.08] flex items-center gap-4 text-[10px] tracking-wider2 uppercase text-silver-muted">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-offwhite/15" />
          <span className="h-2 w-2 rounded-full bg-offwhite/15" />
          <span className="h-2 w-2 rounded-full bg-offwhite/15" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-offwhite/70">studio-english.example</span>
          <span className="text-silver-bright ml-2">· preview</span>
        </div>
        <span className="hidden sm:block">Pre-launch</span>
      </div>

      {/* monochrome viewport */}
      <div className="bg-[#F5F5F5] text-base">
        <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-base/10">
          <span className="font-serif text-base md:text-lg tracking-tight">Studio English</span>
          <ul className="hidden md:flex gap-7 text-[10px] tracking-wider2 uppercase text-base/70">
            <li>About</li><li>Lessons</li><li>Teachers</li><li>Pricing</li><li>FAQ</li>
          </ul>
          <span className="hairline-silver px-3 py-1.5 text-[10px] tracking-wider2 uppercase text-base">
            Free Trial
          </span>
        </div>

        <div className="px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <p className="text-[10px] tracking-wider2 uppercase text-base/60">
              Online English · Personal lessons
            </p>
            <h4 className="mt-4 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight">
              English that fits <br />
              <span className="italic">your daily life.</span>
            </h4>
            <p className="mt-5 text-sm text-base/75 max-w-md">
              Start a trial lesson today. Personal feedback, flexible schedule, and teachers who care about your progress.
            </p>
            <div className="mt-6 flex gap-3 text-[10px] tracking-wider2 uppercase">
              <span className="px-4 py-2 bg-base text-offwhite">Book Trial</span>
              <span className="px-4 py-2 hairline-silver text-base">See Plans</span>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="aspect-[4/5] hairline-silver relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, #FAFAFA 0%, #E8E8E8 100%)",
                }}
              />
              <div className="absolute bottom-4 left-4 text-[10px] tracking-wider2 uppercase text-base/60">
                Editorial portrait — placeholder
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-12 pb-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-base/10 pt-10">
          {[
            ["Personal", "1-on-1 lessons"],
            ["Flexible", "Choose your time"],
            ["Trial", "Free first lesson"],
            ["Support", "Japanese available"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-[10px] tracking-wider2 uppercase text-base/60">{k}</p>
              <p className="mt-2 font-serif text-lg">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
