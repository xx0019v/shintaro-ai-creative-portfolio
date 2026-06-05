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
  hero_name: { jp: "Shintaro Avendano", en: "Shintaro Avendano" },
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

  // AIKameranado
  ai_label: { jp: "Featured Project", en: "Featured Project" },
  ai_name: { jp: "AIKameranado", en: "AIKameranado" },
  ai_subtitle: {
    jp: "香水自販機サイネージ広告の視認効果を、AIカメラで見える化する分析システム。",
    en: "AI Camera Analytics for Fragrance Vending Machine Signage.",
  },
  ai_overview: {
    jp: "AIKameranadoは、自販機に付属するサイネージ広告がどれだけ見られたかを、AIカメラで分析するシステムです。人が近づいたか、広告を見る位置にいたか、どれくらい滞在したかを推定し、匿名データとして可視化します。",
    en: "AIKameranado estimates how much a signage advertisement is actually seen — analyzing presence, distance zones, approach behavior, viewing possibility, and dwell time, then converting those signals into anonymous analytics.",
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
  ed_cert_1_jp: { jp: "第二種電気工事士", en: "第二種電気工事士" },
  ed_cert_2_en: {
    jp: "Information Processing Engineer (Grade 2 · Part 1)",
    en: "Information Processing Engineer Ability Certification (Grade 2 · Part 1)",
  },
  ed_cert_2_jp: { jp: "情報処理技術者能力認定試験 2級1部", en: "情報処理技術者能力認定試験 2級1部" },
  ed_cert_3_en: { jp: "Business Manners (Grade 3)", en: "Business Manners Certification (Grade 3)" },
  ed_cert_3_jp: { jp: "社会人常識マナー検定試験 3級", en: "社会人常識マナー検定試験 3級" },
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

export function tr(key: keyof typeof t, lang: Lang): string {
  return t[key]?.[lang] ?? key;
}
