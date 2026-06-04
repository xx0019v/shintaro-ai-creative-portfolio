"use client";

import { motion } from "framer-motion";
import { ShieldCheck, EyeOff, Radio, Activity } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import GoldRule from "@/components/ui/GoldRule";
import { easeLuxe } from "@/lib/motion";

const ANALYZES = [
  "Presence",
  "Distance zone",
  "Approach behavior",
  "Ad viewing possibility",
  "Dwell time",
  "Time-based trends",
  "Heatmap",
  "KPI dashboard",
];

const KEYWORDS = [
  "Raspberry Pi",
  "AI Camera",
  "Computer Vision",
  "Edge API",
  "Analytics API",
  "Dashboard",
  "Rust",
  "SQLite",
  "DuckDB",
  "Anonymous Analytics",
];

const ZONES = [
  {
    name: "Operation",
    range: "0.3 – 0.8m",
    desc: "Actual operation position",
    jp: "操作している位置",
    accent: "from-champagne/40 to-champagne/0",
    intensity: 0.85,
  },
  {
    name: "Approach",
    range: "0.8 – 1.8m",
    desc: "People approaching the machine",
    jp: "自販機に近づく行動",
    accent: "from-ivory/30 to-ivory/0",
    intensity: 0.65,
  },
  {
    name: "AdView",
    range: "1.8 – 3.5m",
    desc: "Potential signage viewing area",
    jp: "サイネージを見ている可能性",
    accent: "from-ivory/20 to-ivory/0",
    intensity: 0.45,
  },
  {
    name: "Passing",
    range: "3.5m +",
    desc: "People passing by",
    jp: "通過する人々",
    accent: "from-muted/20 to-muted/0",
    intensity: 0.25,
  },
];

const FLOW = [
  {
    no: "01",
    en: "Person passes by or sees signage",
    jp: "人が通る / 広告を見る",
  },
  {
    no: "02",
    en: "AI Camera detects a person",
    jp: "AIカメラが人物を検知",
  },
  {
    no: "03",
    en: "Estimate distance, dwell, viewing possibility",
    jp: "距離・滞在・注視の可能性を推定",
  },
  {
    no: "04",
    en: "Save as anonymous data",
    jp: "匿名データとして保存",
  },
  {
    no: "05",
    en: "Visualize in dashboard and report",
    jp: "ダッシュボードやレポートで可視化",
  },
];

const PRIVACY = [
  { icon: EyeOff, label: "No raw image storage", jp: "生画像保存なし" },
  { icon: ShieldCheck, label: "No face recognition", jp: "顔認証なし" },
  { icon: Activity, label: "Anonymous analytics only", jp: "匿名行動データ" },
  { icon: Radio, label: "Edge-first processing", jp: "エッジ処理優先" },
];

export default function AIKameranado() {
  return (
    <section id="projects" className="relative py-32 md:py-48 bg-subbase/40">
      {/* subtle backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,241,234,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,241,234,0.4) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      <div className="relative max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="02"
          label="Featured Project"
          title={
            <>
              <span className="block">AIKameranado</span>
            </>
          }
          jpTitle="香水自販機サイネージ広告の視認効果を、AIカメラで見える化する分析システム。"
        />

        <Reveal delay={0.1} className="mt-8">
          <p className="text-base md:text-lg text-ivory/85 leading-relaxed max-w-3xl">
            <span className="text-champagne">AI Camera Analytics</span> for
            fragrance vending machine signage. AIKameranado estimates how much a
            signage advertisement is actually seen — analyzing presence,
            distance zones, approach behavior, viewing possibility, and dwell
            time, then converting those signals into anonymous analytics.
          </p>
        </Reveal>
        <Reveal delay={0.18} className="mt-5">
          <p className="font-jpserif text-sm md:text-base text-muted leading-loose max-w-3xl">
            自販機本体・決済・商品排出とは連携せず、サイネージ広告が「実際にどれだけ見られたか」を匿名データとして分析する。個人特定を目的としない、プライバシー優先の設計。
          </p>
        </Reveal>

        {/* Hero mock: Dashboard frame */}
        <Reveal delay={0.25} className="mt-16 md:mt-20">
          <DashboardMock />
        </Reveal>

        <GoldRule className="mt-24" />

        {/* Two-column intent */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-12">
          <Reveal className="md:col-span-5">
            <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-4">
              Project Purpose
            </p>
            <p className="font-serif text-2xl md:text-3xl text-ivory tracking-tight leading-snug">
              To make signage advertisement performance{" "}
              <span className="italic font-light">measurable</span> through AI
              camera analysis.
            </p>
            <p className="mt-5 font-jpserif text-sm text-muted leading-loose">
              サイネージ広告の効果を、感覚ではなくデータで判断できるようにする。
            </p>
          </Reveal>

          <div className="md:col-span-7 grid grid-cols-2 gap-6">
            <Reveal delay={0.1} as="div" className="hairline p-6">
              <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-3">
                What it analyzes
              </p>
              <ul className="space-y-2 text-sm text-ivory/85">
                {ANALYZES.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <span className="mt-2 h-px w-3 bg-champagne/60" />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.18} as="div" className="hairline p-6">
              <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-3">
                System Keywords
              </p>
              <ul className="flex flex-wrap gap-2 text-[11px] text-ivory/80">
                {KEYWORDS.map((k) => (
                  <li
                    key={k}
                    className="px-2.5 py-1 hairline-gold tracking-wider uppercase"
                  >
                    {k}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Distance zone diagram */}
        <div className="mt-24">
          <Reveal>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-champagne">
                  Diagram 01
                </p>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl text-ivory tracking-tight">
                  Distance Zone Model
                </h3>
                <p className="mt-2 font-jpserif text-xs text-muted">
                  距離ゾーンによる行動分類モデル
                </p>
              </div>
              <p className="text-[10px] tracking-wider2 uppercase text-muted">
                Top-down view · Anonymous
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-10">
            <ZoneDiagram />
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ZONES.map((z, i) => (
              <Reveal key={z.name} delay={0.06 * i} as="li" className="hairline p-6 group hover:hairline-gold transition-colors">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-xl text-ivory">{z.name}</span>
                  <span className="text-champagne text-sm idx">{z.range}</span>
                </div>
                <p className="mt-4 text-sm text-ivory/75">{z.desc}</p>
                <p className="mt-2 font-jpserif text-xs text-muted">{z.jp}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Data flow */}
        <div className="mt-24">
          <Reveal>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-champagne">
                  Diagram 02
                </p>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl text-ivory tracking-tight">
                  Data Flow
                </h3>
                <p className="mt-2 font-jpserif text-xs text-muted">
                  検知から可視化までのデータフロー
                </p>
              </div>
            </div>
          </Reveal>

          <ol className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-3">
            {FLOW.map((f, i) => (
              <Reveal key={f.no} delay={0.06 * i} as="li" className="relative hairline p-6">
                <span className="text-champagne idx text-[11px] tracking-wider2">
                  {f.no}
                </span>
                <p className="mt-4 text-sm text-ivory/85 leading-relaxed">
                  {f.en}
                </p>
                <p className="mt-2 font-jpserif text-xs text-muted leading-relaxed">
                  {f.jp}
                </p>
                {i < FLOW.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden md:block absolute top-1/2 -right-2 h-px w-4 bg-champagne/40"
                  />
                )}
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Privacy + Value */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-12 gap-12">
          <Reveal className="md:col-span-6">
            <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-4">
              Privacy-first Design
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-ivory tracking-tight leading-snug">
              Designed to{" "}
              <span className="italic font-light">measure attention,</span>{" "}
              not to identify people.
            </h3>
            <p className="mt-4 font-jpserif text-sm text-muted leading-loose">
              生画像保存なし、顔認証なし、個人特定なし。匿名の行動データのみを扱う設計です。
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4">
              {PRIVACY.map((p) => (
                <li key={p.label} className="hairline p-5 flex items-start gap-4">
                  <p.icon size={18} strokeWidth={1.1} className="text-champagne mt-0.5" />
                  <div>
                    <p className="text-sm text-ivory/90">{p.label}</p>
                    <p className="mt-1 font-jpserif text-xs text-muted">{p.jp}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-6">
            <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-4">
              Value
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-ivory tracking-tight leading-snug">
              This project transforms physical attention into{" "}
              <span className="text-champagne">measurable insight.</span>
            </h3>
            <p className="mt-4 font-jpserif text-sm text-muted leading-loose">
              人の動きと広告への視認を、データとして見える化するプロジェクトです。
            </p>
            <ul className="mt-8 space-y-3 text-sm text-ivory/85">
              <li className="flex gap-3">
                <span className="mt-2 h-px w-4 bg-champagne/60" />
                広告効果を数値で判断できる
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-4 bg-champagne/60" />
                時間帯別の視認傾向を把握できる
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-4 bg-champagne/60" />
                通過・接近・操作・視認を分けて分析
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-4 bg-champagne/60" />
                商業施設や広告主への定量レポート
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-4 bg-champagne/60" />
                プライバシーに配慮した設計思想
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Dashboard Mock ---------- */
function DashboardMock() {
  const bars = [42, 58, 71, 64, 80, 92, 78, 88, 96, 84, 70, 55];
  return (
    <div className="relative hairline-gold rounded-sm overflow-hidden bg-base/80">
      {/* topbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-ivory/[0.08] text-[10px] tracking-wider2 uppercase text-muted">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-champagne animate-glow" />
          aikameranado.console
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>Site 01 · Floor 2F</span>
          <span className="text-champagne">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-px bg-ivory/[0.06]">
        {/* KPIs */}
        <div className="col-span-12 md:col-span-8 bg-base p-6 md:p-8">
          <div className="flex items-baseline justify-between">
            <p className="text-[10px] tracking-wider2 uppercase text-champagne">
              Hourly viewing index
            </p>
            <p className="text-[10px] tracking-wider2 uppercase text-muted">
              09:00 — 21:00
            </p>
          </div>
          <div className="mt-8 flex items-end gap-2 h-40">
            {bars.map((b, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${b}%` }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.2, ease: easeLuxe, delay: i * 0.04 }}
                className="flex-1 bg-gradient-to-t from-champagne/70 to-champagne/10"
              />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] tracking-wider2 uppercase text-muted">
            <span>9</span><span>12</span><span>15</span><span>18</span><span>21</span>
          </div>
        </div>

        {/* Stats */}
        <div className="col-span-12 md:col-span-4 bg-base p-6 md:p-8 space-y-6">
          <Stat label="Detections / day" value="1,284" trend="+12.4%" />
          <Stat label="Avg dwell" value="3.8s" trend="+0.6s" />
          <Stat label="Ad-view rate" value="34.2%" trend="+4.1%" />
          <Stat label="Peak hour" value="18:00" trend="—" muted />
        </div>

        {/* Heatmap */}
        <div className="col-span-12 md:col-span-7 bg-base p-6 md:p-8">
          <div className="flex items-baseline justify-between mb-6">
            <p className="text-[10px] tracking-wider2 uppercase text-champagne">
              Attention heatmap
            </p>
            <p className="text-[10px] tracking-wider2 uppercase text-muted">
              Top-down · Anonymous
            </p>
          </div>
          <Heatmap />
        </div>

        {/* Zone breakdown */}
        <div className="col-span-12 md:col-span-5 bg-base p-6 md:p-8">
          <p className="text-[10px] tracking-wider2 uppercase text-champagne mb-6">
            Zone share
          </p>
          <ul className="space-y-5">
            {[
              { name: "Operation", v: 18, color: "bg-champagne" },
              { name: "Approach", v: 31, color: "bg-ivory/70" },
              { name: "AdView", v: 28, color: "bg-ivory/50" },
              { name: "Passing", v: 23, color: "bg-muted/50" },
            ].map((z) => (
              <li key={z.name}>
                <div className="flex items-baseline justify-between text-[11px] tracking-wider2 uppercase text-ivory/85">
                  <span>{z.name}</span>
                  <span className="idx text-champagne">{z.v}%</span>
                </div>
                <div className="mt-2 h-px bg-ivory/[0.08] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${z.v * 2}%` }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.4, ease: easeLuxe }}
                    className={`h-px ${z.color}`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  trend,
  muted,
}: {
  label: string;
  value: string;
  trend: string;
  muted?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] tracking-wider2 uppercase text-muted">{label}</p>
      <div className="mt-2 flex items-baseline gap-3">
        <p className="font-serif text-3xl text-ivory tracking-tight">{value}</p>
        <span className={`text-[11px] tracking-wider2 uppercase ${muted ? "text-muted" : "text-champagne"}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}

function Heatmap() {
  const cols = 18;
  const rows = 8;
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const x = i % cols;
    const y = Math.floor(i / cols);
    const cx = cols / 2;
    const cy = rows / 2 - 1;
    const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    const v = Math.max(0, 1 - d / 8 + (Math.sin(x * 0.7) + Math.cos(y * 0.9)) * 0.1);
    return Math.min(1, Math.max(0, v));
  });
  return (
    <div
      className="grid gap-0.5"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
    >
      {cells.map((v, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: easeLuxe, delay: (i % cols) * 0.01 }}
          className="aspect-square"
          style={{
            backgroundColor:
              v > 0.66
                ? `rgba(200,169,106,${0.18 + v * 0.5})`
                : v > 0.33
                ? `rgba(245,241,234,${0.06 + v * 0.18})`
                : `rgba(245,241,234,${0.03 + v * 0.06})`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Top-down Distance Zone Diagram ---------- */
function ZoneDiagram() {
  return (
    <div className="relative hairline rounded-sm bg-base/70 px-6 py-10 md:p-12 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,241,234,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative">
        {/* legend */}
        <div className="flex items-center justify-between mb-8 text-[10px] tracking-wider2 uppercase text-muted">
          <span>Top-down · Vending machine ▶ camera ◀ pedestrian flow</span>
          <span className="text-champagne">Scale · meters</span>
        </div>

        <div className="relative h-72 md:h-80">
          {/* Vending machine icon (left) */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <div className="hairline-gold w-12 h-24 flex items-center justify-center">
              <div className="w-1 h-12 bg-champagne/60" />
            </div>
            <div className="text-[10px] tracking-wider2 uppercase text-champagne">
              Machine
              <br />
              <span className="text-muted">+ camera</span>
            </div>
          </div>

          {/* Zone rings */}
          {[
            { r: 14, label: "Op", color: "rgba(200,169,106,0.20)", at: 110 },
            { r: 26, label: "Ap", color: "rgba(245,241,234,0.14)", at: 230 },
            { r: 40, label: "Ad", color: "rgba(245,241,234,0.08)", at: 380 },
            { r: 52, label: "Pa", color: "rgba(168,162,154,0.06)", at: 540 },
          ].map((z, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: easeLuxe, delay: i * 0.12 }}
              className="absolute top-1/2 -translate-y-1/2 rounded-full border border-champagne/30"
              style={{
                left: `${z.at - z.r * 4}px`,
                width: `${z.r * 8}px`,
                height: `${z.r * 8}px`,
                background: `radial-gradient(circle at left center, ${z.color} 0%, transparent 70%)`,
                maxWidth: "90vw",
              }}
            />
          ))}

          {/* Pedestrian dots */}
          {[
            { x: "18%", y: "30%" },
            { x: "30%", y: "70%" },
            { x: "44%", y: "40%" },
            { x: "58%", y: "62%" },
            { x: "72%", y: "35%" },
            { x: "82%", y: "65%" },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: easeLuxe, delay: 0.4 + i * 0.06 }}
              className="absolute"
              style={{ left: p.x, top: p.y }}
            >
              <span className="block h-2 w-2 rounded-full bg-ivory shadow-[0_0_12px_rgba(245,241,234,0.5)]" />
            </motion.div>
          ))}

          {/* Scale marks */}
          <div className="absolute bottom-2 left-20 right-4 flex items-end text-[10px] tracking-wider2 uppercase text-muted">
            <div className="flex-1 border-t border-ivory/[0.12] pt-2">0.3m</div>
            <div className="flex-1 border-t border-ivory/[0.12] pt-2">0.8</div>
            <div className="flex-1 border-t border-ivory/[0.12] pt-2">1.8</div>
            <div className="flex-1 border-t border-ivory/[0.12] pt-2">3.5</div>
            <div className="border-t border-ivory/[0.12] pt-2">3.5m +</div>
          </div>
        </div>
      </div>
    </div>
  );
}
