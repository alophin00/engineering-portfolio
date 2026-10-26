# Alexander Thompson — Engineering Portfolio

Next.js 15 · TypeScript · Tailwind CSS v4 · Motion · React Three Fiber + Drei · Lucide

## Run it locally

Requires Node.js 18.18+ (20 or 22 recommended).

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # TypeScript check
npm run build      # production build — run this before deploying
npm start          # serve the production build
```

## Deploy (Vercel — free, about 5 minutes)

1. Push this folder to a GitHub repository.
2. Go to vercel.com → **Add New → Project** → import the repo. Vercel detects Next.js automatically.
3. Under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL` = your final URL (e.g. `https://alexthompson.dev`). This is used for SEO metadata and the sitemap.
4. Deploy. Every push to `main` redeploys.

Netlify and Cloudflare Pages also work with their Next.js presets.

## Updating the site

All content lives in `/data`. You should rarely need to touch `/components`.

| What | Where |
| --- | --- |
| Name, intro, education, contact links, resume | `data/site.ts` |
| Projects and case studies | `data/projects.ts` |
| Skills | `data/skills.ts` |
| Experience & leadership | `data/experience.ts` |
| Concept exploded-view parts | `data/assembly.ts` |
| Images & videos | `public/projects/<slug>/` |
| CAD models (GLB/GLTF) | `public/models/` |
| Resume PDF | `public/resume.pdf` |

### Contact links
In `data/site.ts`, replace `null` with your values:
```ts
contact: { email: "you@example.com", linkedin: "https://www.linkedin.com/in/you", github: "https://github.com/you" },
```
Anything left `null` shows a dashed "to add" chip — never a broken link.

### Resume
Save your PDF as `public/resume.pdf`, then set `resume: { url: "/resume.pdf", updated: "Jan 2027" }`. The download button appears automatically.

### Hide placeholders before sending to recruiters
Set `showPlaceholders: false` in `data/site.ts`. Every placeholder block, "to add" chip and empty gallery slot disappears; real content stays.

### Add a project
Copy one of the project objects in `data/projects.ts`, give it a new `slug` and `code`, and add it to the `projects` array. Its page at `/projects/<slug>` is generated automatically, and it appears in the projects list, the status matrix and the sitemap.

Key fields:
- `status` — the badge on cards (`tone`: `"active" | "concept" | "template" | "complete"`)
- `stages` — one entry per stage: `"complete" | "in-progress" | "planned" | "not-started" | "n/a"`
- `sections` — the 8 case-study sections, each with its own `status` and a list of `blocks`
- `cover` — optional photo path; without it, a built-in technical illustration is used (`art`)

### Case-study blocks
Mix these in any section's `blocks` array:

| Block | Use for |
| --- | --- |
| `{ type: "heading", text }` | Sub-heading |
| `{ type: "text", body }` | A paragraph |
| `{ type: "list", title?, items }` | Bulleted points |
| `{ type: "callout", tone, title, body }` | `info`, `proposed`, `warning`, `complete` |
| `{ type: "table", caption?, columns, rows }` | Comparisons |
| `{ type: "requirements", items }` | R1, R2… with priority and verification |
| `{ type: "results", items: [{ measure, method, value? }] }` | Testing data — leave `value` empty until measured |
| `{ type: "gallery", items: [{ kind, src?, caption }] }` | Photos and videos; no `src` = placeholder |
| `{ type: "code", language, filename?, code }` | Source code with copy button |
| `{ type: "placeholder", label, hint }` | Content to come |
| `{ type: "widget", widget }` | `exploded-view`, `model-viewer`, `circuit-diagram`, `signal-flow` |

### Add photos, wiring diagrams or videos
1. Put the file in `public/projects/<slug>/`, e.g. `public/projects/pico-rgb/breadboard.jpg`.
2. In the gallery item, add `src: "/projects/pico-rgb/breadboard.jpg"` (and `alt` for images).
3. Videos: use `.mp4` (H.264) and keep them short; add `poster` for a preview frame.

### Add your CAD model
1. Export from SolidWorks as GLTF/GLB (or export STEP, open in Blender, and export GLB). Aim for under ~10 MB.
2. Save it as `public/models/nasal-device.glb`.
3. On the project, set:
   ```ts
   model: {
     src: "/models/nasal-device.glb",
     annotations: [
       { id: "shell", label: "Outer shell", description: "PETG print, rev A", position: [0, 0.9, 0] },
     ],
   },
   ```
   The viewer supports rotate, zoom, reset and clickable annotations. Find annotation positions by trial — they use the model's own coordinates.

The exploded view in the nasal case study is intentionally labeled conceptual. Once your real model exists, you can remove the `exploded-view` widget or keep it alongside as a concept diagram.

### Skills
Each skill has `level: "hands-on" | "learning" | "interest"`. Move SolidWorks to `"hands-on"` once you've used it in a finished part.

## Project structure

```
app/                 routes: /, /projects, /projects/[slug], /about, /resume, sitemap, robots
components/
  home/              hero
  projects/          featured rows, visuals, timeline, status matrix
  case/              case-study renderer, circuit diagram, signal flow, code, gallery
  three/             3D: concept assembly, hero scene, exploded view, GLB viewer (client-only, code-split)
  sections/          skills, experience, contact, resume card
  ui/                status glyphs, placeholders, headings
data/                ← all editable content
lib/types.ts         content types
public/              images, models, resume
```

## Accessibility & performance notes
- Respects the OS "reduce motion" setting (Motion via `MotionConfig`, 3D auto-rotate and damping disabled).
- 3D views are lazy-loaded client-side, so three.js never blocks first paint, and have WebGL fallbacks.
- Every 3D interaction has a keyboard-accessible equivalent (part list buttons, labeled slider).
- Skip link, visible focus states, semantic tables with captions, labeled navigation landmarks.
