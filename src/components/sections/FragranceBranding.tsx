import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import GoldRule from "@/components/ui/GoldRule";
import Placeholder from "@/components/ui/Placeholder";

const CATEGORIES = [
  "POP Design",
  "SNS Campaign",
  "Poster / Flyer",
  "Event Planning",
  "Visual Direction",
  "Copywriting",
];

export default function FragranceBranding() {
  return (
    <section className="relative py-32 md:py-48">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="03"
          label="Creative Work"
          title={
            <>
              Fragrance Vending Machine{" "}
              <span className="italic font-light text-fragrance-pink/90">
                Branding
              </span>
            </>
          }
          jpTitle="香水自販機を、ただの販売機ではなく「体験」として見せるためのビジュアル制作。"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-7">
            <p className="text-base md:text-lg text-ivory/85 leading-relaxed">
              Luxury-inspired visuals for a new fragrance experience. POP
              design, SNS visuals, campaign planning, and visual direction for a
              fragrance vending machine installed in a commercial facility — the
              goal: stylish, approachable, worth sharing.
            </p>
            <p className="mt-4 font-jpserif text-sm text-muted leading-loose">
              POP、SNS投稿、キャンペーン、イベント導線を企画・制作。高級感と親しみやすさを両立し、写真を撮りたくなる体験設計を意識しました。
            </p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-ivory/85">
              {CATEGORIES.map((c, i) => (
                <li key={c} className="flex items-baseline gap-3">
                  <span className="idx text-champagne text-[10px] tracking-wider2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Editorial hero image */}
        <Reveal delay={0.15} className="mt-16">
          <FragranceHero />
        </Reveal>

        <GoldRule className="mt-24" />

        {/* Work 01 — Fragrance Menu POP */}
        <Reveal className="mt-20">
          <WorkBlock
            no="01"
            title="Fragrance Menu POP"
            role="Visual Direction · Copywriting · Layout Design"
            concept="A luxury editorial-style fragrance guide designed to help users choose a scent intuitively."
            direction="Soft light, floral textures, premium typography, emotional copy, minimal hierarchy."
            jp="香水を選びやすくするために、香りの印象を言葉とビジュアルで整理したPOPデザイン。"
            mockup={<MenuPopMock />}
          />
        </Reveal>

        {/* Work 02 — SNS Campaign */}
        <Reveal delay={0.1} className="mt-24">
          <WorkBlock
            no="02"
            title="SNS Contest Campaign"
            role="Campaign Planning · SNS Direction · Poster Design"
            concept="A campaign designed to encourage students and staff to post about the fragrance vending machine on social media."
            direction="Eye-catching headline, clear prize structure, QR code flow, hashtag design."
            jp="投稿したくなる導線、賞金訴求、応募フォーム、ハッシュタグ設計を含めて構成。"
            mockup={<SNSPosterMock />}
            reverse
          />
        </Reveal>

        {/* Value strip */}
        <Reveal delay={0.15} className="mt-24">
          <div className="hairline p-8 md:p-12">
            <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-6">
              Emphasize
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-ivory/85">
              {[
                "Visual design",
                "Branding",
                "SNS marketing",
                "Campaign planning",
                "User behavior design",
                "Commercial facility communication",
                "Luxury-inspired direction",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-px w-4 bg-champagne/60" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WorkBlock({
  no,
  title,
  role,
  concept,
  direction,
  jp,
  mockup,
  reverse,
}: {
  no: string;
  title: string;
  role: string;
  concept: string;
  direction: string;
  jp: string;
  mockup: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
      <div className={`md:col-span-7 ${reverse ? "md:order-2" : ""}`}>
        {mockup}
      </div>
      <div className={`md:col-span-5 ${reverse ? "md:order-1" : ""}`}>
        <p className="idx text-champagne text-[11px] tracking-wider2">
          Work {no}
        </p>
        <h3 className="mt-3 font-serif text-3xl md:text-4xl text-ivory tracking-tight">
          {title}
        </h3>
        <p className="mt-5 text-[10px] tracking-wider2 uppercase text-muted">
          Role
        </p>
        <p className="mt-1 text-sm text-ivory/85">{role}</p>

        <p className="mt-5 text-[10px] tracking-wider2 uppercase text-muted">
          Concept
        </p>
        <p className="mt-1 text-sm text-ivory/85 leading-relaxed">{concept}</p>

        <p className="mt-5 text-[10px] tracking-wider2 uppercase text-muted">
          Direction
        </p>
        <p className="mt-1 text-sm text-ivory/85 leading-relaxed">{direction}</p>

        <p className="mt-5 font-jpserif text-xs text-muted leading-loose">{jp}</p>
      </div>
    </div>
  );
}

/* ---------- Editorial Hero ---------- */
function FragranceHero() {
  return (
    <div className="relative aspect-[16/9] hairline-gold overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 25% 40%, rgba(232,201,194,0.32) 0%, transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(216,196,168,0.22) 0%, transparent 50%), linear-gradient(135deg, #1a1413 0%, #0d0908 100%)",
        }}
      />
      {/* bottle silhouettes */}
      <div className="absolute inset-0 flex items-end justify-center gap-6 md:gap-10 pb-10 md:pb-16 opacity-90">
        {[0, 1, 2, 3, 4].map((i) => (
          <BottleSilhouette key={i} delay={i * 0.04} />
        ))}
      </div>
      <div className="absolute top-8 md:top-10 left-8 md:left-12 max-w-md">
        <p className="text-[10px] tracking-wider2 uppercase text-champagne">
          Volume Édition · 01
        </p>
        <p className="mt-4 font-serif text-3xl md:text-5xl text-ivory leading-[1.05] tracking-tight">
          A modern{" "}
          <span className="italic font-light">fragrance</span>
          <br />
          ritual.
        </p>
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] tracking-wider2 uppercase text-ivory/70">
        Fragrance Visual Study
      </div>
    </div>
  );
}

function BottleSilhouette({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      width="48"
      height="120"
      viewBox="0 0 48 120"
      fill="none"
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        animation: `fadeInBottle 1.4s ${0.4 + delay}s cubic-bezier(0.22,1,0.36,1) forwards`,
      }}
    >
      <rect x="20" y="2" width="8" height="14" stroke="#C8A96A" strokeOpacity="0.7" />
      <rect x="14" y="16" width="20" height="6" stroke="#C8A96A" strokeOpacity="0.7" />
      <path
        d="M8 28 L40 28 L40 110 Q40 116 34 116 L14 116 Q8 116 8 110 Z"
        stroke="#F5F1EA"
        strokeOpacity="0.55"
      />
      <line x1="8" y1="60" x2="40" y2="60" stroke="#C8A96A" strokeOpacity="0.4" />
      <style>{`
        @keyframes fadeInBottle {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </svg>
  );
}

/* ---------- POP mock ---------- */
function MenuPopMock() {
  return (
    <div className="relative aspect-[4/5] hairline-gold overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #F7F4EF 0%, #EFE7DC 100%)",
        }}
      />
      <div className="absolute inset-6 md:inset-10 flex flex-col text-base">
        <div className="flex items-center justify-between text-[9px] tracking-wider2 uppercase text-base/70">
          <span>Fragrance Menu</span>
          <span>No. 01</span>
        </div>
        <p
          className="mt-8 font-serif text-3xl md:text-4xl text-base leading-tight tracking-tight"
          style={{ color: "#1a1413" }}
        >
          Choose a scent <br />
          that feels like <br />
          <span className="italic">your day.</span>
        </p>
        <div className="mt-6 h-px bg-base/30" />
        <ul className="mt-6 space-y-4 text-sm" style={{ color: "#1a1413" }}>
          {[
            { name: "Soft Petal", mood: "Floral · Light" },
            { name: "Quiet Amber", mood: "Warm · Woody" },
            { name: "Pale Citrus", mood: "Fresh · Bright" },
            { name: "Velvet Musk", mood: "Deep · Smooth" },
          ].map((s) => (
            <li key={s.name} className="flex items-baseline justify-between">
              <span className="font-serif text-lg">{s.name}</span>
              <span className="text-[10px] tracking-wider2 uppercase">
                {s.mood}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6 flex items-center justify-between text-[9px] tracking-wider2 uppercase" style={{ color: "rgba(26,20,19,0.7)" }}>
          <span>Scan · Select · Receive</span>
          <span>2026</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- SNS Poster mock ---------- */
function SNSPosterMock() {
  return (
    <div className="relative aspect-[4/5] hairline-gold overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 25%, rgba(232,201,194,0.4) 0%, transparent 55%), linear-gradient(180deg, #14100f 0%, #0a0807 100%)",
        }}
      />
      <div className="absolute inset-6 md:inset-10 flex flex-col">
        <div className="flex items-center justify-between text-[9px] tracking-wider2 uppercase text-champagne">
          <span>#FragranceMoment</span>
          <span>Open</span>
        </div>
        <p className="mt-12 font-serif text-4xl md:text-5xl text-ivory leading-[1.02] tracking-tight">
          Post your <br />
          <span className="italic font-light text-fragrance-pink">scent.</span>
          <br />
          Win the bottle.
        </p>
        <div className="mt-6 h-px bg-champagne/40" />
        <ul className="mt-6 space-y-3 text-sm text-ivory/85">
          <li className="flex gap-3"><span className="text-champagne">01</span>Try a fragrance at the machine</li>
          <li className="flex gap-3"><span className="text-champagne">02</span>Post with #FragranceMoment</li>
          <li className="flex gap-3"><span className="text-champagne">03</span>Tag the campaign account</li>
        </ul>
        <div className="mt-auto pt-6 flex items-center justify-between text-[9px] tracking-wider2 uppercase text-ivory/70">
          <span>Prize · Limited Edition</span>
          <div className="h-10 w-10 hairline-gold grid place-items-center">
            <div className="grid grid-cols-3 gap-px">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="h-1 w-1 bg-ivory/80" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
