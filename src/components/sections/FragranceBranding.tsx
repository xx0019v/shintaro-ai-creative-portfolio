"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import SilverRule from "@/components/ui/SilverRule";
import EditorialFrame from "@/components/ui/EditorialFrame";
import SignageVideo from "@/components/ui/SignageVideo";
import { useLang } from "@/context/LanguageContext";
import { tr, t } from "@/lib/translations";

const CATEGORIES = [
  "fr_cat_pop",
  "fr_cat_sns",
  "fr_cat_poster",
  "fr_cat_event",
  "fr_cat_direction",
  "fr_cat_copy",
] as const;

export default function FragranceBranding() {
  const { lang } = useLang();

  return (
    <section className="relative py-32 md:py-48">
      <div className="max-w-editorial mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          index="03"
          labelKey="fr_label"
          titleEn={
            <>
              Fragrance Vending Machine{" "}
              <span className="italic font-light text-silver">Branding</span>
            </>
          }
          jpTitleKey="fr_jp_title"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-7">
            <p className="font-jpserif text-base md:text-lg text-offwhite/85 leading-loose">
              {tr("fr_overview", lang)}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-offwhite/85">
              {CATEGORIES.map((c, i) => (
                <li key={c} className="flex items-baseline gap-3">
                  <span className="idx text-silver-bright text-[10px] tracking-wider2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{tr(c as keyof typeof t, lang)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Single hero visual — the dark-luxe key visual */}
        <Reveal delay={0.15} className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <EditorialFrame
                src="/images/fragrance/key-visual-dark.png"
                alt="Fragrance Spot — main key visual panel"
                ratio="portrait"
                caption="Fragrance Spot · Key Visual"
                desaturate
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            <div className="md:col-span-5 space-y-6">
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                  Work 01
                </p>
                <h3 className="mt-3 font-serif text-3xl md:text-4xl text-offwhite tracking-tight">
                  Fragrance Spot Key Visual
                </h3>
                <p className="mt-4 font-jpserif text-sm text-offwhite/80 leading-loose">
                  「香りを選ぶ」体験を一枚で伝えるメインビジュアル。高崎モントレー 3F・4F 展開のブランドキー。
                </p>
              </div>
              <SilverRule />
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-1">
                    Role
                  </dt>
                  <dd className="text-offwhite/85 font-jpserif">ビジュアルディレクション</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-1">
                    Output
                  </dt>
                  <dd className="text-offwhite/85 font-jpserif">パネル・SNS・展示</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>

        <SilverRule className="mt-24" />

        {/* Two supporting visuals — POP + installation */}
        <Reveal className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5 md:order-2">
              <EditorialFrame
                src="/images/fragrance/pop-final.png"
                alt="Fragrance Menu POP — final layout"
                ratio="portrait"
                caption="Fragrance Menu · POP"
                desaturate
              />
            </div>
            <div className="md:col-span-7 md:order-1 space-y-6">
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                  Work 02
                </p>
                <h3 className="mt-3 font-serif text-3xl md:text-4xl text-offwhite tracking-tight">
                  Fragrance Menu POP
                </h3>
                <p className="mt-4 font-jpserif text-sm text-offwhite/80 leading-loose">
                  選びやすさ・上品さ・体験性を両立した売場POP。香りの印象を言葉とビジュアルで整理し、「香水選び」自体を体験化。
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-3 text-sm">
                <li className="hairline px-4 py-3 font-jpserif text-offwhite/80">
                  エディトリアル余白
                </li>
                <li className="hairline px-4 py-3 font-jpserif text-offwhite/80">
                  花・布・光の質感
                </li>
                <li className="hairline px-4 py-3 font-jpserif text-offwhite/80">
                  上品なコピー
                </li>
                <li className="hairline px-4 py-3 font-jpserif text-offwhite/80">
                  情報階層の簡素化
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Installation + How-to (back to 2-col, signage gets its own block) */}
        <Reveal className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-5">
              <EditorialFrame
                src="/images/fragrance/installation-panel.png"
                alt="Fragrance Spot — installation announcement panel"
                ratio="portrait"
                caption="Installation Panel"
                desaturate
              />
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                  Work 03 · 設置告知
                </p>
                <p className="mt-2 font-jpserif text-sm text-offwhite/80 leading-relaxed">
                  「高崎モントレー 3F・4F にて展開中」設置告知。ブランド世界観を保ったまま現地情報を伝える。
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <EditorialFrame
                src="/images/fragrance/how-to-select.png"
                alt="SNS How-to carousel — how to use the machine"
                ratio="portrait"
                caption="SNS How-to Carousel"
                desaturate
              />
              <div>
                <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                  Work 04 · SNS導線
                </p>
                <p className="mt-2 font-jpserif text-sm text-offwhite/80 leading-relaxed">
                  来店者の不安を取り除く「使い方カルーセル」。タッチパネル選択から決済まで2枚で伝える。
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Digital Signage — dedicated 3-up gallery */}
        <Reveal className="mt-24">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-[10px] tracking-wider2 uppercase text-silver-bright">
                Work 05 · Digital Signage
              </p>
              <h3 className="mt-3 font-serif text-2xl md:text-3xl text-offwhite tracking-tight">
                On-site Signage Triptych
              </h3>
              <p className="mt-2 font-jpserif text-xs text-silver-muted">
                店頭で流す3本構成 ─ 香りを「体験」として伝えるための動画ディレクション。
              </p>
            </div>
            <p className="text-[10px] tracking-wider2 uppercase text-silver-muted">
              Loop · Muted · 9:16
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="space-y-4">
              <SignageVideo
                src="/images/fragrance/signage-kaori.mp4"
                caption="01 · 香りを、まとう"
              />
              <p className="font-jpserif text-xs text-offwhite/75 leading-relaxed">
                メインビジュアル動画。香りを身にまとう瞬間を15秒の上質な合図に。
              </p>
            </div>
            <div className="space-y-4">
              <SignageVideo
                src="/images/fragrance/signage-red.mp4"
                caption="02 · RED Edition"
              />
              <p className="font-jpserif text-xs text-offwhite/75 leading-relaxed">
                赤を基調とした華やかな女性向けエディション。情熱と上品さの両立。
              </p>
            </div>
            <div className="space-y-4">
              <SignageVideo
                src="/images/fragrance/signage-unisex.mp4"
                caption="03 · Unisex Edition"
              />
              <p className="font-jpserif text-xs text-offwhite/75 leading-relaxed">
                男女兼用ラインアップ向け。中性的でモードな表現で新しい顧客層へ訴求。
              </p>
            </div>
          </div>
        </Reveal>

        {/* value statement */}
        <Reveal delay={0.15} className="mt-20">
          <div className="hairline-silver p-8 md:p-12">
            <p className="text-[10px] tracking-wider2 uppercase text-silver-bright mb-6">
              Project Value
            </p>
            <p className="font-serif text-2xl md:text-3xl text-offwhite tracking-tight leading-snug max-w-3xl">
              From physical product to{" "}
              <span className="italic font-light">a shareable experience</span> —
              brand, visuals, and customer flow as one system.
            </p>
            <p className="mt-4 font-jpserif text-sm text-silver-muted leading-loose max-w-3xl">
              {tr("fr_value", lang)}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
