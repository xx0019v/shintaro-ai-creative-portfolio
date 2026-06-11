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
    jp: "アイデアを\nかたちに変える",
    en: "Turning ideas\ninto things people move through",
  },
  hero_sub: {
    jp: "AIとWeb 制作 ブランディングを横断しながら\n人の動きまで届くものを作る",
    en: "Working across AI web branding and visual design\nbuilding what people actually move through",
  },
  hero_cta_projects: { jp: "作品を見る", en: "See the work" },
  hero_cta_contact: { jp: "話してみる", en: "Get in touch" },
  hero_currently: { jp: "Currently building", en: "Currently building" },
  hero_currently_desc: {
    jp: "AI カメラ分析 香水ブランディング\nクライアント案件 学校創作",
    en: "AI camera analytics · fragrance branding\nclient websites · school creative work",
  },
  hero_scroll: { jp: "Scroll", en: "Scroll" },

  // About
  about_label: { jp: "About", en: "About" },
  about_title_a: { jp: "I design with", en: "I design with" },
  about_title_b: { jp: "technology,", en: "technology," },
  about_title_c: { jp: "observation,", en: "observation," },
  about_title_d: { jp: "and intention.", en: "and intention." },
  about_jp_title: { jp: "技術と観察 そして意図で組み立てる", en: "Built from technology, attention, and intent" },
  about_body_1: {
    jp: "中央情報大学校 高度 ICT デザイン学科で AI と Web 制作 ブランディング 企画を横断して学んでいる\n見た目を整えることより 目的と伝わり方 使う人の動きまで考えて かたちにすることを大切にしている",
    en: "I'm an ICT design student at Chuo Information College — working across AI, web, branding, and direction.\nMy work isn't about polish for its own sake. It's about reading what's needed, then building something that quietly moves someone forward.",
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
    jp: "人と場と空気を見て\n必要なことを先に考える",
    en: "Reading the room before reading the brief\nthen acting on what's actually needed",
  },
  principle_persistence_t: { jp: "Persistence", en: "Persistence" },
  principle_persistence_b: {
    jp: "うまくいかない時こそ\nもう一度ていねいに組み直す",
    en: "When something stops working\nI quietly rebuild it from the ground up",
  },
  principle_adaptability_t: { jp: "Adaptability", en: "Adaptability" },
  principle_adaptability_b: {
    jp: "相手と現場に合わせて\n動き方を変えられる",
    en: "I move differently depending\non the room and what it asks for",
  },
  principle_execution_t: { jp: "Execution", en: "Execution" },
  principle_execution_b: {
    jp: "アイデアで止めず\nビジュアル サイト 資料 発表まで届ける",
    en: "Ideas don't stop at ideas\nthey become visuals, sites, decks, and rooms",
  },

  // AI CAMERA
  ai_label: { jp: "Featured Project", en: "Featured Project" },
  ai_name: { jp: "AI CAMERA", en: "AI CAMERA" },
  ai_subtitle: {
    jp: "香水自販機のサイネージが\nどれだけ見られたか AI カメラで読み解く",
    en: "AI camera analytics\nfor fragrance vending machine signage",
  },
  ai_overview: {
    jp: "AI CAMERA は自販機のサイネージがどれだけ見られたかを読み解くシステム\n人が近づいたか 広告を見る位置にいたか どれくらい立ち止まったかを匿名のデータとして可視化する",
    en: "AI CAMERA reads how much a vending-machine signage is actually seen.\nApproach, distance, dwell, and gaze probability — all surfaced as anonymous, decision-grade data.",
  },
  ai_note: {
    jp: "自販機の決済や商品排出には触れない\n見られた かどうかだけを匿名で扱う プライバシー優先の設計",
    en: "It doesn't touch payment or product dispensing.\nOnly attention is measured — anonymously, by design.",
  },
  ai_purpose_label: { jp: "Project Purpose", en: "Project Purpose" },
  ai_purpose: {
    jp: "サイネージ広告の効果を\n感覚ではなくデータで判断できるようにする",
    en: "Turn ad performance from a feeling\ninto something you can read on a chart",
  },
  ai_analyzes: { jp: "What it analyzes", en: "What it analyzes" },
  ai_stack: { jp: "System Keywords", en: "System Keywords" },
  ai_zones_label: { jp: "Distance Zone Model", en: "Distance Zone Model" },
  ai_zones_jp: { jp: "距離で行動を分けて読む", en: "Behaviour read by distance" },
  ai_flow_label: { jp: "Data Flow", en: "Data Flow" },
  ai_flow_jp: { jp: "検知から可視化までの流れ", en: "From detection to dashboard" },
  ai_privacy_label: { jp: "Privacy-first Design", en: "Privacy-first Design" },
  ai_privacy_title: {
    jp: "視線を測る設計\n人を識別する設計ではない",
    en: "Built to measure attention\nnot to identify the people behind it",
  },
  ai_value_label: { jp: "Value", en: "Value" },
  ai_value_title: {
    jp: "通りすがりの視線を\n読めるデータに変える",
    en: "Turning passing glances\ninto insight you can act on",
  },

  // Fragrance
  fr_label: { jp: "Creative Work", en: "Creative Work" },
  fr_name: {
    jp: "Fragrance Vending Machine Branding",
    en: "Fragrance Vending Machine Branding",
  },
  fr_jp_title: {
    jp: "自販機ではなく\n香りを選ぶ時間として見せる",
    en: "Designed not as a machine\nbut as the moment you choose a scent",
  },
  fr_overview: {
    jp: "POP SNS キャンペーン イベント導線まで一貫してディレクション\n高級感と親しみやすさを両立させ 写真を撮りたくなる時間を設計した",
    en: "POP, social, campaign, and on-site flow — directed end to end.\nLuxury and approachable held in the same frame, designed to be photographed.",
  },
  fr_cat_pop: { jp: "POP Design", en: "POP Design" },
  fr_cat_sns: { jp: "SNS Campaign", en: "SNS Campaign" },
  fr_cat_poster: { jp: "Poster / Flyer", en: "Poster / Flyer" },
  fr_cat_event: { jp: "Event Planning", en: "Event Planning" },
  fr_cat_direction: { jp: "Visual Direction", en: "Visual Direction" },
  fr_cat_copy: { jp: "Copywriting", en: "Copywriting" },
  fr_value: {
    jp: "ビジュアル ブランディング SNS 商業施設での発信を\nひとつの流れとして組み立てた案件",
    en: "Visual direction, brand, social, and on-site flow\nheld together as one continuous gesture",
  },

  // Client Work — TSC English Academy
  cw_label: { jp: "Client Work", en: "Client Work" },
  cw_name: { jp: "TSC English Academy", en: "TSC English Academy" },
  cw_jp_title: {
    jp: "海外講師と日本人通訳者がひとつの授業に立つ\nオンライン英語サービスの公式サイト",
    en: "An online English service where overseas teachers\nand Japanese interpreters share the same lesson",
  },
  cw_overview: {
    jp: "TSC English Academy は 海外講師と日本人通訳者がひとつのレッスンに並ぶサービス\n強み コース 料金を素直に伝え 申込まで自然に進む流れを意識して組み立てた\nReact と Three.js GSAP で動きを設計し ダークラグジュアリーな世界観と読みやすさを両立",
    en: "TSC English Academy pairs overseas teachers with Japanese interpreters inside the same lesson.\nThe site states the value clearly, lets the courses breathe, and leads you to a trial without selling at you.\nBuilt in React with Three.js and GSAP — dark luxury that still reads cleanly. Bilingual (JA / EN).",
  },
  cw_status: { jp: "Project Status", en: "Project Status" },
  cw_status_done: { jp: "公開済み 本番稼働中", en: "Live · Public" },
  cw_status_domain: { jp: "JP / EN バイリンガル対応", en: "Bilingual (JA / EN)" },
  cw_status_launch: { jp: "改善を重ねている段階", en: "Iterating in production" },
  cw_role: { jp: "Role", en: "Role" },
  cw_live_url: { jp: "Live Site", en: "Live Site" },
  cw_value: {
    jp: "海外講師と通訳者が並ぶという強みを\n申し込みたくなる体験へ静かに翻訳した",
    en: "A signature teacher × interpreter pairing\nquietly translated into a path you want to take",
  },

  // Keychain
  kc_label: { jp: "School Project", en: "School Project" },
  kc_name: { jp: "Teacher Character Keychain Project", en: "Teacher Character Keychain Project" },
  kc_jp_title: {
    jp: "先生をモデルに キーホルダーをデザインする\nAI を相棒に進めた校内プロジェクト",
    en: "Keychain characters drawn from real teachers\nco-created with AI as a quiet collaborator",
  },
  kc_overview: {
    jp: "校内で 先生ごとのキャラクターキーホルダーをデザインするプロジェクトに参加している\n表情 仕草 空気感が伝わるように方向性と仕上がりを整えながら 一人ひとりの ぽさ を形にしている",
    en: "I work on a school project designing keychain characters based on real teachers.\nThe job is to read each person's mood, gesture, and warmth — then shape that into something you'd happily carry every day.",
  },
  kc_ai_label: { jp: "AI as a creative partner", en: "AI as a creative partner" },
  kc_ai_body: {
    jp: "AI は近道ではなく相棒として使っている\n案出し 表現の方向性 質感の検討 仕上がりの磨き込みまで 並走させながら進める",
    en: "AI isn't a shortcut here — it's a collaborator.\nI use it for ideation, character direction, texture study, and that final round of polish.",
  },
  kc_process: { jp: "Creative Process", en: "Creative Process" },
  kc_role: { jp: "Role", en: "Role" },
  kc_privacy: {
    jp: "先生の顔写真や実名は許可なく出さない\nこのページでも抽象化したサンプルとして扱っている",
    en: "No real faces or real names without consent.\nWhat you see here is held at an abstracted, sample level.",
  },

  // Leadership
  ld_label: { jp: "Leadership", en: "Leadership" },
  ld_name: { jp: "School Children's Program Event Director", en: "School Children's Program Event Director" },
  ld_jp_title: {
    jp: "学校主催の学童イベントで\n担当の先生から実行委員長を任された",
    en: "Asked by a teacher to take the lead\non a school-hosted children's programme",
  },
  ld_overview: {
    jp: "学校主催の学童イベントで 先生から直接任されて実行委員長として企画 準備 進行を見ている\n人と段取りを動かす役回りに 静かに責任を持って取り組んでいる",
    en: "A school-hosted children's programme — I was asked directly by a teacher to lead it.\nI hold the planning, the preparation, and the people side, and I keep the project moving forward.",
  },
  ld_role: { jp: "Role", en: "Role" },
  ld_statement: { jp: "Portfolio Statement", en: "Portfolio Statement" },
  ld_statement_body: {
    jp: "デザインや技術だけでなく\n責任を預けてもらえる側として動けたこと",
    en: "Beyond design or code\ntrusted with the kind of work that holds people together",
  },
  ld_appointment: { jp: "Appointment", en: "Appointment" },
  ld_appointment_body: {
    jp: "先生からの直接の任命は\n責任 連携 実行への信頼を意味する",
    en: "Being asked directly by a teacher\nmeans they trusted me with the room",
  },

  // Skills
  sk_label: { jp: "Skills", en: "Skills" },
  sk_title_a: { jp: "A working", en: "A working" },
  sk_title_b: { jp: "vocabulary", en: "vocabulary" },
  sk_title_c: { jp: "across AI, web, and design.", en: "across AI, web, and design." },
  sk_jp_title: {
    jp: "AI と Web デザイン 企画を\n横断して持っている実務の語彙",
    en: "A working vocabulary across\nAI, web, design, and direction",
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
    jp: "場を読み 必要なことを\nそのまま実行に変える",
    en: "Reading the room\nturning what's needed into what's done",
  },
  st_body: {
    jp: "場を見て 必要なことを考え 周りと並んで動かす\n学校でも AI を使った制作でも Web 制作でもイベントでも 伝わり方と改善 実行力を軸に進めている",
    en: "I read the room, see what's needed, and move things forward with the people in it.\nSchool projects, AI-assisted work, web builds, events — same instinct: clarity, iteration, and follow-through.",
  },
  strength_obs_t: { jp: "Observation", en: "Observation" },
  strength_obs_b: {
    jp: "人 空間 流れの小さな変化に気づき\nそれを判断につなげる",
    en: "Catching the small shifts in people, space, and flow\nbefore they become decisions",
  },
  strength_comm_t: { jp: "Communication", en: "Communication" },
  strength_comm_b: {
    jp: "違うタイプの人と並んで動きながら\n前向きな空気を保てる",
    en: "Different kinds of people, same project — I keep\nthe room warm without losing the goal",
  },
  strength_solve_t: { jp: "Problem Solving", en: "Problem Solving" },
  strength_solve_b: {
    jp: "うまくいかないときは原因から戻り\n現実的な打ち手を渡す",
    en: "When it stops working I go back to the cause\nand hand over something we can actually use",
  },
  strength_direction_t: { jp: "Creative Direction", en: "Creative Direction" },
  strength_direction_b: {
    jp: "見た目だけでなく 空気と伝わり方\n仕上がりの呼吸まで設計する",
    en: "Beyond the look — the mood, the message,\nand the breath the finish carries",
  },
  strength_exec_t: { jp: "Execution", en: "Execution" },
  strength_exec_b: {
    jp: "アイデアで止めず\nビジュアル サイト 資料 発表まで届ける",
    en: "Ideas don't stop at ideas\nthey become visuals, sites, decks, and rooms",
  },
  strength_adapt_t: { jp: "Adaptability", en: "Adaptability" },
  strength_adapt_b: {
    jp: "プロジェクト 相手 状況に合わせて\n動き方の方を変える",
    en: "I change the way I move\nto match what the project asks for",
  },

  // Education
  ed_label: { jp: "Education & Certifications", en: "Education & Certifications" },
  ed_title_a: { jp: "A quiet record of", en: "A quiet record of" },
  ed_title_b: { jp: "learning,", en: "learning," },
  ed_title_c: { jp: "proof, and", en: "proof, and" },
  ed_title_d: { jp: "practice.", en: "practice." },
  ed_jp_title: { jp: "学んだこと そしてその証明", en: "What I've learned, and the proof of it" },
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
    jp: "AI カメラと 実務水準の Web 制作\nそしてブランド体験のビジュアル設計",
    en: "AI camera systems, production-grade web work\nand the visual direction behind brand experience",
  },

  // Contact
  ct_label: { jp: "Contact", en: "Contact" },
  ct_title_a: { jp: "Let's create", en: "Let's create" },
  ct_title_b: { jp: "something meaningful.", en: "something meaningful." },
  ct_body: {
    jp: "インターン プロジェクト相談 Web 制作\nどんな話でも まずは一通お送りください",
    en: "Internships, projects, websites, or just a conversation —\nstart with a single line and we'll take it from there",
  },
  ct_send: { jp: "メールを送る", en: "Send a message" },
  ct_view: { jp: "作品を見る", en: "See the work" },

  // Footer
  ft_role: { jp: "AI Creative Developer Portfolio", en: "AI Creative Developer Portfolio" },
  ft_back: { jp: "Back to top", en: "Back to top" },
  ft_built: { jp: "Crafted in Japan · 2026", en: "Crafted in Japan · 2026" },
};

/* =========================================================================
   ADDITIONS — full bilingual coverage for every visible string
   ========================================================================= */

const additions: Dict = {
  // ─── AI CAMERA — value list ─────────────────────────────────────────────
  ai_value_li_1: {
    jp: "効果を勘ではなく数値で読める",
    en: "Measure performance — don't guess at it",
  },
  ai_value_li_2: {
    jp: "時間帯ごとの見られ方が分かる",
    en: "Attention shaped by hour of day",
  },
  ai_value_li_3: {
    jp: "通過 接近 操作 視認をそれぞれ分けて読む",
    en: "Passing, approach, operation, and gaze — each told apart",
  },
  ai_value_li_4: {
    jp: "施設や広告主に渡せるレポートまで",
    en: "Reports ready to hand to venues and advertisers",
  },
  ai_value_li_5: {
    jp: "プライバシー優先で組み立てた設計",
    en: "Privacy-first from the first line of code",
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
    jp: "日本語 タガログ語 英語をネイティブで使い分け",
    en: "Japanese, Tagalog, and English at a native level",
  },
  sk_lang_trilingual: {
    jp: "3 言語で接客 企画 発信ができる",
    en: "Three languages, used across cultures",
  },
  sk_lang_cultural: {
    jp: "相手に合わせて トーンを自然に変えられる",
    en: "Tone shifts to match who I'm speaking with",
  },
  sk_lang_messaging: {
    jp: "ブランドの言葉を 3 言語に運べる",
    en: "Brand voice carried into three languages",
  },
  sk_lang_summary: {
    jp: "日本語 タガログ語 英語を使い分け\n相手と場面に合わせて自然に話す",
    en: "Japanese, Tagalog, and English — used naturally,\nshifting register for the room I'm in",
  },

  // ─── Chat widget ────────────────────────────────────────────────────────
  chat_open: { jp: "話を聞く", en: "Ask AVENDANO" },
  chat_title: { jp: "Concierge", en: "Concierge" },
  chat_subtitle: {
    jp: "気になることを そのまま聞いてください",
    en: "Ask anything — I'll walk you through it",
  },
  chat_input_ph: {
    jp: "ここに入力",
    en: "Type here",
  },
  chat_send: { jp: "送信", en: "Send" },
  chat_close: { jp: "閉じる", en: "Close" },
  chat_thinking: { jp: "考えています", en: "Thinking" },
  chat_welcome: {
    jp: "AVENDANO のポートフォリオへ\n気になる作品やスキル 連絡方法 どれでも聞いてください",
    en: "Welcome to AVENDANO's portfolio.\nAsk about any project, any skill, or how to get in touch.",
  },
  chat_q_ai: { jp: "AI CAMERA について", en: "About AI CAMERA" },
  chat_q_tsc: { jp: "TSC English Academy について", en: "About TSC English Academy" },
  chat_q_hire: { jp: "インターン 案件相談", en: "Internship or a project" },
  chat_q_lang: { jp: "語学のこと", en: "About languages" },
};

Object.assign(t, additions);

export function tr(key: keyof typeof t, lang: Lang): string {
  return t[key]?.[lang] ?? String(key);
}
