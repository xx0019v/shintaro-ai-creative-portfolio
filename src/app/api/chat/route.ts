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
    match: /(ai\s*camera|kameranado|カメラ|分析|サイネージ|広告効果)/i,
    jp:
      "AI CAMERAは香水自販機のサイネージがどれだけ見られたかをAIカメラで匿名分析するシステムです。距離ゾーン、滞在、注視を可視化します。詳しく聞きたい部分はありますか?",
    en:
      "AI CAMERA is the analytics system I built — it estimates how much a vending-machine signage is actually seen, anonymously. Distance zones, dwell, viewing likelihood. What would you like to dig into?",
  },
  {
    match: /(fragrance|香水|spot|自販機|ブランディング)/i,
    jp:
      "Fragrance Spotは香水自販機のブランディング案件で、キービジュアル・POP・SNS・3本のサイネージ動画まで一貫してディレクションしました。気になるのは制作プロセス、それとも仕上がりですか?",
    en:
      "Fragrance Spot is a fragrance-vending-machine brand I directed end-to-end — key visual, POPs, social, three signage films. Want to hear about the process or the deliverables?",
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

function fallback(text: string, lang: Lang): string {
  const t = text.trim();
  for (const intent of INTENTS) {
    if (intent.match.test(t)) return lang === "jp" ? intent.jp : intent.en;
  }
  return lang === "jp"
    ? "もう少し具体的に教えてください。プロジェクト名、スキル、または問い合わせ方法など、お聞きしたいことを教えてください。"
    : "Tell me a little more — a project name, a skill, or how you'd like to get in touch. I'll take it from there.";
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
            json?.content?.[0]?.text?.toString() ?? fallback(userText, lang);
          return NextResponse.json({ reply: text });
        }
      } catch {
        /* fall through to canned */
      }
    }

    return NextResponse.json({ reply: fallback(userText, lang) });
  } catch {
    return NextResponse.json(
      { reply: "Something went wrong. Please try again." },
      { status: 200 }
    );
  }
}
