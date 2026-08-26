# Shintaro Creative Technology Portfolio

Avendaño Shintaroの制作ポートフォリオです。AI、Web、ビジュアルディレクションを横断した4つのプロジェクトを、結果だけでなく課題・判断・実装まで読めるケーススタディとしてまとめています。

## Design direction

コンセプトは「ICTスタジオの制作ノート」。温かい紙色、罫線、実寸感のある図版、コバルトブルーの注記で、学生らしい未完成さではなく、考えて手を動かす制作者の現場感を表現しています。

- 作品にすぐ到達できる、強制演出のない構成
- 日本語／英語の全文切り替え
- AI Camera、Fragrance Spot、TSC、Character Keychainの4事例
- キーボード操作、フォーカス表示、`prefers-reduced-motion`対応
- モバイルからワイド画面までのレスポンシブ設計
- 静的生成による高速な配信

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- CSS + Tailwind CSS 3
- Next.js Image / Font / Metadata APIs

## Local development

```bash
npm install
npm run dev
```

`http://localhost:3000` を開いてください。

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
```

## Structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── opengraph-image.tsx
│   └── page.tsx
├── components/portfolio/PortfolioHome.tsx
└── context/LanguageContext.tsx
```

## Deployment

環境変数は不要です。GitHubリポジトリをVercelに読み込むと、そのままデプロイできます。

© 2026 Avendaño Shintaro. All rights reserved.
