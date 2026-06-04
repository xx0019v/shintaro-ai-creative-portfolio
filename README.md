# Shintaro AI Creative Portfolio

> *Turning Ideas into Systems, Visuals, and Experiences.*

The official portfolio website of **Shintaro Avendano** — AI Creative Developer, Visual Designer, and ICT Design student at Chuo Information College.
A single-page luxury editorial site showcasing AI camera analytics, web production, branding, visual design, school leadership, AI-assisted creative production, and client website work.

---

## Overview

This repository contains the source code for a production-grade portfolio website built with **Next.js + TypeScript + Tailwind CSS + Framer Motion**.
The site is designed for internships, company interviews, school presentations, and public release — communicating a young creative developer who can design, build, and move real projects forward.

- One-page, anchor-linked editorial layout
- Fully responsive (mobile-first, desktop-refined)
- Bilingual (English-primary + Japanese sub-copy)
- SEO-ready metadata + dynamic OG image
- Accessibility-aware (reduced-motion, semantic landmarks, hairline contrast)
- Image-swap-ready component structure

---

## Features

- **Luxury Tech Editorial design** — inspired by Apple, Awwwards, VOGUE, Harper's BAZAAR, and high-fashion campaign sites (mood/spacing/structure only — no brand marks used)
- **AIKameranado** featured case study with custom analytics dashboard, distance-zone diagram, and data-flow visualization
- **Fragrance Vending Machine Branding** — POP design + SNS campaign case studies
- **Online English Service Website** — client work showcase with browser mockup
- **Teacher Character Keychain Project** — AI-assisted character design workflow
- **School Children's Program Event Director** — leadership experience
- Skills, Strengths, Education & Certifications, and Contact sections
- Subtle Framer Motion reveals; respects `prefers-reduced-motion`
- Dynamic Open Graph image generated at the edge

---

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | Next.js 14 (App Router)             |
| Language    | TypeScript                          |
| Styling     | Tailwind CSS                        |
| Animation   | Framer Motion                       |
| Icons       | lucide-react                        |
| Fonts       | Google Fonts (Playfair Display, Cormorant Garamond, DM Serif Display, Inter, Noto Sans JP, Noto Serif JP, Shippori Mincho) |
| Deployment  | Vercel (recommended) / Netlify / GitHub Pages (static export) |

---

## Main Sections

1. Header (sticky, scroll-blur)
2. Hero — name, headline, tagline, CTA
3. About — principles (Observation · Persistence · Adaptability · Execution)
4. **Featured Project — AIKameranado** (AI camera analytics)
5. Creative Work — Fragrance Vending Machine Branding
6. Client Work — Online English Service Website
7. School Project — Teacher Character Keychain Project
8. Leadership — School Children's Program Event Director
9. Skills (AI · Web · Creative · Planning)
10. Strengths (6 cards)
11. Education & Certifications
12. Contact
13. Footer

---

## Projects Featured

1. **AIKameranado** — AI camera analytics for fragrance vending machine signage (Raspberry Pi · Edge AI · Rust · DuckDB · privacy-first)
2. **Fragrance Vending Machine Branding** — POP design, SNS contest campaign, visual direction
3. **Online English Service Website** — corporate website production, pre-launch
4. **Teacher Character Keychain Project** — AI-assisted character design
5. **School Children's Program Event** — appointed Executive Director

---

## How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
# → http://localhost:3000
```

### Build & start production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Deployment Guide

### Vercel (recommended)

1. Push this repository to GitHub.
2. Visit [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Next.js**. No environment variables required.
4. Click **Deploy** — done.

### Netlify

1. Connect the GitHub repo on Netlify.
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Use the official `@netlify/plugin-nextjs` adapter.

### Custom domain

After deploy, attach a custom domain in the Vercel/Netlify dashboard and update `SITE_URL` inside `src/app/layout.tsx` if you change the canonical host.

---

## Folder Structure

```
shintaro-ai-creative-portfolio/
├── public/
│   └── images/                       ← drop real project images here (jpg/webp/avif)
├── src/
│   ├── app/
│   │   ├── globals.css               ← design tokens, grain, gold rules
│   │   ├── layout.tsx                ← fonts, metadata, OGP
│   │   ├── opengraph-image.tsx       ← dynamic 1200×630 OG image
│   │   └── page.tsx                  ← section composition
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── AIKameranado.tsx      ← featured case study
│   │   │   ├── FragranceBranding.tsx
│   │   │   ├── ClientWork.tsx        ← online English website
│   │   │   ├── KeychainProject.tsx
│   │   │   ├── Leadership.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Strengths.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── GoldRule.tsx
│   │       ├── Placeholder.tsx       ← editorial image placeholder
│   │       ├── Reveal.tsx            ← framer-motion in-view reveal
│   │       └── SectionHeader.tsx
│   └── lib/
│       └── motion.ts                 ← shared easing + variants
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts                ← design tokens (champagne · ivory · base)
├── tsconfig.json
└── README.md
```

### Replacing placeholders with real images

All mockups in the site are rendered with CSS/SVG so the design works out of the box.
To swap in real project assets:

1. Drop your file into `public/images/` — e.g. `ai-dashboard-mockup.jpg`, `fragrance-branding.jpg`, `online-english-website.jpg`, `keychain-project.jpg`, `event-direction.jpg`.
2. Open the relevant section component and replace the mock JSX with `<Image src="/images/your-file.jpg" alt="…" width={…} height={…} />` (use `next/image`).
3. Keep `alt` text meaningful — the components are already accessibility-aware.

---

## Design System

| Token              | Value      | Use                                |
| ------------------ | ---------- | ---------------------------------- |
| `bg.base`          | `#0B0B0B`  | Primary background (deep black)    |
| `bg.subbase`       | `#141414`  | Section alternates                 |
| `ivory`            | `#F5F1EA`  | Body text, headings                |
| `champagne`        | `#C8A96A`  | Gold accent, hover, lines          |
| `muted`            | `#A8A29A`  | Secondary text, captions           |
| `softwhite`        | `#F7F4EF`  | Bright surfaces                    |
| `fragrance.pink`   | `#E8C9C2`  | Fragrance section accent only      |
| `fragrance.beige`  | `#D8C4A8`  |                                    |
| `fragrance.lavender` | `#C6BFD0` |                                   |

Typography:
- **Display / Serif:** Playfair Display, Cormorant Garamond, DM Serif Display
- **Body Sans:** Inter
- **JP Serif:** Noto Serif JP, Shippori Mincho
- **JP Sans:** Noto Sans JP

---

## Future Improvements

- Add real project screenshots and case-study photography
- Downloadable PDF résumé
- Japanese / English language toggle (full i18n via `next-intl`)
- Blog / journal section for project notes and process writing
- Contact form with serverless email (Resend, Vercel Email)
- View-transition page animations
- Lighthouse / accessibility automated CI checks

---

## License

© 2026 Shintaro Avendano. All rights reserved.
Source code released for portfolio / educational reference. Brand mood and visual references belong to their respective owners — no trademarks reproduced.
