# Graph Report - shintaro-ai-creative-portfolio  (2026-08-23)

## Corpus Check
- 69 files · ~2,487,448 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 330 nodes · 584 edges · 25 communities (19 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8a83b487`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LanguageContext.tsx
- layout.tsx
- useLang
- compilerOptions
- Contact.tsx
- devDependencies
- AIKameranado.tsx
- dependencies
- Shintaro AI Creative Portfolio
- route.ts
- onScroll
- Header.tsx
- opengraph-image.tsx
- Avatar 3D model — drop-in slot
- LightningFX.tsx
- LiquidGlass.tsx
- SectionIndex.tsx
- ShaderBackdrop.tsx
- next.config.mjs
- tailwind.config.ts

## God Nodes (most connected - your core abstractions)
1. `useLang()` - 43 edges
2. `tr()` - 41 edges
3. `compilerOptions` - 17 edges
4. `Reveal()` - 12 edges
5. `SectionHeader()` - 12 edges
6. `Shintaro AI Creative Portfolio` - 12 edges
7. `useLaunch()` - 9 edges
8. `onScroll()` - 8 edges
9. `t` - 8 edges
10. `Parallax()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Hero()` --calls--> `useLaunch()`  [EXTRACTED]
  src/components/sections/Hero.tsx → src/context/LaunchContext.tsx
- `AtelierFrame()` --calls--> `useLaunch()`  [EXTRACTED]
  src/components/ui/AtelierFrame.tsx → src/context/LaunchContext.tsx
- `EntrySphere()` --calls--> `useLaunch()`  [EXTRACTED]
  src/components/ui/EntrySphere.tsx → src/context/LaunchContext.tsx
- `FilmScrub()` --calls--> `onScroll()`  [EXTRACTED]
  src/components/ui/FilmScrub.tsx → src/lib/scrollBus.ts
- `FilmStage()` --calls--> `onScroll()`  [EXTRACTED]
  src/components/ui/FilmStage.tsx → src/lib/scrollBus.ts

## Import Cycles
- None detected.

## Communities (25 total, 6 thin omitted)

### Community 0 - "LanguageContext.tsx"
Cohesion: 0.10
Nodes (29): PRINCIPLES, SECTIONS, CATEGORIES, POP_TAGS, PROCESS, ROLES, ROLE, STRENGTHS (+21 more)

### Community 1 - "layout.tsx"
Cohesion: 0.06
Nodes (34): cormorant, dmSerif, inter, metadata, notoSansJP, notoSerifJP, playfair, shippori (+26 more)

### Community 2 - "useLang"
Cohesion: 0.13
Nodes (28): ChatWidget(), EASE, Msg, QUICK_KEYS, Role, About(), Meta(), AIKameranado() (+20 more)

### Community 3 - "compilerOptions"
Cohesion: 0.07
Nodes (27): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+19 more)

### Community 4 - "Contact.tsx"
Cohesion: 0.10
Nodes (10): EASE, MagneticButton(), Props, ModelFallback(), Model3DScene, SceneBoundary, PortraitFrame(), Props (+2 more)

### Community 5 - "devDependencies"
Cohesion: 0.08
Nodes (23): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/node, @types/react, @types/react-dom (+15 more)

### Community 6 - "AIKameranado.tsx"
Cohesion: 0.10
Nodes (15): ANALYZES, FLOW, KEYWORDS, PRIVACY, ZONES, EditorialFrame(), Props, ratioClass (+7 more)

### Community 7 - "dependencies"
Cohesion: 0.10
Nodes (21): framer-motion, lucide-react, dependencies, framer-motion, liquid-glass-js, lucide-react, next, react (+13 more)

### Community 8 - "Shintaro AI Creative Portfolio"
Cohesion: 0.14
Nodes (13): Deployment, Design System, Features, Folder Structure, Future Improvements, How to Run Locally, License, Main Projects (+5 more)

### Community 9 - "route.ts"
Cohesion: 0.27
Nodes (9): contextualReply(), fallback(), Intent, INTENTS, Lang, Message, POST(), runtime (+1 more)

### Community 10 - "onScroll"
Cohesion: 0.31
Nodes (7): CHUNKS, FilmBackdrop(), FilmStage(), Listener, listeners, loop(), onScroll()

### Community 11 - "Header.tsx"
Cohesion: 0.39
Nodes (6): ACTIVE_GROUPS, NAV, LangButton(), LanguageToggle(), MagneticLink(), useMagneticText()

### Community 12 - "opengraph-image.tsx"
Cohesion: 0.33
Nodes (4): alt, contentType, runtime, size

### Community 13 - "Avatar 3D model — drop-in slot"
Cohesion: 0.40
Nodes (4): Avatar 3D model — drop-in slot, Export spec (from Tripo3D / Meshy / Rodin, etc.), How rendering is decided (Mode A / B / C), Optional overrides

## Knowledge Gaps
- **141 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+136 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useLang()` connect `useLang` to `LanguageContext.tsx`, `layout.tsx`, `Contact.tsx`, `AIKameranado.tsx`, `Header.tsx`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `tr()` connect `useLang` to `LanguageContext.tsx`, `layout.tsx`, `Contact.tsx`, `AIKameranado.tsx`, `Header.tsx`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `PortraitFrame()` connect `Contact.tsx` to `LanguageContext.tsx`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _141 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LanguageContext.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10283687943262411 - nodes in this community are weakly interconnected._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.058279370952821465 - nodes in this community are weakly interconnected._
- **Should `useLang` be split into smaller, more focused modules?**
  _Cohesion score 0.12773109243697478 - nodes in this community are weakly interconnected._