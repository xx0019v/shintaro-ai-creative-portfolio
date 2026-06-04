import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { CheckCircle2 } from "lucide-react";

const SECTIONS = [
  "Hero",
  "Service Overview",
  "Lesson Features",
  "Teachers",
  "Pricing / Plans",
  "Trial Lesson",
  "FAQ",
  "Contact",
];

const POINTS = [
  "Corporate website production",
  "Service branding",
  "Online English education",
  "Clear information architecture",
  "Contact flow",
  "Trust-building design",
  "Responsive design",
  "Domain launch preparation",
];

export default function ClientWork() {
  return (
    <section className="relative py-32 md:py-48 bg-subbase/40">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="04"
          label="Client Work"
          title={
            <>
              Online English <br className="hidden md:block" />
              <span className="italic font-light">Service Website</span>
            </>
          }
          jpTitle="英語オンラインサービスを展開する企業向けWebサイト制作案件。"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-7">
            <p className="text-base md:text-lg text-ivory/85 leading-relaxed">
              Corporate website production for an online English learning
              service. The website has been built; the next step is domain
              purchase and official release. Focus: service branding, clear
              course communication, and a contact flow that builds trust.
            </p>
            <p className="mt-4 font-jpserif text-sm text-muted leading-loose">
              現在、英語オンライン需要をサービス化した企業向けWebサイト制作案件に関わっています。サイト自体はすでに制作済みで、ドメイン購入・公開準備の段階。サービス内容が分かりやすく伝わる構成と、安心感のある導線を意識して制作しました。
            </p>

            {/* Project status */}
            <div className="mt-10 hairline p-6">
              <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-4">
                Project Status
              </p>
              <ul className="space-y-3 text-sm">
                <StatusRow done label="Website completed" jp="サイト制作完了" />
                <StatusRow label="Domain purchase pending" jp="ドメイン購入準備中" />
                <StatusRow label="Preparing for launch" jp="公開準備中" />
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 text-sm">
              {[
                ["Role", "Web Design · Direction"],
                ["Service", "Online English"],
                ["Scope", "Site structure, UI, brand"],
                ["Pages", "8 main sections"],
                ["Stage", "Pre-launch"],
                ["Stack", "Modern web stack"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[10px] tracking-wider2 uppercase text-champagne mb-2">
                    {k}
                  </dt>
                  <dd className="text-ivory/85">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Browser mock case study */}
        <Reveal delay={0.15} className="mt-16 md:mt-20">
          <BrowserMock />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-6">
            <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-3">
              Design Goal
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-ivory tracking-tight leading-snug">
              Professional, friendly,{" "}
              <span className="italic font-light">trustworthy.</span>
              <br />
              From idea to a clear digital service.
            </h3>
            <p className="mt-4 font-jpserif text-sm text-muted leading-loose">
              英語学習サービスの内容を分かりやすく伝え、安心感を持って問い合わせ・申し込みにつながるWebサイトを目指しました。
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-6">
            <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-3">
              Key Points
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-ivory/85">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-2 h-px w-3 bg-champagne/60" />
                  {p}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[10px] tracking-wider2 uppercase text-champagne mb-3">
              Suggested Sections
            </p>
            <ul className="flex flex-wrap gap-2 text-[11px] text-ivory/80">
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

function StatusRow({ label, jp, done }: { label: string; jp: string; done?: boolean }) {
  return (
    <li className="flex items-start gap-4">
      {done ? (
        <CheckCircle2
          size={16}
          strokeWidth={1.25}
          className="text-champagne mt-0.5"
        />
      ) : (
        <span className="mt-2 h-1.5 w-1.5 rounded-full border border-champagne/50" />
      )}
      <div>
        <p className="text-ivory/90">{label}</p>
        <p className="font-jpserif text-xs text-muted mt-0.5">{jp}</p>
      </div>
    </li>
  );
}

/* ---------- Browser mock ---------- */
function BrowserMock() {
  return (
    <div className="hairline-gold rounded-sm overflow-hidden">
      {/* chrome */}
      <div className="bg-base/80 px-5 py-3 border-b border-ivory/[0.08] flex items-center gap-4 text-[10px] tracking-wider2 uppercase text-muted">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ivory/15" />
          <span className="h-2 w-2 rounded-full bg-ivory/15" />
          <span className="h-2 w-2 rounded-full bg-ivory/15" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-ivory/70">studio-english.example</span>
          <span className="text-champagne ml-2">· preview</span>
        </div>
        <span className="hidden sm:block">Pre-launch</span>
      </div>

      {/* viewport */}
      <div className="bg-[#FBF9F5] text-[#1a1612]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-[#1a1612]/10">
          <span className="font-serif text-base md:text-lg tracking-tight">
            Studio English
          </span>
          <ul className="hidden md:flex gap-7 text-[10px] tracking-wider2 uppercase text-[#1a1612]/70">
            <li>About</li>
            <li>Lessons</li>
            <li>Teachers</li>
            <li>Pricing</li>
            <li>FAQ</li>
          </ul>
          <span className="hairline-gold px-3 py-1.5 text-[10px] tracking-wider2 uppercase text-[#1a1612]">
            Free Trial
          </span>
        </div>

        {/* Hero */}
        <div className="px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <p className="text-[10px] tracking-wider2 uppercase text-[#C8A96A]">
              Online English · Personal lessons
            </p>
            <h4 className="mt-4 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight">
              English that fits <br />
              <span className="italic">your daily life.</span>
            </h4>
            <p className="mt-5 text-sm text-[#1a1612]/75 max-w-md">
              Start a trial lesson today. Personal feedback, flexible schedule,
              and teachers who care about your progress.
            </p>
            <div className="mt-6 flex gap-3 text-[10px] tracking-wider2 uppercase">
              <span className="px-4 py-2 bg-[#1a1612] text-[#F7F4EF]">Book Trial</span>
              <span className="px-4 py-2 hairline-gold text-[#1a1612]">See Plans</span>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="aspect-[4/5] hairline-gold relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 30%, rgba(200,169,106,0.18) 0%, transparent 60%), linear-gradient(180deg, #F7F4EF 0%, #EDE5D7 100%)",
                }}
              />
              <div className="absolute bottom-4 left-4 text-[10px] tracking-wider2 uppercase text-[#1a1612]/60">
                Editorial portrait — placeholder
              </div>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="px-6 md:px-12 pb-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#1a1612]/10 pt-10">
          {[
            ["Personal", "1-on-1 lessons"],
            ["Flexible", "Choose your time"],
            ["Trial", "Free first lesson"],
            ["Support", "Japanese available"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-[10px] tracking-wider2 uppercase text-[#C8A96A]">
                {k}
              </p>
              <p className="mt-2 font-serif text-lg">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
