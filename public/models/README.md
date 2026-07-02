# Avatar 3D model — drop-in slot

Place the finished **`avatar.glb`** in this folder:

```
public/models/avatar.glb
```

The site auto-detects it. If the file is present (HTTP 200) and the device is
capable, Hero shows the black-silver 3D avatar. If it's missing, corrupt, on a
touch/mobile device, or the visitor prefers reduced motion, the site quietly
falls back to the current 2.5D portrait — no error, no layout shift.

## Export spec (from Tripo3D / Meshy / Rodin, etc.)

- **Format:** `.glb` (binary glТF, textures embedded)
- **Textures:** 2K (avoid 4K — too heavy for web)
- **Target size:** ≤ 10–20 MB (use Draco/mesh compression if offered)
- **Poly count:** reduced / "lightweight mesh" / "smart mesh" if offered
- **Up axis:** Y-up (glTF standard). The scene is auto-centered + auto-scaled,
  so exact scale/origin don't matter — it's framed to a consistent height.
- **Filename:** exactly `avatar.glb`

## Optional overrides

Two more slots the code will use if present (otherwise ignored):

- `avatar-poster.jpg` — a still used as the loading poster / fallback (defaults
  to the existing Hero headshot).

## How rendering is decided (Mode A / B / C)

- **Mode C — Full 3D:** used automatically when `avatar.glb` loads on a capable
  desktop. Slow breathing rotation, silver rim light, cursor parallax.
- **Mode A — 2.5D Portrait:** the fallback (no model / mobile / reduced-motion /
  load error). This is what shows today.
- **Mode B — Liquid Metal:** if the model's face quality is weak, apply a
  chrome/monochrome material treatment instead of realistic skin (set
  `LIQUID_METAL = true` in `src/components/ui/ModelViewer.tsx`). Hides facial
  roughness while staying on-brand.

Nothing else needs changing — drop the file, redeploy, done.
