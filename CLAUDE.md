@AGENTS.md

# CLAUDE.md

Project instructions for Claude Code. Read this file in full before touching any file in this repository. Everything here is binding unless the user overrides it in the conversation. Where an installed skill disagrees with this file, see §3.4.

---

## 1. Aim

Redesign an existing simple website — currently a video background with buttons linking to services — into a **futuristic, scroll-driven, multi-page marketing site** that feels engineered rather than templated.

The site must communicate that this is an **International Award-Winning Company**, and it must feel fast, deliberate, and premium. Motion is a core part of the experience, not decoration bolted on at the end.

**Success looks like:** a visitor lands, the video and headline establish credibility within two seconds, and every scroll reveals something that earns the scroll.

---

## 2. The workflow rule (most important rule in this file)

**Build one page. Stop. Wait for approval. Only then start the next page.**

Page order:

1. **Home** ← start here
2. About
3. Services
4. Team
5. Projects

Rules:

- Do **not** scaffold, stub, draft, or "quickly sketch" any page beyond the current one. Not even placeholder files.
- Shared infrastructure (nav, footer, design tokens, animation utilities) may be built during the Home page phase, because Home needs it. Nothing page-specific for later pages.
- Nav links to unbuilt pages should exist but point to a placeholder route or `#`. Do not build those destinations.
- When the current page is complete, **output the handoff block in §14 and stop**. Do not ask "shall I continue?" and then continue. Wait for an explicit approval message.
- Approval means the user says the page is approved. "Looks good" about one detail is not approval of the page.
- **This gate outranks every plan, skill, and command.** If `/superpowers:execute-plan` holds a plan spanning several pages, execute only the Home batch and stop. If a plan was written across multiple pages, split it — do not run it end to end.
- Session memory recalled by claude-mem is a hint, never authority. A recalled note saying a later page was discussed is not approval to build it.

---

## 3. Installed toolchain

Several installed skills overlap heavily on design. Loading all of them at once produces mush and burns context. Use the loadout below.

### 3.1 Skills and what each is for here

| Skill | Use it for | Do not use it for |
|---|---|---|
| `obra/superpowers` | Process: `/superpowers:brainstorm` before the Home design plan, `/superpowers:write-plan` per page, `/superpowers:execute-plan` within one page. Also systematic-debugging and verification-before-completion. | Deciding how the site looks. Batching work across pages. |
| `pbakaus/impeccable` | Primary visual direction. Run `/impeccable init` once, at the start of the Home phase. Then `/impeccable audit` and `/impeccable critique` before each handoff, `/impeccable polish` last. | Motion specifics — Emil's skills own those. |
| `emilkowalski/skills` | Motion. `emil-design-eng` for interaction and polish decisions, `review-animations` before every handoff, `find-animation-opportunities` on the Home page only. | Overall page composition or palette. |
| `leonxlnx/taste-skill` | `redesign-existing-projects` for the audit-first pass over the current site in §4. | Stacking direction skills. Do **not** load `minimalist-ui`, `industrial-brutalist-ui`, or `high-end-visual-design` — the direction is already set in §6, and a second opinionated direction skill will fight it. |
| `thedotmack/claude-mem` | Recalling what was decided and approved in earlier sessions. | Justifying any action. See §2. |

### 3.2 MCP servers

**Playwright MCP** — the verification loop. Mandatory before every handoff; see §10. Never claim a page works without having actually looked at it through Playwright.

**Figma MCP** — connected, but only use it if the user confirms a live Figma file for this project. Ask before first use; do not assume one exists.
- If there is a file: it is the source of truth for tokens. Pull variables and design context from it rather than inventing values, and flag any place the Figma spec conflicts with this document instead of silently picking one. Check whether it reflects the redesign or the thing being replaced before treating it as authoritative.
- If there is no live file: do not use it, and do not generate one to work from unless asked.

```
Figma file URL:    <!-- FILL IN, or "none" -->
```

### 3.3 Per-phase loadout

- **Audit phase:** `redesign-existing-projects` + Playwright.
- **Direction phase:** `/superpowers:brainstorm`, then Impeccable, then Figma if a file exists.
- **Build phase:** Impeccable + `emil-design-eng`.
- **Review phase:** `review-animations` + `/impeccable audit` + Playwright.

### 3.4 Precedence when they conflict

1. Explicit instruction from the user in conversation.
2. This file.
3. Impeccable on visual direction; Emil's skills on motion, easing, and duration.
4. taste-skill on general frontend craft.
5. Everything else.

Two specific notes:

- On easing and duration, **Emil's rules win over §9's defaults.** §9 is a floor, not a ceiling.
- Impeccable's detector will fire on some things. When a finding conflicts with a hard requirement from the user — the video hero, the exact award string, the nav shape — **the user's brief wins.** Log the ignored rule in the handoff rather than quietly dropping the requirement or quietly ignoring the detector.

Never run more than one design skill's full workflow on the same file in the same pass. Build, then review, then fix in one batch.

---

## 4. Existing assets — do not break these

Before writing any code, run the audit-first pass and report what you found:

- The **background video** already in the project folder. Use the existing file. Do not download, generate, or substitute a different video. Report its filename, format, resolution, duration, and file size.
- The **service buttons**. The services they represent must survive the redesign. The visual treatment can change completely; the content and destinations cannot silently disappear.
- Any existing brand colours, logo, fonts, copy, or contact details. Extract them first, then design around them.

Fill these in once inventoried:

```
Video file:        public/video.mp4 — <!-- size, resolution, duration -->
Company name:      <!-- FILL IN -->
Services:          <!-- FILL IN: list them -->
Brand colours:     <!-- FILL IN or "none — Claude to propose" -->
Logo:              <!-- FILL IN or "none" -->
```

**Never delete an existing asset.** If something must be replaced, move it to `/legacy/` and say so.

---

## 5. Tech stack

`AGENTS.md` (imported at the top of this file) is the authority on project structure, dependencies, scripts, and code-quality conventions. Do not duplicate it here and do not contradict it. This section covers only what the redesign adds.

The stack is **React 19 + TypeScript + Tailwind CSS v4 + Vite 8**, package-managed with **pnpm**, formatted with **oxfmt**, toolchain pinned in `.mise.toml`.

- Do **not** migrate to Next.js, Astro, or anything else. If a migration genuinely seems warranted, propose it and stop.
- Do **not** add a component library (Bootstrap, Material, shadcn, MUI). Tailwind gives unstyled utilities; the design must be authored, not inherited.
- Dependencies: prefer zero. Every added dependency needs a one-line justification in the handoff. Every added Vite plugin needs the user's approval first.
- Animation: prefer native `IntersectionObserver` + CSS transitions. A library (GSAP, Motion One) is acceptable **only if** justified and under ~30KB gzipped.
- Components are default exports, `@` resolves to `src`, and Tailwind v4 needs no `tailwind.config` or PostCSS config — do not create one.
- Run `oxfmt` before every handoff. Do not introduce Prettier or ESLint without asking.

### 5.1 Design tokens under Tailwind v4

Tailwind's own defaults are themselves an AI tell — slate-and-indigo, default shadows, default radii. The design direction in §6 must be encoded as real tokens, not fought with one-off classes.

- Define every token in a `@theme` block in `src/index.css` (`--color-*`, `--font-*`, `--ease-*`, `--radius-*`). They become real utilities.
- **Ban arbitrary values in JSX for anything themeable.** `bg-[#0a0a0a]` and `duration-[437ms]` are the failure mode — add the token instead. Arbitrary values are acceptable only for genuine one-offs that will never repeat.
- Do not use Tailwind's stock palette names (`slate-900`, `indigo-500`) in components. Every colour resolves through a project token.
- Keep CSS `@import` first in `src/index.css`, then `@font-face`, then `@theme`, then globals.

### 5.2 Routing — decided: react-router

This is an **SPA**: one `index.html`, one `#root`, everything under `src/App.tsx`.

**`react-router` is approved as a dependency.** This is the one pre-approved exception to §5's dependency rule; everything else still needs asking. Install it during the Home phase, since the nav is built then.

Requirements that come with it:

- **Browser routing with clean paths** (`/about`), not hash routing. Report the gzipped size delta in the Home handoff.
- **Deployment needs an SPA fallback rewrite** — all unmatched paths serve `index.html`, or `/about` 404s on refresh and on direct links. Flag this in the Home handoff with the config for the actual host once it is known. This is the single most likely thing to break in production while working perfectly in dev.
- **Use `NavLink` for the nav** so active-tab state comes from the router rather than hand-tracked state.
- **Move focus to the new page's `h1` on every route change, and reset scroll to top.** Route changes are silent to screen readers by default, and with §9's scroll reveals a preserved scroll position lands visitors mid-page with animations already fired. Both are required, not optional polish (§11).
- **Lazy-load each route** as it is added, so an unapproved page can never weigh down Home.

**Add one route at a time, as each page is approved.** Do not pre-register routes for About through Projects. Unbuilt tabs point at `#` per §2.

Neither this nor any client-side router gives the site SEO — everything renders client-side. If search visibility becomes a requirement, raise prerendering as a separate decision rather than solving it inside a page build.

### 5.3 Vite specifics

- **The video lives in `public/video.mp4`, referenced as `/video.mp4`.** It was previously at `src/assets/video.mp4`. Keeping it out of the module graph means the file can be compressed or swapped without touching code — likely during this project. Do not move it back into `src/`, and do not `import` it.
- **The poster frame is at `public/poster.jpg`.** It exists; use it (§8). Do not regenerate it without being asked.
- If the video is ever replaced, version the filename (`video-v2.mp4`) rather than overwriting in place. Files in `public/` are not content-hashed, so an overwrite can serve a stale cached copy to returning visitors.
- **Always verify against `pnpm build && pnpm preview`, never only `pnpm dev`.** The dev server hides asset-path, base-path, and code-splitting bugs that only appear in the production build. The Playwright checks in §10 run against the preview build.
- Dev runs on port **8443**, not Vite's default 5173. Preview runs on its own port — read it from the terminal output rather than assuming.
- If the site deploys to a subpath, set `base` correctly and re-verify asset paths — the video is the first thing that breaks.
- Env vars need the `VITE_` prefix to be exposed. Never put a secret in one — they ship to the client.

---

## 6. Design direction

### 6.1 Before writing code, produce a design plan

For the Home page, brainstorm first, then write a plan and show it to the user **before** implementing:

- **Palette** — 4–6 named hex values with roles (base, surface, ink, accent, accent-dim).
- **Type** — a display face and a body face, deliberately paired, plus a utility/mono face if the direction calls for it. Include the type scale.
- **Layout** — one-sentence description per section plus an ASCII wireframe of the page.
- **Signature** — the single element this page will be remembered for.

Then critique the plan: if any part is what you would produce for *any* futuristic site, revise it and say what you changed.

### 6.2 What "futuristic" means here

Aim for **precision-engineered**, not sci-fi cliché. Think instrument panels, telemetry, mission control, structural drawings.

Encouraged:

- Deep, near-black or deep-navy base with genuinely restrained accent usage.
- Typography doing heavy lifting: tight tracking on display, a monospace utility face for labels and data.
- Structural devices that encode real information — a metric with a real unit, a status label that reflects actual state.
- Fine hairline rules, grid overlays, subtle grain, depth via layering rather than drop shadows.
- Glow used to establish hierarchy on one focal element, never as ambient decoration.

Banned — these read as AI-default and will be rejected:

- Purple-to-blue gradient hero; generic neon-cyberpunk everything.
- Inter for everything.
- Glassmorphism on more than one component type.
- `01 / 02 / 03` numbered markers unless the content genuinely is a sequence.
- Floating particles, matrix rain, hexagon meshes.
- Oversized italic serif as the hero `h1` (Fraunces, Playfair, Cormorant and friends) — a known AI-generated marketing-page fingerprint.
- Filler copy: "Empowering the future", "Innovative solutions", "Transforming businesses". Write specific copy about what this company actually does.

### 6.3 Restraint

Spend boldness in one place. The signature element is the memorable thing; everything around it stays quiet and disciplined. Before finishing a page, remove one effect.

---

## 7. Homepage requirements (mandatory)

- [ ] Background video from the project folder, playing in the hero.
- [ ] The exact string **"International Award-Winning Company"** visible on the page, as real text in the DOM — not baked into an image.
  - **Do not set it as an uppercase letter-spaced eyebrow chip directly above the `h1`.** That pattern is a flagged AI tell and Impeccable's detector will fire on it. Treat the claim as a credential and find it a real home: tied to the award itself, set against the video with a rule, worked into a status strip, or given its own moment. Whatever you choose, be able to justify it.
- [ ] The service buttons, redesigned, with all existing services present.
- [ ] Navigation bar with exactly these tabs, in this order: **Home · About · Services · Team · Projects**.
- [ ] **Log in** and **Get started** buttons in the top-right of the nav, visually distinct from each other — `Log in` secondary/ghost, `Get started` primary. Both keyboard reachable, with real hover/focus/active states. If no auth exists yet, wire them to `#` and note it.
- [ ] At least three scroll-revealed sections below the hero.
- [ ] Footer with company details.

---

## 8. Video background rules

- `autoplay muted loop playsinline preload="metadata"` — all five. Without `muted` and `playsinline`, iOS will not autoplay.
- Always supply a `poster` frame so there is never a blank hero.
- Overlay the video with a scrim so text contrast passes WCAG AA against the **brightest** frame — check the brightest frame, not the average. Use Playwright to screenshot mid-playback and confirm.
- `object-fit: cover`, never stretched or letterboxed.
- If the source file is over ~5MB, flag it and recommend compression targets. Do not ship a 40MB hero video.
- On `prefers-reduced-motion: reduce`, and on narrow viewports, show the poster image instead of playing the video.
- The video is decorative: `aria-hidden="true"`, and it must never carry information that exists nowhere else.
- The page must render correctly if the video fails to load.

---

## 9. Motion and scroll animation rules

These are the floor. Emil's skills override the specifics where they are stricter.

- Use `IntersectionObserver`. Never a `scroll` listener that does layout work.
- Animate **`transform` and `opacity` only.** Never `top`, `left`, `width`, `height`, `margin`, or `filter` on scroll.
- **Never `ease-in` on an enter animation** — the delayed start reads as sluggish exactly when the user is watching. Use a strong ease-out curve.
- Default reveal: fade + 16–24px translate, 400–600ms.
- Stagger children 60–100ms, capped so a 12-item grid does not take four seconds.
- **Reveal once.** Do not re-animate on scroll-up — it makes a page feel broken.
- Ask whether each thing should animate at all. Anything a user sees dozens of times a session should not animate.
- **No scroll-jacking.** Never hijack the wheel, override scroll speed, or trap the user in a section.
- Content must be readable with JS disabled: the no-JS fallback leaves elements at full opacity.
- Respect `prefers-reduced-motion: reduce`. Non-negotiable.
- Nothing above the fold waits on a scroll trigger to become visible.

Run `review-animations` before every handoff and report its findings in the handoff block, including anything you chose not to act on.

---

## 10. Verification — Playwright, before every handoff

Build first, then inspect in **one batched round**, fix everything it surfaces in **one batch**, confirm with **at most one more round**, then stop. Do not enter a polish loop.

Run against `vite preview`, not the dev server. Every item below is required:

1. Screenshots at 375, 768, 1024, 1440, 1920 — desktop and mobile in the same round.
2. Confirm the video actually autoplays (assert the element is not paused after load), and that the poster is visible before playback starts.
3. Screenshot mid-playback on a bright frame and check text contrast over the video.
4. Emulate `prefers-reduced-motion: reduce` and confirm the page is calm and fully readable.
5. Tab through the entire page; confirm focus is always visible and the mobile menu traps and releases focus correctly.
6. Check the console for errors and warnings. Report them; do not silently ignore.
7. Confirm no horizontal scroll at any width.
8. Once more than one route exists: navigate between routes and confirm scroll resets to top, focus lands on the new `h1`, and a direct load of a non-root path (e.g. `/about`) does not 404 against the preview build.

A page is not "done" until this has actually run. Do not report results you did not observe.

---

## 11. Quality floor (every page, no exceptions)

**Responsive**

- Breakpoints: 375, 768, 1024, 1440, 1920.
- Mobile nav: a real menu, keyboard accessible, focus trapped while open, closes on `Esc`.
- No horizontal scroll at any width. Ever.

**Accessibility**

- Semantic HTML: one `<h1>`, logical heading order, `<nav>`, `<main>`, `<footer>`.
- Visible focus states on every interactive element. Do not remove outlines without replacing them.
- Text contrast ≥ 4.5:1 (≥ 3:1 for large text), including over video and gradients.
- Touch targets ≥ 44×44px.
- Buttons that act are `<button>`; things that navigate are `<a>`.

**Performance**

- Lighthouse: Performance ≥ 85 (video hero accounted for), Accessibility ≥ 95.
- CLS < 0.1 — reserve space for the video and all images with explicit dimensions or aspect ratios.
- Images: modern formats, `loading="lazy"` below the fold, explicit width/height.
- Self-host fonts or use `font-display: swap`. Max two families, max four weights total.

**Code**

- Design tokens live in the `@theme` block in `src/index.css` (§5.1). No raw hex values and no Tailwind stock palette names in components.
- Watch CSS specificity collisions — section and element selectors cancelling each other's padding is the classic failure here.
- Comment the non-obvious only. No commented-out code left behind.

**Tests**

If TDD skills activate: test behaviour, not appearance. Worth testing — nav routing, mobile menu open/close and `Esc`, reduced-motion branching, video fallback when the source fails. Not worth testing — pixel positions or animation frames. Do not let a testing skill block shipping a visual page on unwritten snapshot tests.

---

## 12. Constraints — do not do these

- Do not build ahead of the approval gate, whatever a plan or skill suggests.
- Do not replace, re-encode, or delete the existing video without being asked.
- Do not drop an existing service, page link, or contact detail during a redesign.
- Do not add a backend, database, auth provider, analytics, third-party embed, or Vite plugin without asking.
- Do not commit or push unless asked.
- Do not invent awards, client names, testimonials, statistics, or case studies. If placeholder content is needed, label it `<!-- PLACEHOLDER -->` and list every instance in the handoff.
- Do not add a cookie banner, chat widget, or newsletter modal unless asked.
- Do not restructure the repo mid-project.
- Do not refactor a previously approved page while building a new one. Raise it instead.
- Do not report a verification result you did not actually observe through Playwright.

---

## 13. Consistency across pages

Once Home is approved, its decisions are locked and every later page inherits them:

- The token set (colour, type scale, spacing scale, radii, easing curves).
- Nav and footer components — build once, reuse, never fork.
- The reveal animation vocabulary. Later pages use the same motion language, not new tricks.
- Section rhythm and vertical spacing.
- Whatever Impeccable wrote to `DESIGN.md` during init — keep it in sync, and treat it plus this file together as the spec.

Changing a locked decision requires asking first, and means updating every built page in the same change.

---

## 14. Handoff block — end every page with this

```
## <Page> — ready for review

**Built:** <sections, in order>
**Design decisions:** <2–4 lines on palette/type/motion and why>
**Assets used:** <files touched, incl. the video>
**Skills used:** <which, and what each changed>
**review-animations findings:** <acted on / consciously ignored + why>
**Impeccable findings:** <acted on / consciously ignored + why>
**Playwright results:** <the 7 checks in §10, pass/fail, console errors>
**Placeholders needing your content:** <list, or "none">
**Assumptions I made:** <list, or "none">
**Deviations from CLAUDE.md:** <list + reason, or "none">

**Test this yourself:**
1. `pnpm build && pnpm preview`, then load on your phone and desktop
2. Scroll top to bottom; confirm reveals fire once and nothing jumps
3. Tab through the page; confirm focus is always visible
4. Enable reduced-motion; confirm the page is calm and fully readable
5. <page-specific check>

**Known limitations:** <list>

Waiting for your approval before starting <next page>.
```

Then stop. No further edits until the user responds.

---

## 15. When you're unsure

Ask. A short question costs one message. A wrong assumption costs a rebuild.

Always ask rather than guess about: real company facts (awards, clients, numbers, team members), adding dependencies or Vite plugins, changing the stack, whether a Figma file exists, and anything that would alter an approved page.