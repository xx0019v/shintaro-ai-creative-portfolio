# Shintaro AI Creative Portfolio

> *Turning Ideas into Systems, Visuals, and Experiences.*

The official portfolio website of **Avendano Shintaro** — AI Creative Developer, Visual Designer, ICT Design student at Chuo Information College.

A single-page **Luxury Monochrome Editorial** portfolio — Black × Silver × White — built with Next.js + TypeScript + Tailwind CSS + Framer Motion.

---

## Overview

- One-page, anchor-linked editorial layout
- **JP-default with JP/EN toggle** — English headings preserved in JP mode for international tone, full English copy in EN mode
- Fully responsive (mobile-first, desktop-refined)
- SEO + dynamic OG image
- Curated assets — every project shows 1 hero visual + 2–4 supporting only
- Color-heavy fragrance assets wrapped in monochrome editorial frames
- Portrait integration: silver-edged frames in Hero, About, and Contact

---

## Features

- Luxury Monochrome design — inspired by Apple, Awwwards, VOGUE, Harper's BAZAAR
- **AI CAMERA** featured case study with silver dashboard, distance-zone diagram, data-flow visualization, and real exhibition panel photography
- Fragrance Vending Machine Branding — Fragrance Spot key visual + POP + installation + SNS carousel
- Online English Service Website — pre-launch client case study
- Teacher Character Keychain Project — AI-assisted character design (privacy-safe abstract gallery)
- School Children's Program Event Director — leadership case study
- Skills (AI · Web · Creative · Planning), Strengths (6 cards), Education & Certifications timeline
- Refined contact section with portrait signature

---

## Tech Stack

| Layer       | Technology                                                |
| ----------- | --------------------------------------------------------- |
| Framework   | Next.js 14 (App Router)                                   |
| Language    | TypeScript                                                |
| Styling     | Tailwind CSS                                              |
| Animation   | Framer Motion                                             |
| Icons       | lucide-react                                              |
| Fonts       | Playfair Display, Cormorant Garamond, DM Serif Display, Inter, Noto Sans JP, Noto Serif JP, Shippori Mincho |
| Deployment  | Vercel (recommended)                                      |

---

## Main Sections

1. Header (sticky · scroll-blur · JP/EN toggle)
2. Hero — editorial typography + portrait silhouette
3. About — principles (Observation · Persistence · Adaptability · Execution) + editorial portrait
4. **Featured Project — AI CAMERA**
5. Creative Work — Fragrance Vending Machine Branding
6. Client Work — Online English Service Website
7. School Project — Teacher Character Keychain Project
8. Leadership — School Children's Program Event Director
9. Skills
10. Strengths
11. Education & Certifications
12. Contact (with portrait signature)
13. Footer

---

## Main Projects

1. **AI CAMERA** — AI camera analytics for fragrance vending machine signage
2. **Fragrance Vending Machine Branding** — POP, SNS, installation, visual direction
3. **Online English Service Website** — corporate website, pre-launch
4. **Teacher Character Keychain Project** — AI-assisted character design
5. **School Children's Program Event** — appointed Executive Director

---

## How to Run Locally

```bash
npm install
npm run dev
# → http://localhost:3000

npm run build && npm run start
```

---

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub.
2. Visit [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Next.js**. No env vars required.
4. Click **Deploy**.

---

## Folder Structure

```
shintaro-portfolio-luxury/
├── public/
│   └── images/
│       ├── portrait/         ← drop the 4 character images here
│       ├── ai-camera/        ← AI CAMERA / Shitara exhibition panels
│       ├── fragrance/        ← Fragrance Spot key visual + POPs
│       ├── client-english/   ← reserved for English service screenshots
│       ├── keychain/         ← reserved for refined keychain visuals
│       ├── leadership/       ← reserved for event materials
│       └── personal/         ← personal editorial Instagram visuals
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx        ← fonts, metadata, LanguageProvider
│   │   ├── opengraph-image.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── sections/         ← Hero, About, AIKameranado, …, Footer
│   │   └── ui/               ← Reveal, SectionHeader, SilverRule, EditorialFrame, PortraitFrame, LanguageToggle
│   ├── context/
│   │   └── LanguageContext.tsx
│   └── lib/
│       ├── motion.ts
│       └── translations.ts   ← full JP/EN dictionary
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Design System

| Token              | Value      | Use                              |
| ------------------ | ---------- | -------------------------------- |
| `base`             | `#050505`  | Primary background (deep black)  |
| `soft`             | `#111111`  | Section alternates               |
| `charcoal`         | `#1A1A1A`  | Surface tone                     |
| `silver`           | `#C0C0C0`  | Accent lines, hovers             |
| `silver-bright`    | `#E5E5E5`  | Highlights, metallic text        |
| `silver-muted`     | `#8E8E8E`  | Secondary text, captions         |
| `offwhite`         | `#F5F5F5`  | Body text, headings              |

Typography:
- **Display / Serif:** Playfair Display, Cormorant Garamond, DM Serif Display
- **Body Sans:** Inter
- **JP Serif:** Noto Serif JP, Shippori Mincho
- **JP Sans:** Noto Sans JP

---

## Future Improvements

- Real teacher keychain visuals (approved + curated)
- Real Online English website screenshots after launch
- Lazy-loaded video reel from fragrance digital signage
- Downloadable PDF résumé
- Blog / journal section
- View-transition page animations

---

## License

© 2026 Avendano Shintaro. All rights reserved.
