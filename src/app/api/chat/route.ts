import { NextResponse } from "next/server";

export const runtime = "edge";

type Lang = "jp" | "en";
type Message = { role: "user" | "assistant"; content: string };

/* ---------------- Canned fallback intelligence ---------------- */

interface Intent {
  match: RegExp;
  jp: string;
  en: string;
}

const INTENTS: Intent[] = [
  {
    // AI CAMERA — analytics system (kept first; specific keywords only)
    match: /(ai\s*camera|kameranado|aiカメラ|広告効果|匿名分析|attention\s*analytics|距離ゾーン|dwell)/i,
    jp:
      "AI CAMERA は香水自販機のサイネージがどれだけ見られたかを匿名で読み解くシステム\n距離ゾーン 滞在 視認の可能性を可視化する 詳しく聞きたい部分はありますか",
    en:
      "AI CAMERA reads how much a vending-machine signage is actually seen — anonymously.\nDistance zones, dwell, viewing likelihood. What would you like to dig into?",
  },
  {
    // Digital signage triptych — 3 films played on-site
    match: /(signage|サイネージ|店頭|動画|three\s*films|triptych|香りを|まとう|red\s*edition|unisex|ユニセックス)/i,
    jp:
      "店頭で流すデジタルサイネージは 3 本構成\n01 『香りを まとう』15 秒の上質な合図 香りを身にまとう瞬間を切り取る\n02 RED Edition 赤を基調にした華やかな女性向けエディション\n03 Unisex Edition 中性的でモードな表現 新しい顧客層へ\nどの 1 本の話を聞きたいですか",
    en:
      "The on-site signage is a three-film triptych.\n01 'Wear the Scent' — fifteen quiet seconds of putting on a fragrance\n02 RED Edition — feminine, confident, led by red\n03 Unisex Edition — quieter and modern, opening the brand to new audiences\nWhich one would you like to hear more about?",
  },
  {
    // Fragrance vending machine — the project + the place + the brand world
    match: /(香水自動販売機|香水自販機|fragrance\s*spot|vending\s*machine|香水|fragrance|spot|自販機|ブランディング|高崎モントレー|monterey)/i,
    jp:
      "高崎モントレー 3F・4F に設置されている香水自販機 Fragrance Spot のブランディングを一貫して担当した\nキービジュアル POP SNS イベント導線 そして店頭サイネージ 3 本まで\n所有から体験へ という香りの新しい在り方を ひと押しで選べる時間として設計している\n制作プロセスと仕上がり どちらの話を聞きたいですか",
    en:
      "Fragrance Spot — the fragrance vending machine installed on the 3F and 4F of Takasaki Monterey.\nI directed the whole brand world end to end: key visual, POPs, social, on-site flow, and the three signage films.\nThe idea: fragrance moving from ownership into experience — a scent you choose with a single push.\nWant to hear about the process or the finish?",
  },
  {
    match: /(tsc|english|英語|オンライン|レッスン|授業)/i,
    jp:
      "TSC English Academyは「海外講師×日本人通訳者」のオンライン英語サービスのライブサイト案件です。React + Three.js + GSAPで構築し、現在公開中。サイトを実際に見たいですか?",
    en:
      "TSC English Academy is a live client project — an online English service pairing overseas teachers with Japanese interpreters. I built it in React + Three.js + GSAP. Want me to point you to the live site?",
  },
  {
    match: /(keychain|キーホルダー|キャラ|先生|学校)/i,
    jp:
      "学校内のキャラクターキーホルダー案件で、AIを案出しと方向性確認のパートナーとして使い、ビジュアル方向性とプリント用データまで担当しました。",
    en:
      "It's a school project — original keychain characters based on teachers. I used AI as a creative partner for ideation and direction, then refined and prepared print-ready files.",
  },
  {
    match: /(料金|価格|price|cost|hire|採用|内定|インターン|intern)/i,
    jp:
      "インターン・案件相談はメール(f24ba001@chuo.ac.jp)で受け付けています。気軽にどうぞ。",
    en:
      "I'm open to internship and project conversations — email f24ba001@chuo.ac.jp and we'll take it from there.",
  },
  {
    match: /(language|languages|trilingual|tagalog|タガログ|3言語|多言語|語学)/i,
    jp:
      "日本語・タガログ語・英語をネイティブレベルで使い分けます。相手と場面に合わせたトーンで自然に対応できます。",
    en:
      "I speak Japanese, Tagalog, and English at a native level — and shift register to match who I'm talking to.",
  },
  {
    match: /(skill|skills|スキル|できる|何ができる)/i,
    jp:
      "AI / Web / クリエイティブ / 企画 / 語学の5領域です。Skillsセクションに詳細をまとめています。気になる領域はありますか?",
    en:
      "Five areas — AI / Web / Creative / Direction / Languages. The Skills section has the breakdown. Anything you'd like to zoom in on?",
  },
  {
    match: /(contact|問い合わせ|相談|email|メール)/i,
    jp: "メールは f24ba001@chuo.ac.jp です。プロジェクト相談、インターン、Web制作いつでもどうぞ。",
    en: "Email me at f24ba001@chuo.ac.jp — project chats, internships, or website work, anytime.",
  },
  {
    match: /(hello|hi|hey|こんにちは|はじめまして|どうも)/i,
    jp: "こんにちは。AVENDANO SHINTAROのポートフォリオへようこそ。気になる作品やスキルがあれば、なんでも聞いてください。",
    en: "Hi — welcome to AVENDANO SHINTARO's portfolio. Ask about any project or skill and I'll walk you through it.",
  },
];

/**
 * Detect short affirmative / negative replies (はい / yes / うん / no / etc).
 * Returns 'yes', 'no', or null.
 */
function shortAnswer(t: string): "yes" | "no" | null {
  const s = t.trim().toLowerCase();
  if (s.length > 24) return null;
  if (/^(はい|うん|ええ|そう|そうです|もちろん|お願い(します)?|ぜひ|見たい|見せて|教えて|知りたい|聞きたい|yes|y|yeah|yep|sure|please|ok|okay|go ahead|tell me|let me see|i'd like to|i would)/i.test(s)) {
    return "yes";
  }
  if (/^(いいえ|いえ|違う|大丈夫|結構|no|nope|nah|not really|skip)/i.test(s)) {
    return "no";
  }
  return null;
}

/**
 * Context-aware follow-up: when the user replies "yes/no" to a previous
 * assistant question, surface the intended next step instead of falling
 * back to a generic prompt.
 */
function contextualReply(
  prevAssistant: string,
  answer: "yes" | "no",
  lang: Lang
): string | null {
  const p = prevAssistant;

  // TSC — "サイトを実際に見たい / point you to the live site"
  if (/サイトを実際に見たい|point you to the live site|live site/i.test(p)) {
    if (answer === "yes")
      return lang === "jp"
        ? "ライブはこちら https://xx0019v.github.io/TSC/\n海外講師×通訳者の体制 コース 料金 申込までひと続きで見られます"
        : "Here it is — https://xx0019v.github.io/TSC/\nYou'll see the teacher × interpreter pairing, the courses, pricing, and the path to a trial, all in one flow.";
    return lang === "jp"
      ? "了解です\n他に気になる案件はありますか AI CAMERA や 香水自販機 デジタルサイネージなど"
      : "Got it.\nAnything else you'd like to explore — AI CAMERA, the fragrance vending machine, or the digital signage?";
  }

  // Fragrance Spot — "プロセスと仕上がり どちら / process or the finish"
  if (/プロセスと仕上がり|process or the finish/i.test(p)) {
    if (answer === "yes")
      return lang === "jp"
        ? "では制作プロセスから\n店舗側と『ひと押しで香りを体験できる時間』というコンセプトを共有して キービジュアル POP SNS 店頭サイネージまで一気通貫で設計した\nどの工程を掘りますか"
        : "Let's start with the process.\nWe aligned with the venue on a single idea — 'a fragrance you choose with one push' — then built every touchpoint from there: visuals, social, and the on-site films.\nWhich step would you like to go deeper on?";
    return lang === "jp"
      ? "了解です\n仕上がりの方を見るなら キービジュアル POP デジタルサイネージ どれが気になりますか"
      : "Got it.\nIf it's the finish, would you like to see the key visual, the POPs, or the digital signage triptych?";
  }

  // Digital signage — "どの 1 本 / which one"
  if (/どの 1 本|どの一本|which one/i.test(p)) {
    if (answer === "yes")
      return lang === "jp"
        ? "迷ったらまず『香りを まとう』からおすすめします\n15秒で香りを身にまとう瞬間を切り取った 静かなのに記憶に残る1本です"
        : "If you're unsure, start with 'Wear the Scent.'\nFifteen seconds, one quiet gesture — a fragrance being put on. Small in scale, lingering in memory.";
    return lang === "jp"
      ? "了解です\nまた気になる時にどうぞ"
      : "Understood — come back to it whenever you'd like.";
  }

  // AI CAMERA — "詳しく聞きたい部分 / dig into"
  if (/詳しく聞きたい部分|dig into/i.test(p)) {
    if (answer === "yes")
      return lang === "jp"
        ? "では距離ゾーンの話から\n操作 接近 視認 通過の4つに分けて AIカメラが視認の可能性を判定する\n個人特定はしない設計です"
        : "Let's start with the distance zones.\nFour zones — operation, approach, view, passing — and the AI camera estimates which one a person is in.\nNo identification, ever.";
    return lang === "jp"
      ? "了解です\n他のプロジェクトも気になればどうぞ"
      : "Understood — happy to walk you through another project whenever you want.";
  }

  return null;
}

function fallback(text: string, lang: Lang, messages: Message[] = []): string {
  const t = text.trim();

  // 1) Context-aware: detect short yes/no after a question
  const ans = shortAnswer(t);
  if (ans) {
    const prevAssistant = [...messages]
      .reverse()
      .find((m) => m.role === "assistant")?.content ?? "";
    const ctx = contextualReply(prevAssistant, ans, lang);
    if (ctx) return ctx;
  }

  // 2) Intent matching against current user text
  for (const intent of INTENTS) {
    if (intent.match.test(t)) return lang === "jp" ? intent.jp : intent.en;
  }

  // 3) Generic fallback (friendlier than before)
  return lang === "jp"
    ? "もう少し詳しく聞かせてください\n気になるプロジェクト 例えば AI CAMERA や 香水自販機 デジタルサイネージ TSC English Academy など 自由に投げてください"
    : "Tell me a little more.\nAny project — AI CAMERA, the fragrance vending machine, the digital signage, or TSC English Academy — just drop the name.";
}

/* ---------------- POST handler ---------------- */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: Message[] = Array.isArray(body?.messages) ? body.messages : [];
    const lang: Lang = body?.lang === "en" ? "en" : "jp";
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const userText = lastUser?.content ?? "";

    // If an Anthropic key is provided, defer to it (kept simple — fire-and-forget).
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (apiKey) {
      try {
        const system =
          lang === "jp"
            ? "あなたはAVENDANO SHINTAROのポートフォリオサイト上で動く案内AIです。落ち着いた、洗練された、短い日本語で答えてください。1〜2文を目安に。AVENDANO自身として一人称で答えても構いません。"
            : "You are the on-site concierge AI for AVENDANO SHINTARO's portfolio. Reply in calm, refined, brief English — one or two sentences. You may speak in first person as AVENDANO.";
        const r = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-opus-4-1",
            max_tokens: 200,
            system,
            messages: messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });
        if (r.ok) {
          const json = await r.json();
          const text =
            json?.content?.[0]?.text?.toString() ?? fallback(userText, lang, messages);
          return NextResponse.json({ reply: text });
        }
      } catch {
        /* fall through to canned */
      }
    }

    return NextResponse.json({ reply: fallback(userText, lang, messages) });
  } catch {
    return NextResponse.json(
      { reply: "Something went wrong. Please try again." },
      { status: 200 }
    );
  }
}
