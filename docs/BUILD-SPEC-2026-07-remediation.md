# Build Spec — Feeling Mutual site remediation

**Date:** 2026-07-28
**Branch:** `master` (clean at `717048b` when this audit started)
**Trigger:** Client feedback from Tom Woodnutt, four reported issues, following the December 2025 Gatsby → Astro migration.

---

## 1. Context

The site was migrated from Gatsby to Astro in December 2025 across five commits:

| Commit | Message |
| --- | --- |
| `87f6c6b` | astro js migration |
| `41d44b4` | removed all emailjs; updated to build to netlify |
| `5aaa72a` | Fix broken images/links: remove SSR adapter, upgrade Node, replace Font Awesome with Lucide |
| `f2c5fa3` | Add public/ to git — was gitignored from old Gatsby config |
| `717048b` | Fix footer social icons stacking vertically |

The migration commit rewrote pages rather than porting them (`services.js` 173 → 67 lines, `training.js` 262 → 70, `privacy-policy.js` 163 → 62). Several regressions trace directly to that.

### How the issues were verified

- Dev server on port **4399** (chosen to avoid collision with other local sessions).
- Playwright/Chromium screenshots at 390 / 1368 / 1440 / 1512 / 1920 / 2160 / 2400 / 2560 / 2880 px, with computed-style measurement of font sizes, element widths and `document.fonts`.
- Full internal link crawl of all 31 reachable URLs, plus HEAD checks on every external link.
- Production checks against `https://www.feelingmutual.com`.
- Wayback Machine snapshot `20241220032929` to establish what the pre-migration site served.
- Full git history sweep (`git ls-tree` across every commit on every ref) to find deleted content.

Evidence screenshots: `/private/tmp/claude-501/-Users-simon-GitHub-feeling-mutual/4d7a008a-2e59-44ff-bb45-e8a4239f9e08/scratchpad/evidence/`

---

## 2. Issue log

Priority: **P1** = client-reported and user-facing, **P2** = client-reported, cosmetic or content, **P3** = found during audit, housekeeping.

---

### FM-01 — Custom webfont never loads (P1)

**Client report:** "On a few pages, the text does not render properly when looking at it on the PC. It's either massive or small. Seems OK on mobile."

**Symptom.** Neue Haas Unica Pro is never applied anywhere on the site, on any platform. Everything renders in a fallback face.

**Root cause.** `src/styles/global.css:5` places `@import url('/fonts/fonts.css')` *after* the three `@tailwind` directives. CSS requires `@import` to precede all other statements, so the browser discards it. Vite reports this on every build:

```
[vite:css][postcss] @import must precede all other statements (besides @charset or empty @layer)
```

**Evidence.**
- Local: `document.fonts.size === 0` on every page at every viewport.
- Production: `_astro/_slug_.CFrbOBn1.css` contains `font-family:Neue Haas Unica,Helvetica,sans-serif` but **zero** `@font-face` rules. `/fonts/fonts.css` and the TTFs return 200 — they are deployed and simply never referenced.

**Why it is platform-specific.** The declared stack is `"Neue Haas Unica", Helvetica, sans-serif`.

| Platform | Resolves to | Result |
| --- | --- | --- |
| macOS / iOS | Helvetica (system font) | Close to the intended face — "seems OK on my Mac mini", "seems OK on mobile" |
| Windows / Edge | Arial via generic `sans-serif` | Different metrics, and `font-extralight` / `font-light` / `font-semibold` are **browser-synthesised** because Arial ships only Regular and Bold |

**Fix.**
1. Remove the dead `@import` from `src/styles/global.css`.
2. Load the face from `src/layouts/Layout.astro` `<head>` via `<link rel="stylesheet" href="/fonts/fonts.css">`, which sidesteps CSS import ordering entirely and fetches in parallel rather than chained.
3. Add `font-display: swap` to every `@font-face` in `public/fonts/fonts.css` so text is never invisible while the face downloads.
4. Preload the two faces used above the fold (Light 300, SemiBold 600).

**Verification.** `document.fonts.size > 0` and `document.fonts.check('600 64px "Neue Haas Unica"')` is `true` on `/`, `/services`, `/training`, `/blog` and a blog post. Confirmed loadable during the audit — injecting the stylesheet manually registered 12 faces and shifted the h1 measurement from 1024px to 1001px.

**Note.** The 20 TTFs total ~2.4 MB and only a handful of weights are used. Converting to WOFF2 and subsetting is a worthwhile follow-up but is **not** in this spec.

---

### FM-02 — No maximum content width; runaway line length (P1)

**Client report:** same as FM-01 — this is the other half of it.

**Symptom.** On wide viewports headings look enormous and body copy looks like fine print. Reproduced exactly at 2880px, which matches the client's screenshot 1 proportionally.

**Root cause.** `Section.astro` applies horizontal padding only (`px-8 md:px-24 lg:px-40 xl:px-64`) and never constrains content width. Tailwind's `container` utility is configured in `tailwind.config.mjs` with `center: true` but is **not used on a single element in the codebase**. Type sizes are fixed pixels and never change between 1150px and 2400px, because `tailwind.config.mjs:24` sets `xl: '2400px'` instead of the conventional 1280px.

**Measured.**

| viewport | side padding | content width | h1 | body chars/line |
| ---: | ---: | ---: | ---: | ---: |
| 1150 | 160 | 830 | 64px | 43 |
| 1440 | 160 | 1120 | 64px | 59 |
| 1920 | 160 | 1600 | 64px | 85 |
| 2400 | 256 | 1888 | 64px | 101 |
| 2880 | 256 | 2368 | 64px | **128** |

Comfortable measure is 45–75 characters. A Surface Pro at 100% Windows scaling presents a CSS viewport far wider than a typical Mac laptop, so the client lands in the 1920–2880 band where body text is unreadable and the fixed 64px headings are wildly out of proportion.

**Fix.** Cap the content column at 1440px inside `Section.astro` using padding rather than a wrapper element, so full-bleed section backgrounds are preserved and no call site or flex/grid layout changes:

```css
.section-shell {
  padding-inline: max(var(--section-gutter), calc((100% - var(--section-max)) / 2));
}
```

with `--section-max: 90rem` and responsive `--section-gutter` values matching the current 2rem / 6rem / 10rem steps.

Also replace the hero's arbitrary `md:text-[4rem]` with a standard step.

**Deliberately not doing:** fluid `clamp()` type. Once the column is capped at 1440px the proportions match what already renders correctly on the client's Mac at 1440px, so fluid type adds risk (it would alter mobile, which the client says is fine) for no benefit.

**Verification.** Re-run the width sweep; chars/line must stay ≤ ~75 at every width from 1150 to 2880, and the 1440px rendering must be byte-identical to today's.

**Amendments made during implementation.**

1. **Capping the section was necessary but not sufficient.** Blog post bodies still measured 160 characters per line at 1440px, because `.post-body` filled the whole capped column. Added `max-width: 68ch` to `.post-body` in `blog/[...slug].astro`. Left-aligned rather than centred, so the copy shares a left edge with the title and byline in the header section above. Also added `hyphens: auto`, because the existing `text-justify` was rivering badly.
2. **Removed `px-12` from the founder `<Section>`** in `index.astro`. It set `padding-left`/`padding-right` while `.section-shell` sets `padding-inline`; both are single-class selectors, so which one won came down to stylesheet order. Removing it makes the outcome explicit rather than incidental.

**Measured after the fix** (widest wrapping paragraph, measured from real line boxes via `Range.getClientRects()`, ignoring the final partial line):

| viewport | `/` | `/services` | `/blog` | blog post |
| ---: | ---: | ---: | ---: | ---: |
| 390 | 41 | 32 | 37 | 36 |
| 1150 | 49 | 60 | 33 | 68 |
| 1440 | 65 | 60 | 46 | 68 |
| 1920 | 72 | 80 | 54 | 68 |
| 2880 | 72 | 80 | 54 | 68 |

Flat from 1920 upward, and within the comfortable 45–75 band throughout (services peaks at 80 on its intro paragraph, which is acceptable).

---

### FM-03 — All six client case study pages 404 (P1)

**Client report:** "The links to the client case studies are all broken."

**Symptom.** `/blog/bbc`, `/blog/easy-jet`, `/blog/set-app`, `/blog/sony`, `/blog/uefa`, `/blog/virgin-pure` all return 404, locally and on production.

**Root cause.** `CaseStudyGrid.astro:10` links to `/blog/{slug}`, but `src/pages/blog/[...slug].astro:11` calls `getCollection('blog')` only. The case studies live in a separate `featured-case-studies` collection which has **no route defined anywhere**. Gatsby's File System Route API generated a page per markdown node regardless of source folder, so all six worked before.

**Evidence.** Wayback snapshot `20241220032929` of the pre-migration homepage links all six URLs; they were live in December 2024. Both the local crawl and production return 404 for all six today.

**Fix.**
1. `blog/[...slug].astro` — build paths from both collections.
2. `category/[...category].astro` — include case studies so `/category/case-study` lists all seven, not just the one that happens to live in the `blog` collection.
3. `blog/index.astro` — include case studies in the listing and in the category pills.

The two collections have compatible-enough schemas (`title`, `date`, `description`, `showcaseImage`, `category`, `tags`); `featured-case-studies` adds `showcaseTitle` and `subCategory`. Merge on the shared fields.

**Verification.** All six URLs return 200 and render with the correct breadcrumb and `ActionBanner` (not `GetInTouch`, which is the `article` branch). Full crawl reports zero 404s other than FM-06.

---

### FM-04 — Award logos missing from the homepage (P2)

**Client report:** "I've lost the award logos which used to appear on the home page."

**Root cause.** `src/components/AwardsMarquee.js` was deleted in `87f6c6b` and never ported. It rendered a scrolling strip of seven logos between the hero and the "What We Do" section, wrapped in `<div className="bg-maroon py-6">`.

**Evidence.** The Wayback snapshot contains the marquee's wrapper markup (`h-20 bg-white flex space-x-12 items-center bg-transparent`) but no `<img>` tags inside it, because `react-fast-marquee` renders its children client-side only. The container was live; the images hydrated in the browser. All seven PNGs are still in `src/images/awards/` and are currently referenced by nothing.

Logos: `mrs_finalist_2017`, `mrs_finalist_2019`, `mrs_winner_2021`, `quirks_winner_2020`, `quirks_winner_2021`, `aqr_shortlist_2021`, `admap_2013`.

**Fix.** Reimplement as a pure-Astro `AwardsMarquee.astro` using a CSS keyframe animation and a duplicated track. No React, no `react-fast-marquee`, no client-side JS, no hydration flash. Keep the original visual treatment: `h-24` logos separated by a `bg-sandybrown/75` dot, on the maroon band.

Add `@media (prefers-reduced-motion: reduce)` to pause the animation.

**Verification.** Seven logos visible on `/` between hero and "What We Do"; all seven image requests return 200; strip is legible at 390px and 2880px.

---

### FM-05 — Case study grid tiles are oversized (P2)

**Client report:** covered by their screenshot 3, where the logo tiles dominate the page and the surrounding text looks tiny by comparison. Part of the "massive or small" complaint.

**Root cause.** The rewritten `CaseStudyGrid.astro` uses `aspect-square` tiles with a white background that grow without limit as the viewport widens. At 1920px each tile is roughly 500px square. The Gatsby original used `lg:w-80` (320px) cards with a fixed `h-40` (160px) logo area on a transparent background.

**Fix.** Constrain tile height (`h-44 md:h-48`) instead of forcing a square, keep `object-contain` and the white card so the logos stay legible, keep the existing hover overlay. Interacts with FM-02, which also caps the grid's overall width.

**Verification.** Tiles do not exceed ~250px tall at any viewport; hover overlay still reveals `showcaseTitle` and `subCategory`; grid reflows 1 / 2 / 3 columns at the existing breakpoints.

---

### FM-06 — 'Inspiring' link 404s — **DEFERRED, accepted risk** (P2)

**Client report:** "Some of the other links are broken #404 e.g. when you click on 'inspiring' under 'how we work'."

**Finding.** `src/pages/index.astro:83` links to `/blog/why-is-online-qual-more-inspiring-than-traditional-methods`. That folder did briefly exist — added in `b0bf176` (Final revisions before launch), deleted in `681e1ac` — but its contents were a copy-paste of the *agile* article: same title (`What does 'agile online qualitative research' mean?`), same opening paragraph, 357 words. It was a stub with the right slug and the wrong body, and it was gone before the Astro migration. There is no real article to restore.

**Decision (Tom / Simon, 2026-07-28):** leave the link pointing at the intended slug. Tom will write the article, and it will be published at that URL.

**Consequence:** this URL continues to 404 in production until the article ships. This is the only remaining broken internal link once FM-03 lands. It is knowingly accepted, not an oversight.

**Optional one-line mitigation if it needs to stop 404ing sooner:** drop the `<a>` wrapper on the Inspiring card in `index.astro` so it renders as a non-clickable card. Not being done now.

---

### FM-07 — In-content link to `/blog/set-app/` 404s (P3)

`src/content/blog/aqr-award-shortlisting-2021/index.md` contains an absolute link to `https://www.feelingmutual.com/blog/set-app/`, which 404s for the same reason as FM-03.

**Fix.** Resolved automatically by FM-03. Additionally convert it to a root-relative `/blog/set-app` so it works in local dev and on deploy previews, not just production.

---

### FM-08 — Reinstate the lost "face-to-face vs online" article (P2)

**Finding.** A full history sweep found ten blog folders that no longer exist. Most are not worth recovering:

| Slug | Words | Verdict |
| --- | ---: | --- |
| `qual-face-to-face-what-do-you-lose` | **2,082** | **Real, substantive, publishable — recover** |
| `7-tips-for-insightfully-analysing-online-qual` | 501 | Real and complete — not requested |
| `4-tips-for-crafting-colourful-online-qual-reports` | 502 | Duplicate of the 7-tips body |
| `the-golden-rule-of-great-online-qualitative-research` | 77 | Placeholder (Biggie Smalls lyrics) |
| `why-qualitative-researchers-must-stop-underestimating-online-methods` | 38 | Frontmatter only, empty body |
| `why-is-online-qual-more-inspiring-than-traditional-methods` | 357 | Duplicate of the agile article — see FM-06 |
| `first-post` | — | Scaffold |
| `2021-mrs-independent-researchers-award-winner` | — | **Not lost** — renamed to `mrs-independent-researchers-award-winner-2021` |
| `how-agile-qualitative-research-helped-virgin-pure` | 73 | Duplicate of the row below |
| `mrs-2022-cx-conference-paper-virgin-pure` | 76 | **Not lost** — SlideShare embed `tid5gOJHL8Enf7` survives inside `mrs-independent-researchers-award-winner-2021` |

All of these were deleted **before** the original launch (`b0bf176`, `681e1ac`, `7230488`), i.e. during the original Gatsby build, not during the Astro migration.

**Decision (Tom / Simon, 2026-07-28):** reinstate `qual-face-to-face-what-do-you-lose` only, with corrected frontmatter.

**Fix.** Restore `src/content/blog/qual-face-to-face-what-do-you-lose/index.md` and its `team-meeting.jpeg` from `b0bf176^`. Body text preserved verbatim. Frontmatter corrected:

| Field | Was | Becomes | Why |
| --- | --- | --- | --- |
| `title` | `New Beginnings` | `Face-to-face vs online qual: what do you gain and what do you lose?` | The old title is scaffold text unrelated to the body; the new one matches both the content and the slug |
| `date` | `2016-02-01` | `2020-03-01` | Scaffold default. The body says "Irrespective of what happens with the Cornavirus" and "as concerns over travel and inter-personal contact intensify" — written around March 2020. **Tom to confirm the exact date.** |
| `description` | `This is an optional description for SEO and Open Graph purposes...` | Real summary | The old value is literally the scaffold placeholder and would have shipped into `<meta name="description">` and the blog card |
| `tags` | `["UX", "Research"]` | `["Focus Group", "Online Qual", "best practice"]` | Aligns with the existing tag vocabulary already in use across the other posts |

**Body formatting.** The article's section headers are plain ALL-CAPS paragraphs (`THE TOP 4 LOSSES WHEN SWITCHING FROM OFF, TO ONLINE QUAL`) and its numbered points are `1)` / `2)` prose lines, not markdown lists. Rendered through the current `.post-body` styles this is a 2,000-word wall of justified text. Converting the section headers to `##` and the sub-points to `###` is **markup only, no copy changes** and is in scope.

**Typos — corrected 2026-07-28 on Simon's instruction.** Eleven mechanical errors fixed. Spelling, word confusion and duplicated words only; no changes to voice, register or argument.

| Was | Now | Class |
| --- | --- | --- |
| `Cornavirus` | `Coronavirus` | spelling |
| `discusions` | `discussions` | spelling |
| `intrepret` | `interpret` | spelling |
| `non-verbal queues` | `non-verbal cues` | wrong word |
| `all to easy` | `all too easy` | wrong word |
| `on-one-one mode` | `one-on-one mode` | transposition |
| `time to breath,` | `time to breathe,` | wrong word |
| `If you are are a client` | `If you are a client` | duplicated word |
| `teams can comments on` | `teams can comment on` | verb form slip |
| `transcript. which means` | `transcript, which means` | punctuation |
| `others views` | `others' views` | missing apostrophe |

**Deliberately not changed** — these read as Tom's spoken voice rather than errors, so they are his call, not a build task:

- `Here's the main gains and losses` and `there's less group dynamics` — conversational subject-verb agreement, used consistently throughout.
- `Face to face moderation skills takes years to develop` — same class as the above.
- `scrutinize` alongside `specialises` / `empathise` / `recognising` — mixed -ize/-ise. `-ize` is valid Oxford spelling, so this is a house-style decision.
- `Asynchronous online qual is calm and does.` — elliptical, but it scans as intentional.

**Two dead references in the body, for Tom rather than for the build:**

1. "that is 'asynchronous' rather than 'real-time' online qual, **as explained here**" — "here" was a link in the original and has no destination now.
2. "please feel free to share your views **in the comments**" and "please do share a comment" — the site has no comments system.

**Verification.** `/blog/qual-face-to-face-what-do-you-lose` returns 200, appears on `/blog` and `/category/article`, image renders, no scaffold text in the meta description.

---

### FM-09 — Case studies absent from blog index and category page (P2)

`blog/index.astro` and `category/[...category].astro` both read `getCollection('blog')` only. The six featured case studies therefore appear nowhere except the homepage grid, and `/category/case-study` — which the homepage "Read More" link points at — lists exactly one post.

**Fix.** Folded into FM-03.

---

### FM-10 — Invalid Tailwind classes (P3)

Classes present in markup that Tailwind v3 does not generate, so they are silently no-ops:

| Class | Files | Should be |
| --- | --- | --- |
| `text-md` | `Footer.astro` ×10, `CustomerReviewCard.astro:25` | `text-base` |
| `text-light` | `Footer.astro` ×10 | `font-light` |
| `max-w-2/5` | `ServiceCard.astro:23` | remove — `lg:max-w-72` on the same element already does the job |
| `min-w-screen` | `Layout.astro`, `NavigationBar.astro` | `w-full` |
| `prose prose-lg` | `blog/[...slug].astro:60` | remove — `@tailwindcss/typography` is not installed, and the `.post-body` rules below already style the content |

Low risk: these currently do nothing, so removing or correcting them changes rendering only where the corrected class was the intent (footer link sizing and weight).

---

### FM-11 — Dead dependencies and orphaned assets (P3)

**Unused dependencies.** `react`, `react-dom`, `@astrojs/react`, `react-fast-marquee` and `react-select` are installed but imported by nothing in `src/`. `astro.config.mjs` still carries `vite.ssr.noExternal: ['react-fast-marquee']` for a package nothing imports.

FM-04 deliberately reimplements the marquee without React so these can all go, dropping ~30 transitive packages from the build.

**Orphaned assets** (kept on disk, referenced by nothing):

- `src/images/splash/team-meeting.jpeg` — old training hero
- `src/images/profiles/caroline-hayter.jpeg`, `jill-elston.jpeg` — training testimonials removed in the migration
- `static/` — a leftover Gatsby folder. Astro serves `public/`, so `static/whitepapers/*.pdf` (2 files) and `static/fonts/` (a duplicate of `public/fonts/`) are not published at all.

**Fix in this pass:** remove the React dependencies and the stale Vite config. **Not in this pass:** deleting orphaned assets — they are the source material for FM-16 and should not be thrown away until Tom has decided on that.

---

### FM-12 — Font Awesome CSS left behind (P3)

`src/styles/global.css` still defines `ul.tick-list li::before` and `ul.tool-list li::before` with `content: "\f00c"` / `"\f7d9"` in `font-family: "Font Awesome 6 Pro"`. Font Awesome was removed in `5aaa72a`. No element in the codebase uses either class, and the font is not loaded, so any future use would render tofu.

**Fix.** Remove both rules.

---

### FM-13 — Repository hygiene (P3)

- `package-lock.json` is **gitignored**. Netlify installs from `package.json` ranges only, so a transitive release can change the deployed build with no commit. Recommend un-ignoring and committing it.
- `dist/` and `.astro/` were committed in `87f6c6b` and partially removed in `5aaa72a`; `.astro/content-assets.mjs` is still tracked. Both are generated and should be ignored.

**Fix.** In scope, but as a separate commit from the user-facing fixes.

---

### FM-16 — Page copy rewritten during the migration — **LOGGED ONLY, NOT IN SCOPE** (P2)

**Decision (Tom / Simon, 2026-07-28): bugs only. Current copy stays. Recorded here so it is a decision, not an accident.**

`87f6c6b` regenerated these pages rather than porting them. The wording on the live site today is not Tom's:

**Services** (`services.js` 173 → `services.astro` 67 lines). Interactive four-way service selector replaced with static cards, and every description rewritten. Example:

> Original: "We take your brief and then design the most robust sample and method. We also assemble an expert team for moderation and reporting."
> Current: "We can offer everything, from design, to set up, moderation and reporting. Our full service approach ensures seamless execution from start to finish."

**Training** (`training.js` 262 → `training.astro` 70 lines). Lost: the "Online Qual Mastery" video-series framing, the 100+ researchers / 4+ hours video / 20+ downloads stats, the hero photograph, and three named client testimonials — Caroline Hayter (Founder, Acacia Avenue), Jill Elston (Founder, Insightful Research), Fran Walton (Head of Insight, Publicis Sapient). The four module descriptions were also rewritten.

**Homepage.** The closing paragraph of the "How We Work" section was dropped entirely:

> "We test and develop concepts and designs, through real-time conversations (via webcam) and asynchronous online qualitative (via communities, diaries and forum technologies). We map customer journeys for service design and innovation, through in-context mobile video, screen recordings and collaborative reporting in miro or mural."

**Privacy policy** (163 → 62 lines).

**Downloads.** Whitepaper picker replaced with mailto links. (The original picker never actually served the PDFs either, so this is arguably an improvement.)

All original text is recoverable from `87f6c6b^` whenever Tom wants it. The contact forms are a separate, deliberate removal (`41d44b4 removed all emailjs`) and are not part of this.

---

## 3. Work plan

Sequenced so each step is independently verifiable.

| # | Item | Files |
| --- | --- | --- |
| 1 | FM-01 webfont | `Layout.astro`, `global.css`, `public/fonts/fonts.css` |
| 2 | FM-03 + FM-09 case study routing | `blog/[...slug].astro`, `category/[...category].astro`, `blog/index.astro` |
| 3 | FM-07 in-content link | `aqr-award-shortlisting-2021/index.md` |
| 4 | FM-02 content width | `Section.astro`, `global.css`, `index.astro` |
| 5 | FM-05 case study tiles | `CaseStudyGrid.astro` |
| 6 | FM-04 awards marquee | new `AwardsMarquee.astro`, `index.astro` |
| 7 | FM-08 reinstate article | new `qual-face-to-face-what-do-you-lose/` |
| 8 | FM-10 + FM-12 class and CSS cleanup | `Footer.astro`, `CustomerReviewCard.astro`, `ServiceCard.astro`, `NavigationBar.astro`, `Layout.astro`, `blog/[...slug].astro`, `global.css` |
| 9 | FM-11 dependency cleanup | `package.json`, `astro.config.mjs` |
| 10 | FM-13 repo hygiene | `.gitignore` |

## 4. Acceptance criteria

1. `npm run build` completes with **no** `@import must precede all other statements` warning.
2. `document.fonts.size > 0` and `document.fonts.check('600 64px "Neue Haas Unica"')` is `true` on every page type.
3. Link crawl of all routes returns **zero** 404s except `/blog/why-is-online-qual-more-inspiring-than-traditional-methods` (FM-06, deferred by decision).
4. All six case study URLs return 200 and render correctly.
5. `/category/case-study` lists all seven case studies.
6. Body copy stays at ≤ ~75 characters per line from 1150px to 2880px.
7. The 1440px rendering of `/` is visually unchanged from before this work, apart from the intended awards strip and resized case study tiles.
8. Seven award logos render on the homepage.
9. `/blog/qual-face-to-face-what-do-you-lose` returns 200, is listed on `/blog`, and carries a real meta description.
10. Screenshot sweep at 390 / 1368 / 1440 / 1920 / 2880 shows no horizontal overflow (`scrollWidth === clientWidth`).

## 4a. Verification results — 2026-07-28

All ten acceptance criteria met.

| # | Criterion | Result |
| --- | --- | --- |
| 1 | No `@import` warning on build | Pass — build output clean, 26 pages |
| 2 | Webfont loads | Pass — 12 `@font-face` registered, `document.fonts.check('600 64px "Neue Haas Unica"')` true on all 5 page types at all 7 widths |
| 3 | Zero 404s except FM-06 | Pass — crawl of the production build: 32 URLs, one 404 (`/blog/why-is-online-qual-more-inspiring-than-traditional-methods`, deferred by decision) |
| 4 | Six case study URLs 200 | Pass |
| 5 | `/category/case-study` complete | Pass — all seven |
| 6 | Measure ≤ ~75 chars | Pass — see table under FM-02 |
| 7 | 1440px rendering unchanged | Pass, apart from the intended awards strip and resized tiles |
| 8 | Seven award logos render | Pass — optimised to WebP at build (285 kB → 20 kB for the largest) |
| 9 | Reinstated article live | Pass — 200, listed on `/blog` and `/category/article`, real meta description |
| 10 | No horizontal overflow | Pass — `scrollWidth === clientWidth` at 390 / 1150 / 1368 / 1440 / 1920 / 2400 / 2880 |

Also removed: `react`, `react-dom`, `@astrojs/react`, `react-fast-marquee`, `react-select` and the stale `vite.ssr.noExternal` config — 145 packages, no runtime JavaScript left on the site.

**Not committed.** All changes are in the working tree for review.

## 5. Open items for Tom

1. **FM-06** — the Inspiring article. That URL 404s until it is written.
2. **FM-08** — confirm the publication date for the reinstated article. Set to `2020-03-01` based on internal references to Coronavirus and travel restrictions; the original frontmatter said `2016-02-01`, which is scaffold default and contradicted by the content.
3. **FM-08** — the eleven mechanical typos are fixed. Still open: the four voice/style calls listed under FM-08, and the two dead references ("as explained here" has no link; the article invites comments the site cannot take).
4. **FM-16** — whether to restore the original services / training / privacy copy from `87f6c6b^`.
5. **FM-11** — whether the two whitepaper PDFs in `static/whitepapers/` should be published; they are currently served by nothing.
6. Whether `7-tips-for-insightfully-analysing-online-qual` (501 words, complete) is also worth reinstating.
7. **Blog images are unoptimised.** Four post images are 1.3–1.7 MB and are served at full size, because the listing and post templates use a raw `<img src={showcaseImage.src}>` rather than Astro's `<Image>`. Switching them over would cut roughly 5 MB across the blog. Site-wide change, deliberately out of scope here.
8. **The webfont is 12 TTF files, ~1.4 MB.** Converting to WOFF2 would cut that by roughly 70%. Out of scope for this pass; FM-01 only fixes the loading, not the payload.
