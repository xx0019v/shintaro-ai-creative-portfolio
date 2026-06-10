export type Lang = "jp" | "en";

type Dict = Record<string, { jp: string; en: string }>;

export const t: Dict = {
  // Navigation
  nav_about: { jp: "About", en: "About" },
  nav_projects: { jp: "Projects", en: "Projects" },
  nav_skills: { jp: "Skills", en: "Skills" },
  nav_contact: { jp: "Contact", en: "Contact" },

  // Hero
  hero_kicker: { jp: "Portfolio — Volume 02", en: "Portfolio — Volume 02" },
  hero_name: { jp: "Avendano Shintaro", en: "Avendano Shintaro" },
  hero_role: { jp: "AI Creative Developer", en: "AI Creative Developer" },
  hero_h1_a: { jp: "Turning Ideas", en: "Turning Ideas" },
  hero_h1_b: { jp: "into Systems,", en: "into Systems," },
  hero_h1_c: { jp: "Visuals, & Experiences.", en: "Visuals, & Experiences." },
  hero_jp_main: {
    jp: "アイデアを、システム・ビジュアル・体験に変える。",
    en: "Turning ideas into systems, visuals, and experiences.",
  },
  hero_sub: {
    jp: "AI、Web制作、ブランディング、ビジュアルデザインを横断し、アイデアを実際に使える体験として形にします。",
    en: "I create projects that connect AI, web production, branding, visual design, and human behavior.",
  },
  hero_cta_projects: { jp: "プロジェクトを見る", en: "View Projects" },
  hero_cta_contact: { jp: "お問い合わせ", en: "Contact Me" },
  hero_currently: { jp: "Currently building", en: "Currently building" },
  hero_currently_desc: {
    jp: "AIカメラ分析・香水ブランディング・クライアント案件・学校創作プロジェクト。",
    en: "AI camera analytics · fragrance branding · client websites · school creative projects.",
  },
  hero_scroll: { jp: "Scroll to read", en: "Scroll to read" },

  // About
  about_label: { jp: "About", en: "About" },
  about_title_a: { jp: "I design with", en: "I design with" },
  about_title_b: { jp: "technology,", en: "technology," },
  about_title_c: { jp: "observation,", en: "observation," },
  about_title_d: { jp: "and intention.", en: "and intention." },
  about_jp_title: { jp: "技術・観察・意図でデザインする。", en: "Technology, observation, intention." },
  about_body_1: {
    jp: "中央情報大学校 高度ICTデザイン学科で、AI・Web制作・デザイン・ブランディング・企画を横断して学んでいます。見た目だけでなく、目的・伝わり方・使う人の行動まで考えながら、実際に使える形へ落とし込むことを大切にしています。",
    en: "I am an ICT Design student at Chuo Information College, learning and creating across AI, web production, visual design, branding, and project planning. My goal is not only to make things look good, but to design meaningful experiences that solve problems, communicate clearly, and move people to action.",
  },
  about_meta_role: { jp: "Role", en: "Role" },
  about_meta_role_v: { jp: "AI Creative Developer", en: "AI Creative Developer" },
  about_meta_based: { jp: "Based", en: "Based" },
  about_meta_based_v: { jp: "群馬・東京", en: "Gunma · Tokyo, JP" },
  about_meta_focus: { jp: "Focus", en: "Focus" },
  about_meta_focus_v: { jp: "AI · Web · Branding", en: "AI · Web · Branding" },
  about_meta_school: { jp: "School", en: "School" },
  about_meta_school_v: { jp: "中央情報大学校", en: "Chuo Information College" },
  about_meta_dept: { jp: "Department", en: "Department" },
  about_meta_dept_v: { jp: "高度ICTデザイン学科", en: "Advanced ICT Design" },
  about_meta_avail: { jp: "Available", en: "Available" },
  about_meta_avail_v: { jp: "インターン・案件", en: "Internship / Project" },

  principle_observation_t: { jp: "Observation", en: "Observation" },
  principle_observation_b: {
    jp: "人や状況、小さな変化を観察し、必要な行動を考えることを意識しています。",
    en: "I observe people, situations, and small details to understand what is needed.",
  },
  principle_persistence_t: { jp: "Persistence", en: "Persistence" },
  principle_persistence_b: {
    jp: "うまくいかない時も改善を重ね、最後まで粘り強く取り組みます。",
    en: "I keep improving even when things do not work at first.",
  },
  principle_adaptability_t: { jp: "Adaptability", en: "Adaptability" },
  principle_adaptability_b: {
    jp: "環境や相手、目的に合わせて動き方を調整しながら行動できます。",
    en: "I adjust my approach depending on the environment, people, and project needs.",
  },
  principle_execution_t: { jp: "Execution", en: "Execution" },
  principle_execution_b: {
    jp: "アイデアで終わらせず、ビジュアル・Webサイト・システム・資料・発表まで形にします。",
    en: "I do not stop at ideas. I turn them into visuals, websites, systems, documents, and presentations.",
  },

  // AI CAMERA
  ai_label: { jp: "Featured Project", en: "Featured Project" },
  ai_name: { jp: "AI CAMERA", en: "AI CAMERA" },
  ai_subtitle: {
    jp: "香水自販機サイネージ広告の視認効果を、AIカメラで見える化する分析システム。",
    en: "AI Camera Analytics for Fragrance Vending Machine Signage.",
  },
  ai_overview: {
    jp: "AI CAMERAは、自販機に付属するサイネージ広告がどれだけ見られたかを、AIカメラで分析するシステムです。人が近づいたか、広告を見る位置にいたか、どれくらい滞在したかを推定し、匿名データとして可視化します。",
    en: "AI CAMERA estimates how much a signage advertisement is actually seen — analyzing presence, distance zones, approach behavior, viewing possibility, and dwell time, then converting those signals into anonymous analytics.",
  },
  ai_note: {
    jp: "自販機本体・決済・商品排出とは連携せず、サイネージ広告が「実際にどれだけ見られたか」を匿名データとして分析する。個人特定を目的としない、プライバシー優先の設計。",
    en: "This system does not control the vending machine, payment, UI, or product dispensing. It focuses on signage attention as anonymous analytics — no personal identification.",
  },
  ai_purpose_label: { jp: "Project Purpose", en: "Project Purpose" },
  ai_purpose: {
    jp: "サイネージ広告の効果を、感覚ではなくデータで判断できるようにする。",
    en: "Make signage performance measurable through AI camera analysis.",
  },
  ai_analyzes: { jp: "What it analyzes", en: "What it analyzes" },
  ai_stack: { jp: "System Keywords", en: "System Keywords" },
  ai_zones_label: { jp: "Distance Zone Model", en: "Distance Zone Model" },
  ai_zones_jp: { jp: "距離ゾーンによる行動分類モデル", en: "Behavior classification by distance" },
  ai_flow_label: { jp: "Data Flow", en: "Data Flow" },
  ai_flow_jp: { jp: "検知から可視化までのデータフロー", en: "From detection to visualization" },
  ai_privacy_label: { jp: "Privacy-first Design", en: "Privacy-first Design" },
  ai_privacy_title: {
    jp: "視認データを測るための設計。個人を特定するためではない。",
    en: "Designed to measure attention — not to identify people.",
  },
  ai_value_label: { jp: "Value", en: "Value" },
  ai_value_title: {
    jp: "人の動きと広告への視認を、データとして見える化する。",
    en: "Transforms physical attention into measurable insight.",
  },

  // Fragrance
  fr_label: { jp: "Creative Work", en: "Creative Work" },
  fr_name: {
    jp: "Fragrance Vending Machine Branding",
    en: "Fragrance Vending Machine Branding",
  },
  fr_jp_title: {
    jp: "香水自販機を、ただの販売機ではなく「体験」として見せるためのビジュアル制作。",
    en: "A new fragrance ritual you choose with one push.",
  },
  fr_overview: {
    jp: "香水自販機を多くの人に知ってもらうために、POP、SNS投稿、キャンペーン、イベント導線を企画・制作しました。高級感と親しみやすさを両立し、写真を撮りたくなる体験設計を意識しています。",
    en: "POP design, SNS visuals, campaign planning, and visual direction for a fragrance vending machine in a commercial facility — luxury feel, approachable tone, and shareability built in.",
  },
  fr_cat_pop: { jp: "POP Design", en: "POP Design" },
  fr_cat_sns: { jp: "SNS Campaign", en: "SNS Campaign" },
  fr_cat_poster: { jp: "Poster / Flyer", en: "Poster / Flyer" },
  fr_cat_event: { jp: "Event Planning", en: "Event Planning" },
  fr_cat_direction: { jp: "Visual Direction", en: "Visual Direction" },
  fr_cat_copy: { jp: "Copywriting", en: "Copywriting" },
  fr_value: {
    jp: "ビジュアルディレクション、ブランディング、SNSマーケティング、商業施設における発信力を一気通貫で見せる案件。",
    en: "End-to-end demonstration of visual direction, branding, SNS marketing, and commercial communication.",
  },

  // Client Work — TSC English Academy
  cw_label: { jp: "Client Work", en: "Client Work" },
  cw_name: { jp: "TSC English Academy", en: "TSC English Academy" },
  cw_jp_title: {
    jp: "海外講師 × 日本人通訳者のオンライン英語レッスンサービス公式サイト。",
    en: "Official site for an online English service pairing overseas teachers with Japanese interpreters.",
  },
  cw_overview: {
    jp: "TSC English Academyは「海外講師 × 日本人通訳者」という独自の体制を持つオンライン英語レッスンサービスです。サービスの強み・コース内容・料金プランを分かりやすく伝え、安心して問い合わせ・申込につながる導線を意識して構築しました。React・Three.js・GSAPによる動きと、ダークラグジュアリーなブランド世界観を両立。日本語/英語のバイリンガル対応。",
    en: "TSC English Academy is an online English service built on the signature pairing of overseas teachers and Japanese interpreters. The site delivers the unique value proposition, course structure, and pricing with clarity — backed by trust-building visuals and a cinematic React + Three.js + GSAP experience. Bilingual (JA / EN).",
  },
  cw_status: { jp: "Project Status", en: "Project Status" },
  cw_status_done: { jp: "公開済み・本番稼働中", en: "Live · Public" },
  cw_status_domain: { jp: "バイリンガル対応（JA / EN）", en: "Bilingual (JA / EN)" },
  cw_status_launch: { jp: "継続的に改善中", en: "Iterative improvement" },
  cw_role: { jp: "Role", en: "Role" },
  cw_live_url: { jp: "Live Site", en: "Live Site" },
  cw_value: {
    jp: "海外講師×通訳者という独自のUSPを、ダークラグジュアリーな世界観と明快な導線で「申し込みたくなる」体験へ落とし込んだ案件です。",
    en: "Translates a unique overseas-teacher × interpreter USP into a dark-luxury experience with a clear path to enrollment.",
  },

  // Keychain
  kc_label: { jp: "School Project", en: "School Project" },
  kc_name: { jp: "Teacher Character Keychain Project", en: "Teacher Character Keychain Project" },
  kc_jp_title: {
    jp: "先生方をモデルにした、AI活用型キャラクターキーホルダー制作プロジェクト。",
    en: "AI-assisted character design based on teachers' personalities and visual features.",
  },
  kc_overview: {
    jp: "現在、学校内で先生方をモデルにしたキーホルダー制作プロジェクトに参加し、主にデザイン面を担当しています。先生ごとの雰囲気・表情・特徴・仕草が伝わるように、ビジュアル方向性や仕上がりを意識して制作しています。",
    en: "I participate in a school project creating original keychain designs based on teachers. My role is visual design — capturing each teacher's atmosphere, expression, and memorable features as appealing character visuals.",
  },
  kc_ai_label: { jp: "AI as a creative partner", en: "AI as a creative partner" },
  kc_ai_body: {
    jp: "AIを単なる自動生成ツールではなく、案出し・キャラクター表現・方向性確認・質感検討・仕上がり改善のための制作パートナーとして活用しています。",
    en: "I use AI not as a shortcut, but as a creative partner for ideation, character direction, visual variation, texture study, and design refinement.",
  },
  kc_process: { jp: "Creative Process", en: "Creative Process" },
  kc_role: { jp: "Role", en: "Role" },
  kc_privacy: {
    jp: "先生の顔写真や実名は許可なく公開せず、本ポートフォリオでは抽象化・サンプル表示で取り扱っています。",
    en: "Real photographs and names are never shown without permission. Abstracted or sample visuals are used.",
  },

  // Leadership
  ld_label: { jp: "Leadership", en: "Leadership" },
  ld_name: { jp: "School Children's Program Event Director", en: "School Children's Program Event Director" },
  ld_jp_title: {
    jp: "学校主催の学童イベントにおいて、担当教員から直接任命された実行委員長。",
    en: "Appointed directly by a teacher to lead a school-hosted children's program event.",
  },
  ld_overview: {
    jp: "学校主催の学童イベントにおいて、担当の先生から直接任命され、実行委員長として企画・準備・進行に関わっています。責任を持って周囲と連携し、プロジェクトを前に進める経験として取り組んでいます。",
    en: "I was appointed directly by a teacher as the executive director for a school-hosted children's program event. I support planning, preparation, communication, and progress — taking responsibility and moving the project forward.",
  },
  ld_role: { jp: "Role", en: "Role" },
  ld_statement: { jp: "Portfolio Statement", en: "Portfolio Statement" },
  ld_statement_body: {
    jp: "デザインや技術だけでなく、責任ある立場で人や企画を動かす力を示す経験です。",
    en: "Trusted with responsibility — to support a project beyond design or technology.",
  },
  ld_appointment: { jp: "Appointment", en: "Appointment" },
  ld_appointment_body: {
    jp: "担当教員より直接任命。責任感・連携・実行力への信頼を意味する任命。",
    en: "Directly appointed by a teacher — a signal of trust in responsibility, communication, and execution.",
  },

  // Skills
  sk_label: { jp: "Skills", en: "Skills" },
  sk_title_a: { jp: "A working", en: "A working" },
  sk_title_b: { jp: "vocabulary", en: "vocabulary" },
  sk_title_c: { jp: "across AI, web, and design.", en: "across AI, web, and design." },
  sk_jp_title: {
    jp: "AI・Web・デザイン・企画を横断する実務スキルセット。",
    en: "A practical skill set across AI, web, design, and direction.",
  },
  sk_cat_ai: { jp: "AI / System", en: "AI / System" },
  sk_cat_ai_jp: { jp: "AI・システム", en: "AI / System" },
  sk_cat_web: { jp: "Web / Development", en: "Web / Development" },
  sk_cat_web_jp: { jp: "Web・開発", en: "Web / Development" },
  sk_cat_creative: { jp: "Creative / Design", en: "Creative / Design" },
  sk_cat_creative_jp: { jp: "クリエイティブ・デザイン", en: "Creative / Design" },
  sk_cat_plan: { jp: "Planning / Direction", en: "Planning / Direction" },
  sk_cat_plan_jp: { jp: "企画・ディレクション", en: "Planning / Direction" },

  // Strengths
  st_label: { jp: "Strengths", en: "Strengths" },
  st_title_a: { jp: "I move", en: "I move" },
  st_title_b: { jp: "projects", en: "projects" },
  st_title_c: { jp: "forward.", en: "forward." },
  st_jp_title: {
    jp: "状況を読み、必要なことを実行に変える。",
    en: "Reading the situation, turning needs into action.",
  },
  st_body: {
    jp: "状況を見て、必要なことを考え、周囲と連携しながらプロジェクトを前に進めることを大切にしています。学校プロジェクト、AIを使った制作、Web制作、イベント運営の中で、伝わり方・改善・実行力を意識して行動しています。",
    en: "I observe the situation, understand what needs to be done, and take action. In school projects, AI-assisted design, web development, and event work, I focus on communication, improvement, and execution.",
  },
  strength_obs_t: { jp: "Observation", en: "Observation" },
  strength_obs_b: {
    jp: "人・空間・流れの小さな変化に気づき、より良い判断につなげます。",
    en: "I notice small changes in people, space, and workflow, then turn them into better decisions.",
  },
  strength_comm_t: { jp: "Communication", en: "Communication" },
  strength_comm_b: {
    jp: "さまざまなタイプの人と関わりながら、前向きに進める雰囲気を作ります。",
    en: "I work with different types of people and keep the project atmosphere positive.",
  },
  strength_solve_t: { jp: "Problem Solving", en: "Problem Solving" },
  strength_solve_b: {
    jp: "うまくいかない時に原因を考え、現実的な改善策を提案します。",
    en: "When something doesn't work, I look for the cause and propose a practical solution.",
  },
  strength_direction_t: { jp: "Creative Direction", en: "Creative Direction" },
  strength_direction_b: {
    jp: "見た目だけでなく、雰囲気・伝わり方・印象・仕上がりまで考えて制作します。",
    en: "I think about mood, message, impression, and final output quality — not just visuals.",
  },
  strength_exec_t: { jp: "Execution", en: "Execution" },
  strength_exec_b: {
    jp: "アイデアで終わらせず、ビジュアル・資料・システム・Webサイト・発表まで形にします。",
    en: "I don't stop at ideas. I turn them into visuals, documents, systems, websites, and presentations.",
  },
  strength_adapt_t: { jp: "Adaptability", en: "Adaptability" },
  strength_adapt_b: {
    jp: "プロジェクトや相手、状況に合わせて動き方を調整できます。",
    en: "I adjust my approach depending on the project, people, and situation.",
  },

  // Education
  ed_label: { jp: "Education & Certifications", en: "Education & Certifications" },
  ed_title_a: { jp: "A quiet record of", en: "A quiet record of" },
  ed_title_b: { jp: "learning,", en: "learning," },
  ed_title_c: { jp: "proof, and", en: "proof, and" },
  ed_title_d: { jp: "practice.", en: "practice." },
  ed_jp_title: { jp: "学びと、その証明。", en: "Learning — and proof of it." },
  ed_education: { jp: "Education", en: "Education" },
  ed_school_a: { jp: "中央情報大学校", en: "Chuo Information College" },
  ed_school_a_dept: { jp: "高度ICTデザイン学科", en: "Advanced ICT Design Department" },
  ed_school_a_note: { jp: "卒業見込：2028", en: "Expected graduation · 2028" },
  ed_school_a_period: { jp: "2024 — 現在", en: "2024 — Present" },
  ed_school_b: { jp: "群馬県立前橋工業高等学校", en: "Maebashi Technical High School" },
  ed_school_b_dept: { jp: "工学・設計の基礎", en: "Foundations in engineering and design" },
  ed_school_b_period: { jp: "2021 — 2024", en: "2021 — 2024" },
  ed_certs: { jp: "Certifications", en: "Certifications" },
  ed_cert_1_en: { jp: "Second-Class Electrician", en: "Second-Class Electrician" },
  ed_cert_1_jp: { jp: "第二種電気工事士", en: "" },
  ed_cert_2_en: {
    jp: "Information Processing Engineer (Grade 2 · Part 1)",
    en: "Information Processing Engineer Ability Certification (Grade 2 · Part 1)",
  },
  ed_cert_2_jp: { jp: "情報処理技術者能力認定試験 2級1部", en: "" },
  ed_cert_3_en: { jp: "Business Manners (Grade 3)", en: "Business Manners Certification (Grade 3)" },
  ed_cert_3_jp: { jp: "社会人常識マナー検定試験 3級", en: "" },
  ed_now: { jp: "Now studying", en: "Now studying" },
  ed_now_body: {
    jp: "AIカメラ、実務水準のWeb制作、ブランド体験のビジュアル設計。",
    en: "AI camera systems, production-grade web production, brand experience visual direction.",
  },

  // Contact
  ct_label: { jp: "Contact", en: "Contact" },
  ct_title_a: { jp: "Let's create", en: "Let's create" },
  ct_title_b: { jp: "something meaningful.", en: "something meaningful." },
  ct_body: {
    jp: "インターンシップ、プロジェクト相談、Web制作、ポートフォリオに関するお問い合わせはこちらから。",
    en: "For internship opportunities, project collaboration, website production, or portfolio inquiries — feel free to reach out.",
  },
  ct_send: { jp: "Send Email", en: "Send Email" },
  ct_view: { jp: "View Projects", en: "View Projects" },

  // Footer
  ft_role: { jp: "AI Creative Developer Portfolio", en: "AI Creative Developer Portfolio" },
  ft_back: { jp: "Back to top", en: "Back to top" },
  ft_built: { jp: "Designed & built in Japan · 2026", en: "Designed & built in Japan · 2026" },
};

/* =========================================================================
   ADDITIONS — full bilingual coverage for every visible string
   ========================================================================= */

const additions: Dict = {
  // ─── AI CAMERA — value list ─────────────────────────────────────────────
  ai_value_li_1: {
    jp: "広告効果を数値で判断できる",
    en: "Ad performance you can measure, not guess.",
  },
  ai_value_li_2: {
    jp: "時間帯別の視認傾向を把握できる",
    en: "Attention patterns broken down by hour.",
  },
  ai_value_li_3: {
    jp: "通過・接近・操作・視認を分けて分析",
    en: "Passing, approach, operation, and view — each analysed apart.",
  },
  ai_value_li_4: {
    jp: "商業施設や広告主への定量レポート",
    en: "Quantified reports for venues and advertisers.",
  },
  ai_value_li_5: {
    jp: "プライバシーに配慮した設計思想",
    en: "Privacy-first by design.",
  },

  // ─── AIKameranado — distance zones JP descriptions ──────────────────────
  ai_zone_op_jp: { jp: "操作している位置", en: "At the touch panel" },
  ai_zone_ap_jp: { jp: "自販機に近づく行動", en: "Approaching the machine" },
  ai_zone_ad_jp: { jp: "サイネージを見ている可能性", en: "Likely viewing the signage" },
  ai_zone_pa_jp: { jp: "通過する人々", en: "Pedestrians passing through" },

  // ─── AIKameranado — flow JP labels ──────────────────────────────────────
  ai_flow_01_jp: { jp: "人が通る / 広告を見る", en: "A person passes by or sees the signage" },
  ai_flow_02_jp: { jp: "AIカメラが人物を検知", en: "The AI camera detects them" },
  ai_flow_03_jp: { jp: "距離・滞在・注視の可能性を推定", en: "Distance, dwell, and viewing likelihood estimated" },
  ai_flow_04_jp: { jp: "匿名データとして保存", en: "Stored as anonymous data" },
  ai_flow_05_jp: { jp: "ダッシュボードやレポートで可視化", en: "Visualised in dashboard and report" },

  // ─── AIKameranado — privacy JP labels ───────────────────────────────────
  ai_priv_storage_jp: { jp: "生画像保存なし", en: "Raw imagery never stored" },
  ai_priv_face_jp: { jp: "顔認証なし", en: "No face recognition" },
  ai_priv_anon_jp: { jp: "匿名行動データ", en: "Anonymous behavioural data only" },
  ai_priv_edge_jp: { jp: "エッジ処理優先", en: "Edge-first processing" },

  // ─── Fragrance — work block JP copy ─────────────────────────────────────
  fr_w01_role: { jp: "ビジュアルディレクション", en: "Visual direction" },
  fr_w01_output: { jp: "パネル・SNS・展示", en: "Panels · social · exhibition" },
  fr_w01_jp: {
    jp: "「香りを選ぶ」体験を一枚で伝えるメインビジュアル。高崎モントレー 3F・4F 展開のブランドキー。",
    en: "A single image that captures the act of choosing a scent — the brand key for the 3F and 4F installation at Takasaki Monterey.",
  },
  fr_w02_body: {
    jp: "選びやすさ・上品さ・体験性を両立した売場POP。香りの印象を言葉とビジュアルで整理し、「香水選び」自体を体験化。",
    en: "A point-of-sale piece that makes choosing easy and the choice itself feel like an experience.",
  },
  fr_w02_t1: { jp: "エディトリアル余白", en: "Editorial spacing" },
  fr_w02_t2: { jp: "花・布・光の質感", en: "Floral · fabric · light texture" },
  fr_w02_t3: { jp: "上品なコピー", en: "Restrained copywriting" },
  fr_w02_t4: { jp: "情報階層の簡素化", en: "Simplified hierarchy" },
  fr_w03_label: { jp: "Work 03 · 設置告知", en: "Work 03 · Installation Notice" },
  fr_w03_body: {
    jp: "「高崎モントレー 3F・4F にて展開中」設置告知。ブランド世界観を保ったまま現地情報を伝える。",
    en: "An on-site notice that holds the brand world intact while telling you exactly where to find it.",
  },
  fr_w04_label: { jp: "Work 04 · SNS導線", en: "Work 04 · Social Flow" },
  fr_w04_body: {
    jp: "来店者の不安を取り除く「使い方カルーセル」。タッチパネル選択から決済まで2枚で伝える。",
    en: "A two-card carousel that removes any hesitation — from selecting on the touch panel to checking out.",
  },
  fr_signage_title: { jp: "Work 05 · Digital Signage", en: "Work 05 · Digital Signage" },
  fr_signage_eyebrow: { jp: "On-site Signage Triptych", en: "On-site Signage Triptych" },
  fr_signage_body: {
    jp: "店頭で流す3本構成 ─ 香りを「体験」として伝えるための動画ディレクション。",
    en: "A three-film triptych played on-site — fragrance directed as experience.",
  },
  fr_signage_meta: { jp: "Loop · Muted · 9:16", en: "Loop · Muted · 9:16" },
  fr_signage_01_caption: { jp: "01 · 香りを、まとう", en: "01 · Wear the Scent" },
  fr_signage_01_body: {
    jp: "メインビジュアル動画。香りを身にまとう瞬間を15秒の上質な合図に。",
    en: "The main signage film — fifteen quiet seconds of putting on a scent.",
  },
  fr_signage_02_caption: { jp: "02 · RED Edition", en: "02 · RED Edition" },
  fr_signage_02_body: {
    jp: "赤を基調とした華やかな女性向けエディション。情熱と上品さの両立。",
    en: "A red-led edition for a feminine audience — confident and refined at once.",
  },
  fr_signage_03_caption: { jp: "03 · Unisex Edition", en: "03 · Unisex Edition" },
  fr_signage_03_body: {
    jp: "男女兼用ラインアップ向け。中性的でモードな表現で新しい顧客層へ訴求。",
    en: "For the unisex line — a quieter, modern register that opens the brand to new audiences.",
  },

  // ─── Client Work — meta strings ─────────────────────────────────────────
  cw_meta_usp: { jp: "海外講師 × 通訳者", en: "Overseas teachers × interpreters" },

  // ─── Keychain — work + meta ─────────────────────────────────────────────
  kc_w01_eyebrow: { jp: "Work 01 · Charm Collection", en: "Work 01 · Charm Collection" },
  kc_w01_title: { jp: "7 Daily Moments", en: "7 Daily Moments" },
  kc_w01_body: {
    jp: "「日常の7つの瞬間を、いつでも、もう一度に。」FOCUS / WORK MODE / OK / CHECKING / BREAK / CHARGE / CALL ─ ひとりの先生の7表情を、コレクションとしてデザインしました。",
    en: "Seven everyday moments — FOCUS · WORK MODE · OK · CHECKING · BREAK · CHARGE · CALL — one teacher, seven expressions, designed as a single collection.",
  },
  kc_w01_material: { jp: "アクリル / 70mm Round", en: "Acrylic · 70mm Round" },
  kc_w01_attach: { jp: "メタルリング", en: "Metal ring" },
  kc_w01_series: { jp: "7 表情 / コレクション", en: "7 expressions · collection" },
  kc_w01_tone: { jp: "エディトリアル写真", en: "Editorial photography" },
  kc_w02_eyebrow: { jp: "Work 02 · Energetic", en: "Work 02 · Energetic" },
  kc_w02_caption: { jp: "Concept · Energetic Edition", en: "Concept · Energetic Edition" },
  kc_w02_body: {
    jp: "「やる気MAX！」手描きタイポと吹き出しで先生のキャラクターを増幅。元気・前向き・親しみやすさを軸にした明快な一枚。",
    en: "Hand-drawn typography and a speech bubble amplify the teacher's spirit — bright, forward, approachable.",
  },
  kc_w03_eyebrow: { jp: "Work 03 · Anime Portrait", en: "Work 03 · Anime Portrait" },
  kc_w03_caption: { jp: "Concept · Anime Portrait", en: "Concept · Anime Portrait" },
  kc_w03_body: {
    jp: "「今日どうしたん？」ですわる先生のひと時を、アニメ調イラストで温かく描写。素材感とブラシのリズムで「日常らしさ」を残す。",
    en: "An anime-style portrait that warms a quiet moment at the desk — kept everyday by texture and brush rhythm.",
  },
  kc_process_jp: { jp: "制作プロセス", en: "Process" },
  kc_note_label: { jp: "Note · 注記", en: "Note" },

  // ─── Keychain — process JP labels ───────────────────────────────────────
  kc_p01_jp: { jp: "先生ごとの特徴や雰囲気を観察", en: "Observe each teacher's traits and atmosphere" },
  kc_p02_jp: { jp: "ビジュアル方向性を決定", en: "Lock in the visual direction" },
  kc_p03_jp: { jp: "AIを活用して複数案を作成", en: "Generate variants with AI" },
  kc_p04_jp: { jp: "表情・ポーズ・色・質感を調整", en: "Refine expression, pose, colour, texture" },
  kc_p05_jp: { jp: "キーホルダー制作に向けてデータを整える", en: "Prepare print-ready files" },

  // ─── Leadership — strength chips ────────────────────────────────────────
  ld_s_leadership: { jp: "リーダーシップ", en: "Leadership" },
  ld_s_trust: { jp: "先生からの信頼", en: "Trust from teachers" },
  ld_s_responsibility: { jp: "責任感", en: "Responsibility" },
  ld_s_communication: { jp: "周囲との連携", en: "Communication" },
  ld_s_management: { jp: "進行管理", en: "Project management" },
  ld_s_direction: { jp: "企画力", en: "Event direction" },
  ld_s_proactive: { jp: "主体性", en: "Proactive action" },

  // ─── Languages skill (new) ──────────────────────────────────────────────
  sk_cat_lang: { jp: "Languages", en: "Languages" },
  sk_cat_lang_jp: { jp: "語学", en: "Language Skills" },
  sk_lang_native: {
    jp: "日本語・タガログ語・英語を使い分け",
    en: "Native-level Japanese, Tagalog, and English",
  },
  sk_lang_trilingual: {
    jp: "3言語を活かした接客・企画・発信",
    en: "Trilingual communication across cultures",
  },
  sk_lang_cultural: {
    jp: "相手に合わせた自然なコミュニケーション",
    en: "Tone adapted to each audience",
  },
  sk_lang_messaging: {
    jp: "多文化に合わせた言葉選び",
    en: "Brand messaging in three languages",
  },
  sk_lang_summary: {
    jp: "日本語・タガログ語・英語を使い分け、相手に合わせて自然に話します。",
    en: "I communicate naturally in Japanese, Tagalog, and English — adapting tone and message for each audience.",
  },

  // ─── Chat widget ────────────────────────────────────────────────────────
  chat_open: { jp: "AIに聞く", en: "Ask AI" },
  chat_title: { jp: "Concierge", en: "Concierge" },
  chat_subtitle: {
    jp: "ポートフォリオに関するご質問にお答えします",
    en: "Ask anything about the portfolio",
  },
  chat_input_ph: {
    jp: "メッセージを入力…",
    en: "Type a message…",
  },
  chat_send: { jp: "送信", en: "Send" },
  chat_close: { jp: "閉じる", en: "Close" },
  chat_thinking: { jp: "考えています…", en: "Thinking…" },
  chat_welcome: {
    jp: "こんにちは。AVENDANO のポートフォリオへようこそ。プロジェクト、スキル、お問い合わせなど、何でも聞いてください。",
    en: "Welcome to AVENDANO's portfolio. Ask about any project, skill, or how to get in touch.",
  },
  chat_q_ai: { jp: "AI CAMERAについて", en: "Tell me about AI CAMERA" },
  chat_q_tsc: { jp: "TSC English Academy", en: "TSC English Academy" },
  chat_q_hire: { jp: "インターン・案件相談", en: "Internship & projects" },
  chat_q_lang: { jp: "語学スキル", en: "Languages" },
};

Object.assign(t, additions);

export function tr(key: keyof typeof t, lang: Lang): string {
  return t[key]?.[lang] ?? String(key);
}
