"use client";

import Image from "next/image";
import { useLang } from "@/context/LanguageContext";

const EMAIL = "f24ba001@chuo.ac.jp";
const TSC_URL = "https://xx0019v.github.io/TSC/";

export default function PortfolioHome() {
  const { lang, setLang } = useLang();
  const jp = lang === "jp";

  const projects = [
    {
      no: "01",
      href: "#ai-camera",
      title: "AI Camera",
      type: jp ? "行動データ × 空間体験" : "Behavior data × spatial experience",
      status: jp ? "プロトタイプ / 2026" : "Prototype / 2026",
    },
    {
      no: "02",
      href: "#fragrance",
      title: "Fragrance Spot",
      type: jp ? "ブランド × 店頭体験" : "Brand × retail experience",
      status: jp ? "実制作 / 2026" : "Produced work / 2026",
    },
    {
      no: "03",
      href: "#tsc",
      title: "TSC English Academy",
      type: jp ? "Web設計 × 実装" : "Web direction × build",
      status: jp ? "公開中" : "Live",
    },
    {
      no: "04",
      href: "#archive",
      title: "Character Keychains",
      type: jp ? "AI共創 × キャラクター" : "AI-assisted character direction",
      status: jp ? "校内プロジェクト" : "School project",
    },
  ];

  return (
    <>
      <a className="skip-link" href="#main">
        {jp ? "本文へ移動" : "Skip to content"}
      </a>

      <header className="site-header">
        <div className="site-shell header-row">
          <a className="identity" href="#top" aria-label={jp ? "ページ先頭へ" : "Back to top"}>
            <span className="identity-name">Avendaño Shintaro</span>
            <span className="identity-role">Creative Technologist</span>
          </a>

          <nav className="main-nav" aria-label={jp ? "メインナビゲーション" : "Main navigation"}>
            <a href="#work">{jp ? "作品" : "Work"}</a>
            <a href="#profile">{jp ? "プロフィール" : "Profile"}</a>
            <a href="#contact">{jp ? "連絡" : "Contact"}</a>
          </nav>

          <div className="language-switch" role="group" aria-label="Language">
            <button type="button" aria-pressed={jp} onClick={() => setLang("jp")}>
              JP
            </button>
            <button type="button" aria-pressed={!jp} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero site-shell" id="top">
          <div className="hero-copy">
            <p className="kicker">AVENDAÑO SHINTARO / PORTFOLIO 2026</p>
            <h1>
              {jp ? (
                <>
                  AIで考え、
                  <br />
                  Webで動かす。
                  <br />
                  <span>体験までつくる。</span>
                </>
              ) : (
                <>
                  Think with AI.
                  <br />
                  Build for the web.
                  <br />
                  <span>Shape the whole experience.</span>
                </>
              )}
            </h1>
            <p className="hero-intro">
              {jp
                ? "AIカメラ、Web、ブランド表現を横断し、企画から実装、発表まで手を動かすICTデザイン学生です。"
                : "An ICT design student working across AI cameras, web development, and brand expression—from concept through implementation and presentation."}
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                {jp ? "作品を見る" : "View selected work"}
                <span aria-hidden>↓</span>
              </a>
              <a className="text-link" href={`mailto:${EMAIL}?subject=Portfolio%20Inquiry`}>
                {jp ? "制作について話す" : "Start a conversation"}
                <span aria-hidden>↗</span>
              </a>
            </div>

            <dl className="hero-facts">
              <div>
                <dt>{jp ? "現在" : "Now"}</dt>
                <dd>{jp ? "中央情報大学校" : "Chuo Information College"}</dd>
              </div>
              <div>
                <dt>{jp ? "領域" : "Focus"}</dt>
                <dd>AI · Web · Visual Direction</dd>
              </div>
              <div>
                <dt>{jp ? "言語" : "Languages"}</dt>
                <dd>日本語 · Tagalog · English</dd>
              </div>
            </dl>
          </div>

          <figure className="hero-media">
            <div className="hero-media-label" aria-hidden>
              FEATURED / 01
            </div>
            <Image
              src="/images/ai-camera/sensor-panel.png"
              alt={jp ? "AIカメラセンサーの展示パネル" : "Exhibition panel for the AI camera sensor project"}
              width={1080}
              height={1527}
              priority
              sizes="(max-width: 800px) 100vw, 42vw"
            />
            <figcaption>
              <span>AI CAMERA SENSOR</span>
              <span>{jp ? "展示パネル / 行動分析" : "Exhibition panel / behavior analytics"}</span>
            </figcaption>
          </figure>
        </section>

        <section className="project-index" id="work" aria-labelledby="work-title">
          <div className="site-shell">
            <div className="index-intro">
              <h2 id="work-title">{jp ? "選んだ4つの仕事" : "Four selected works"}</h2>
              <p>
                {jp
                  ? "見た目だけでなく、課題の整理、仕組み、実装まで見えるものを選びました。"
                  : "Selected to show not only the final visuals, but also the problem, system, and build behind them."}
              </p>
            </div>
            <ol className="project-list">
              {projects.map((project) => (
                <li key={project.no}>
                  <a href={project.href}>
                    <span className="project-no">{project.no}</span>
                    <span className="project-title">{project.title}</span>
                    <span className="project-type">{project.type}</span>
                    <span className="project-status">{project.status}</span>
                    <span className="project-arrow" aria-hidden>
                      ↘
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <article className="case case-ai site-shell" id="ai-camera" aria-labelledby="ai-title">
          <header className="case-heading">
            <div className="case-mark">
              <span>01</span>
              <span>AI / COMPUTER VISION</span>
            </div>
            <h2 id="ai-title">{jp ? "匿名で、注目を測る" : "Measure attention, not identity"}</h2>
            <p>
              {jp
                ? "香水自販機のサイネージが、どの距離で、どれくらい見られたかを匿名データとして可視化するプロトタイプです。決済や商品排出には触れず、広告体験だけを対象にしました。"
                : "A prototype that turns distance and dwell around fragrance-vending signage into anonymous data. It measures the advertising experience without touching payment or dispensing systems."}
            </p>
          </header>

          <div className="ai-media-grid">
            <figure className="ai-media-primary">
              <Image
                src="/images/ai-camera/sensor-panel.png"
                alt={jp ? "AIカメラセンサーの説明パネル" : "AI camera sensor explanation panel"}
                width={1080}
                height={1527}
                sizes="(max-width: 800px) 100vw, 58vw"
              />
            </figure>
            <figure className="ai-media-secondary">
              <Image
                src="/images/ai-camera/privacy-panel.png"
                alt={jp ? "プライバシー設計の説明パネル" : "Privacy design explanation panel"}
                width={1080}
                height={1527}
                sizes="(max-width: 800px) 80vw, 28vw"
              />
              <figcaption>
                {jp ? "生画像を保存せず、顔認証を使わない設計" : "No raw image storage and no facial recognition"}
              </figcaption>
            </figure>
          </div>

          <div className="case-detail-grid">
            <dl className="project-meta">
              <div>
                <dt>{jp ? "担当" : "Role"}</dt>
                <dd>{jp ? "構想・UI・可視化設計" : "Concept, UI, visualization"}</dd>
              </div>
              <div>
                <dt>{jp ? "技術" : "Technology"}</dt>
                <dd>Raspberry Pi · Rust · SQLite · DuckDB</dd>
              </div>
              <div>
                <dt>{jp ? "状態" : "Status"}</dt>
                <dd>{jp ? "プロトタイプ / 表示値はサンプル" : "Prototype / display data is sample data"}</dd>
              </div>
            </dl>

            <ol className="decision-list">
              <li>
                <span>01</span>
                <div>
                  <h3>{jp ? "距離で行動を分ける" : "Separate behavior by distance"}</h3>
                  <p>{jp ? "通過・注視・接近・操作を同じ検知として扱わない。" : "Passing, viewing, approaching, and operating are not treated as the same event."}</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>{jp ? "個人を残さない" : "Do not retain identity"}</h3>
                  <p>{jp ? "保存するのは匿名の行動データだけ。" : "Only anonymous behavioral data is retained."}</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>{jp ? "判断できる形にする" : "Make the data actionable"}</h3>
                  <p>{jp ? "時間帯と滞在の傾向を、施設側が読める画面へ変換する。" : "Translate time and dwell trends into a view the venue can understand."}</p>
                </div>
              </li>
            </ol>
          </div>
        </article>

        <article className="case-fragrance" id="fragrance" aria-labelledby="fragrance-title">
          <div className="site-shell fragrance-heading">
            <div className="case-mark">
              <span>02</span>
              <span>BRAND / RETAIL EXPERIENCE</span>
            </div>
            <h2 id="fragrance-title">{jp ? "自販機を、香りを選ぶ時間へ" : "Turn a vending machine into time spent choosing a scent"}</h2>
            <p>
              {jp
                ? "POP、SNS、店頭動画、設置告知まで、ひとつの体験として言葉とビジュアルを揃えました。作品本来のクリーム、金、柔らかな光をそのまま見せます。"
                : "POP, social posts, on-site video, and installation messaging were directed as one experience. The original cream, gold, and soft light remain intact."}
            </p>
          </div>

          <figure className="fragrance-hero">
            <Image
              src="/images/fragrance/key-visual-dark.jpg"
              alt={jp ? "Fragrance Spot 香水自販機のキービジュアル" : "Key visual for the Fragrance Spot vending-machine experience"}
              width={1130}
              height={1600}
              sizes="100vw"
            />
            <figcaption className="site-shell">
              <span>KEY VISUAL / TAKASAKI MONTRES 3F · 4F</span>
              <span>{jp ? "Visual direction · Copywriting · Campaign" : "Visual direction · Copywriting · Campaign"}</span>
            </figcaption>
          </figure>

          <div className="site-shell fragrance-support">
            <figure>
              <Image
                src="/images/fragrance/pop-final.png"
                alt={jp ? "香水メニューの店頭POP" : "In-store fragrance menu POP"}
                width={1024}
                height={1024}
                sizes="(max-width: 800px) 100vw, 55vw"
              />
              <figcaption>MENU POP / INFORMATION DESIGN</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/fragrance/how-to-select.png"
                alt={jp ? "香水自販機の選び方を説明するSNS画像" : "Social image explaining how to select a fragrance"}
                width={1024}
                height={1024}
                sizes="(max-width: 800px) 78vw, 30vw"
              />
              <figcaption>SNS GUIDE / CUSTOMER FLOW</figcaption>
            </figure>
          </div>
        </article>

        <article className="case-tsc" id="tsc" aria-labelledby="tsc-title">
          <div className="site-shell tsc-grid">
            <header>
              <div className="case-mark case-mark-light">
                <span>03</span>
                <span>WEB / LIVE PROJECT</span>
              </div>
              <h2 id="tsc-title">TSC English Academy</h2>
              <p className="tsc-lead">
                {jp
                  ? "海外講師と日本人通訳者が、ひとつの授業に立つ。その違いを、申込まで迷わず伝える公式サイトです。"
                  : "An official site that explains a lesson model led by an overseas instructor and Japanese interpreter, then guides visitors toward applying."}
              </p>
              <a className="button button-light" href={TSC_URL} target="_blank" rel="noreferrer">
                {jp ? "公開サイトを見る" : "Visit the live site"}
                <span aria-hidden>↗</span>
              </a>
            </header>

            <div className="tsc-browser" aria-label={jp ? "TSC公開サイトの概要" : "TSC live site summary"}>
              <div className="browser-bar">
                <span>xx0019v.github.io/TSC</span>
                <span>LIVE</span>
              </div>
              <div className="browser-content">
                <p>OVERSEAS INSTRUCTOR × JAPANESE INTERPRETER</p>
                <h3>Two voices.<br />One lesson.</h3>
                <dl>
                  <div><dt>Role</dt><dd>Web Direction · Build</dd></div>
                  <div><dt>Stack</dt><dd>React · Three.js · GSAP</dd></div>
                  <div><dt>Mode</dt><dd>JP / EN · Public</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </article>

        <section className="archive site-shell" id="archive" aria-labelledby="archive-title">
          <div className="archive-copy">
            <span className="archive-no">04</span>
            <h2 id="archive-title">{jp ? "人らしさを、持ち歩ける形に" : "Make personality something people can carry"}</h2>
            <p>
              {jp
                ? "先生ごとの表情や空気感を観察し、AIを案出しの相棒として使いながら、キャラクターキーホルダーへ仕上げる校内プロジェクトです。"
                : "A school project that observes each teacher's expressions and character, uses AI as an ideation partner, and develops the result into physical keychains."}
            </p>
            <dl>
              <div><dt>{jp ? "担当" : "Role"}</dt><dd>Concept · Character direction · Print data</dd></div>
              <div><dt>{jp ? "公開方針" : "Privacy"}</dt><dd>{jp ? "顔写真・実名は許可なく掲載しない" : "No real names or photos without permission"}</dd></div>
            </dl>
          </div>
          <div className="archive-gallery">
            <Image src="/images/keychain/keychain-uchiike-collection.jpg" alt={jp ? "7種類の先生キャラクターキーホルダー" : "Collection of seven teacher character keychains"} width={1200} height={800} sizes="(max-width: 800px) 100vw, 58vw" />
            <Image src="/images/keychain/keychain-arisu.jpg" alt={jp ? "元気な表現のキーホルダー案" : "Energetic keychain concept"} width={800} height={800} sizes="(max-width: 800px) 48vw, 24vw" />
            <Image src="/images/keychain/keychain-fukukocho.jpg" alt={jp ? "アニメ調のキーホルダー案" : "Anime-style keychain concept"} width={800} height={800} sizes="(max-width: 800px) 48vw, 24vw" />
          </div>
        </section>

        <section className="profile" id="profile" aria-labelledby="profile-title">
          <div className="site-shell profile-grid">
            <div className="profile-statement">
              <p className="profile-label">PROFILE / AVENDAÑO SHINTARO</p>
              <h2 id="profile-title">{jp ? "デザインと実装の間に立つ" : "Working between design and implementation"}</h2>
            </div>
            <div className="profile-body">
              <p>
                {jp
                  ? "中央情報大学校 高度ICTデザイン学科で、AI、Web制作、ブランディング、企画を横断して学んでいます。完成画面だけでなく、目的、伝わり方、使う人の動きまで考えて形にします。"
                  : "I study AI, web production, branding, and planning in the Advanced ICT Design program at Chuo Information College. I shape not only the final screen, but also its purpose, communication, and user behavior."}
              </p>
              <dl className="profile-table">
                <div><dt>{jp ? "得意な動き方" : "How I work"}</dt><dd>{jp ? "観察 → 整理 → 試作 → 実装 → 発表" : "Observe → frame → prototype → build → present"}</dd></div>
                <div><dt>{jp ? "制作領域" : "Practice"}</dt><dd>AI systems · Frontend · Visual direction</dd></div>
                <div><dt>{jp ? "言語" : "Languages"}</dt><dd>Japanese · Tagalog · English</dd></div>
                <div><dt>{jp ? "相談可能" : "Available for"}</dt><dd>{jp ? "インターン・Web制作・共同プロジェクト" : "Internships, web work, collaborations"}</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="contact site-shell" id="contact" aria-labelledby="contact-title">
          <p className="contact-index">CONTACT / 05</p>
          <h2 id="contact-title">{jp ? "次につくるものを、話しましょう" : "Let's talk about what to build next"}</h2>
          <p>
            {jp
              ? "インターン、Web制作、学校・地域との企画など、内容が固まっていない段階でも大丈夫です。"
              : "Open to internships, web projects, and school or community collaborations—even when the idea is still early."}
          </p>
          <a className="contact-email" href={`mailto:${EMAIL}?subject=Portfolio%20Inquiry`}>
            <span>{EMAIL}</span>
            <span aria-hidden>↗</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-shell footer-row">
          <span>© 2026 Avendaño Shintaro</span>
          <span>Gunma / Tokyo · JP</span>
          <a href="#top">{jp ? "上へ戻る ↑" : "Back to top ↑"}</a>
        </div>
      </footer>
    </>
  );
}
