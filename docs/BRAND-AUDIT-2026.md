# Brand design language — decomposition

**Date:** 2026-07-28
**Worktree:** `.claude/worktrees/brand-redesign` (branch `worktree-brand-redesign`, based on `717048b` + current WIP)
**Scope:** aesthetics only — palette, tokens, type, form, rhythm. Not content, not IA, not structure.
**Method:** static token census across `src/`, plus computed-style measurement of the running site (Astro dev @ 1440×1000, Chromium) for `/`, `/services`, `/training`, `/blog`, `/downloads`.

Design language dates from the 2021 Gatsby build; it survived the Dec 2025 Astro migration essentially unchanged.

---

## 1. What the language actually is

Stripped to one sentence: **a stack of full-bleed saturated colour bands, each with its own local text-colour contract, set in a single Helvetica-derived sans at two weights, with one 8px radius and no neutral rest.**

Every distinctive thing about the site, and every problem with it, follows from that one device.

The colour band is doing all of the work that hierarchy, spacing, typography and material would normally share. Because each band re-establishes its own foreground colour, nothing carries across a section boundary — the palette has no *system*, it has seven *situations*. That's why the page reads as a deck of unrelated slides rather than one document, and why there is no visual difference between a primary CTA and a decorative tint.

This is a recognisably 2020–21 look (Stripe-era colour blocking, Tailwind defaults, `rounded-lg`, drop shadows). It is not a bad palette. It is an unsystematised one.

---

## 2. Colour

### 2.1 The tokens

Ten named colours in `tailwind.config.mjs` under `theme.extend.colors`. Usage counted across all of `src/`:

| Token | Hex | bg uses | text uses | Actual role |
| --- | --- | ---: | ---: | --- |
| `maroon` | `#6d012d` | 9 | 33 | Primary dark ground — hero, nav, footer bands |
| `offwhite` | `#efe2d7` | 8 | 5 | The **only** near-neutral; interior page ground |
| `gold` | `#7d6544` | 3 | 39 | Dominant body-text colour on light grounds |
| `tomato` | `#fa5a50` | 8 | 17 | Accent — icons, links, logo tint |
| `pink` | `#fec8d2` | 5 | 9 | Tint — cards, footer band, text on dark |
| `sandybrown` | `#ffab5c` | 3 | 11 | Heading colour on dark grounds; one band |
| `white` | `#ffffff` | 13 | 27 | Cards, hover states |
| `blue` | `#313978` | 5 | 0 | Testimonial band, category pills |
| `green` | `#2b422b` | 3 | 1 | "What We Do" band |
| `midnight` | `#1c3159` | 0 | 1 | **Effectively dead** — one use, in `CustomerReviewCard` |

Observations:

- `white: '#ffffff'` is a no-op override of Tailwind's own `white`. It exists but does nothing.
- `midnight` is one hex away from a duplicate of `blue` and is used exactly once. Two navy tokens, no reason.
- `gold` is the most-used *text* colour on the site (39 uses) but only the 8th most-used background. It is functionally "body copy", not a brand colour — yet it's named and treated as one.
- There is **no grey**. No `text-muted`, no border colour, no disabled state. Every de-emphasis is done with opacity (`/75`, `/[0.50]`, `opacity-25`, `opacity-50`).
- There is **no semantic layer** — nothing for success/warning/error, nothing for focus, nothing for surfaces vs. text. The tokens are named after the colour, not the job, so `bg-pink` means both "testimonial card surface" and "footer band" and "text on maroon".

### 2.2 One hardcoded escape

`src/styles/global.css:39` — `ul.tool-list li:nth-child(2n+1) { color: #313978; }`. A raw hex outside the token system, on a `.tool-list` class that **no longer exists anywhere in `src/`**. Dead rule, dead selector. Same for `.animate-banner` / `@keyframes continuousScroll` (global.css:23–36) and `bg-primary` (`NavigationBar.astro:74`, referencing a token that was never defined).

### 2.3 How the palette is used — band rhythm

Measured section heights on the homepage at 1440px wide (total document 4906px):

| # | Band | Hex | Height | Share |
| ---: | --- | --- | ---: | ---: |
| 1 | Hero | `#6d012d` maroon | 788px | 16.1% |
| 2 | Awards marquee | `#6d012d` maroon | 144px | 2.9% |
| 3 | What We Do | `#2b422b` green | 640px | 13.0% |
| 4 | How We Work | `#efe2d7` offwhite | 544px | 11.1% |
| 5 | Case Studies | `#7d6544` gold | 740px | 15.1% |
| 6 | Clients | `#313978` blue | 568px | 11.6% |
| 7 | Founder | `#ffab5c` sandybrown | **950px** | **19.4%** |
| 8 | Get in Touch / Footer | `#fec8d2` pink | 532px | 10.8% |

**88.9% of the homepage is saturated colour.** The single near-neutral band is 11.1%. There is nowhere for the eye to rest.

The bands are also close to equal in weight — six of the eight fall between 10.8% and 16.1%. Nothing dominates, so nothing is primary. The one band that *does* dominate (19.4%) is the founder bio: a narrow, left-aligned, `text-justify` column floating in a field of orange with a small photo. The most visually prominent moment on the page is its weakest composition.

Interior pages use the same device with fewer bands, and always bookend with the page's "own" colour:

| Page | Sequence |
| --- | --- |
| `/` | maroon → maroon → green → offwhite → gold → blue → sandybrown → pink |
| `/services` | maroon → offwhite → maroon |
| `/training` | blue → offwhite → green → blue |
| `/downloads` | gold → offwhite → gold |
| `/blog`, `/category/*` | offwhite → maroon |

So there *is* a latent rule — "dark brand band, light content band, dark brand band" — but the homepage doesn't follow it, and the choice of which dark colour opens which page looks arbitrary (`/training` is blue for no stated reason).

### 2.4 Contrast

WCAG 2.1 ratios for every pairing the site actually renders:

| Ground | Foreground | Ratio | Verdict | Where |
| --- | --- | ---: | --- | --- |
| maroon | white | 12.41 | AA | Nav hover |
| white | maroon | 12.41 | AA | Service cards |
| offwhite | maroon | 9.77 | AA | "How We Work" headings |
| pink | midnight | 8.82 | AA | Review card body |
| maroon | pink | 8.51 | AA | Hero body, nav links |
| blue | pink | 7.25 | AA | Testimonials band |
| maroon | sandybrown | 6.64 | AA | Hero H1 |
| green | sandybrown | 5.86 | AA | "What We Do" |
| sandybrown | green | 5.86 | AA | Founder band |
| gold | white | 5.50 | AA | Hover on gold |
| **offwhite** | **gold** | **4.33** | large-text only | **Primary body copy, every interior page** |
| gold | offwhite | 4.33 | large-text only | Case Studies band |
| pink | gold | 3.77 | large-text only | Footer links |
| white | tomato | 3.16 | large-text only | Accent icons on cards |
| **pink** | **tomato** | **2.17** | **fail** | Footer logo, "Get in Touch" button |
| **sandybrown** | **white** | **1.87** | **fail** | `hover:text-white` on founder band |
| **white** | **sandybrown** | **1.87** | **fail** | — |
| **pink** | **white** | **1.46** | **fail** | `hover:text-white` on footer band |
| **offwhite** | **white** | **1.27** | **fail** | `hover:text-white` on all light bands |

Two findings matter:

1. **`hover:text-white` is applied unconditionally** in `NavigationBar.astro` and `Footer.astro`, regardless of which band the component sits in. On offwhite (1.27), pink (1.46) and sandybrown (1.87) grounds the hover state is effectively invisible — the link *disappears* on hover. This is the direct consequence of §1: components don't know what colour they're standing on.

2. **The most-used text pairing on the site fails AA for body copy.** `text-gold` on `bg-offwhite` is 4.33 — under the 4.5 threshold. That's the reading experience on `/services`, `/training`, `/downloads`, `/blog`, `/privacy-policy` and every blog post.

### 2.5 The logo is recoloured with filter hacks

`src/styles/logo-filters.css` holds seven `filter: invert() sepia() saturate() hue-rotate() brightness() contrast()` matrices, because the logo ships as a black SVG (`full-logo-black.svg`) that gets tinted in CSS rather than having its `fill` set. Consequences: the logo cannot be re-tinted without recomputing a filter matrix by hand, two of the hovers need `!important`, and the tints only approximate the tokens they're named after.

---

## 3. Typography

### 3.1 The face

**Neue Haas Unica Pro**, one family, no pairing. A 2015 Toshi Omagari revival of Haas Unica — a genuinely good, quietly neutral grotesque in the Helvetica lineage. It is the strongest asset in the current design language and there is no reason to replace it.

It is, however, being wasted:

- **18 TTF files ship in `public/fonts/` — 2.21 MB.** Twelve are declared in `fonts.css`; six (`Black`, `BlackIt`, `XBlack`, `XBlackIt`, `UltraLight`, `UltLightIt`) are never declared at all. Of the twelve declared, **four weights are actually used**.
- Format is **TTF, not WOFF2**. WOFF2 would cut each file by roughly 60%.
- Two faces are preloaded (`Light`, `Bold`) but `fonts.css` is a separate `<link>`, so the stylesheet is a render-blocking round-trip before the preloaded fonts can be matched.
- No `unicode-range`, no variable font, no `size-adjust` on the fallback — so the swap from Helvetica shifts layout.

### 3.2 The scale

Nine computed sizes in use across the site:

| px | Weight(s) | Line-height | Ratio to next |
| ---: | --- | ---: | ---: |
| 60 | 600 | 60 (1.00) | — |
| 48 | 600 | 48 (1.00) | 1.25 |
| 36 | 600 | 40 (1.11) | 1.33 |
| 30 | 600 | 36 (1.20) | 1.20 |
| 24 | 200, 600 | 32 (1.33) | 1.25 |
| 20 | 300, 600 | 28 (1.40) | 1.20 |
| 18 | 300, 600, 700 | 28 (1.56) | 1.11 |
| 16 | 300, 400, 500, 600, 700 | 24 (1.50) | 1.13 |
| 14 | 400, 600 | 20 (1.43) | 1.14 |

This is not a scale — it's an accumulation of whichever Tailwind class was nearest to hand. The ratios wander between 1.11 and 1.33, and the four steps from 20px down to 14px are visually indistinguishable from each other in running text.

Three further problems:

- **Display type runs at line-height 1.00.** `text-5xl` and `text-6xl` inherit Tailwind's own tight leading. The 48px section headings — which are frequently two or three lines — set solid, with no optical compensation. It reads as cramped rather than confident.
- **Letter-spacing is `normal` everywhere.** Nothing is tracked. The all-caps nav (`SERVICES TRAINING CLIENTS BLOG`) has no positive tracking, which is exactly where caps need it most; the 60px hero has no negative tracking, which is exactly where a grotesque needs it.
- **Weight use is inconsistent by accident.** `font-semibold` (600) does all heading work — 75 uses — and `font-light` (300) is the intended body weight at 58 uses. But the browser reports 63 nodes at 300 and **77 at 400**: a large amount of body copy carries no weight class at all and silently falls to Regular. Two body weights are in play and neither was chosen.
- Six of the family's weights appear (200/300/400/500/600/700) for what is really a two-weight design.

### 3.3 Alignment and measure

Alignment changes band to band with no rule: hero centred, "What We Do" left, "How We Work" centred, "Case Studies" left, "Clients" left, founder left-inside-a-centred-column. `text-justify` is used on the founder bio (and safelisted in the Tailwind config), which in a 2-column-ish measure produces visible rivers.

`.section-shell` caps the content column at `90rem` (1440px) with gutters at 2/4/6rem. That cap is applied to the *section*, so on the wide bands running text can reach ~1200px — roughly 150 characters. Nothing constrains measure independently of the layout container.

---

## 4. Form, space, motion

| Dimension | Current state |
| --- | --- |
| **Radius** | `rounded-lg` (8px) × 30, `rounded-full` × 8, `rounded-md` × 2. Effectively a single radius applied to everything from a 44px pill to a 400px card. |
| **Elevation** | Six different shadow values across 21 uses: `shadow-md` ×12, `drop-shadow-md` ×3, `shadow-xl` ×2, `shadow` ×2, `drop-shadow-lg` ×1, `drop-shadow-2xl` ×1. No elevation system; `shadow-*` and `drop-shadow-*` are mixed for the same intent. All are Tailwind's default black-alpha shadows, which turn muddy on saturated grounds. |
| **Borders** | Almost none. `border-white` ×4, all on the mobile menu. No border token, no hairline. |
| **Spacing** | Tailwind default scale plus three unused extensions (`128`, `144`, `160`). Section padding is ad-hoc: `py-6`, `py-8`, `py-12`, `py-16`, `py-20`, `py-24`, `py-[9rem]`. No vertical rhythm. |
| **Breakpoints** | Custom and unusual: `mobile-only` ≤480, `sm` 480, `md` 768, `lg` **1150**, `no-desktop` ≤1149, `xl` **2400**. The 1150 desktop breakpoint means 1024–1149px devices get the mobile layout. `xl` at 2400 is essentially never reached. |
| **Motion** | Two keyframe animations (one dead). Awards marquee at 45s linear, correctly gated behind `prefers-reduced-motion`. Otherwise: `duration-200` ×3, `duration-300` ×2, and hover transitions on 5 elements. No entrance motion, no scroll response, no focus transitions. The site is static. |
| **Focus states** | None authored. Browser default outline only — which on maroon and blue grounds is barely visible. |

---

## 5. System health — what constrains a redesign

These aren't aesthetic issues, but they determine how cheaply the aesthetics can be changed:

1. **17 dynamically-interpolated Tailwind classes** across `NavigationBar`, `Footer`, `GetInTouch` and `ActionBanner` — `bg-${helloBg}`, `text-${textColour}`, `text-${mobileText}`, etc. Tailwind's JIT cannot see these. They currently render **only because the same literal strings happen to appear elsewhere in the codebase**. Renaming or removing any token silently breaks them with no build error. Any retokenisation has to fix these first.
2. **Colour is passed as a string prop** (`textColour="gold"`, `logoColour="tomato"`, `helloBg="blue"`) rather than resolved from context. This is the mechanism behind the `hover:text-white` contrast failures in §2.4 — the component is told its colour by every call site, and every call site has to remember.
3. **Logo tinting via CSS filter matrices** (§2.5) means the logo can't participate in a new palette without hand-recomputed filters.
4. **Dead code**: `.tool-list`, `.animate-banner` / `continuousScroll`, `bg-primary`, `midnight`, the `white` override, the `128/144/160` spacing extensions, and 6 undeclared font files.

---

## 6. Summary — the five things that make it read as 2021

1. **Full-bleed saturated colour blocking with no neutral rest** — 89% of the homepage is a strong hue. This is the single most dating characteristic.
2. **No systematic tokens.** Colours named by appearance not role; no greys, no surfaces, no semantic layer, no elevation scale, one radius.
3. **Typography set by default.** A good typeface at Tailwind's default sizes, default leading and zero tracking — the face is neutral, and nothing has been done to give it a voice.
4. **Uniform 8px radius plus muddy default shadows** on every card, button and tile.
5. **No motion, no focus states, no depth.** Nothing responds. Contemporary sites signal quality partly through material behaviour — hover, focus, scroll, transition — and there is essentially none here.

The good news: the **content structure, the typeface, and the underlying colour instincts are sound**. Maroon/sandybrown/pink is a genuinely distinctive combination and nothing about it is inherently dated. What's dated is the *application* — the blocking, the lack of neutrals, the untuned type. That's addressable without touching a single word of copy or moving a single section.

---

---

# Part two — the 2026 revision

Direction agreed: **keep the hues, rebuild the system. Warm modernism.**
Constraint held throughout: content and page structure unchanged — every section on
every page is still there, in the same order, saying the same thing.

## 7. The reframe

Converting every token to HSL settled the palette question outright:

| Token | Hex | Hue | Sat | Light | |
| --- | --- | ---: | ---: | ---: | --- |
| offwhite | `#efe2d7` | **27°** | 43% | 89% | pale, desaturated |
| sandybrown | `#ffab5c` | **29°** | 100% | 68% | |
| gold | `#7d6544` | **35°** | 30% | 38% | dark, desaturated |
| tomato | `#fa5a50` | **4°** | 94% | 65% | |
| maroon | `#6d012d` | **336°** | 98% | 22% | |
| pink | `#fec8d2` | **349°** | 96% | 89% | |
| midnight | `#1c3159` | 219° | 52% | 23% | outlier |
| blue | `#313978` | 233° | 42% | 33% | outlier |
| green | `#2b422b` | 120° | 21% | 21% | outlier |

**Six of the nine colours already sat in a single ~65° arc of red-orange.** `gold` was
never a separate brand colour — it is a dark, desaturated sandybrown. `offwhite` is a
pale one. What looked like a nine-colour palette was really *one hue in six values,
plus two navies and a green*.

That reframes the whole problem. The site didn't need a new palette; it needed the
outliers removed and the remaining family expressed as an actual ramp. So the redesign
keeps maroon, tomato, sandybrown and pink at their exact original hex values, fills in
the missing steps around them, and replaces `gold` and `offwhite` with a proper
warm-biased neutral scale — which is the job they were already doing badly.

## 8. The new token system

`ink` — warm neutral scale, 12 steps, `#FBF9F7` → `#121010`. This is what the site
did not have: greys, surfaces, borders, muted text.

`brand` — one ramp. The four originals keep their exact hex values:

| Token | Hex | Provenance | Rule |
| --- | --- | --- | --- |
| `brand-900` | `#5A0125` | derived | deepest ground |
| `brand-800` | `#6D012D` | **was `maroon`** | dark grounds; heading accent on light |
| `brand-600` | `#A81E33` | derived | text and links on light — 6.90:1 |
| `brand-500` | `#D83B2E` | derived | action surfaces. **Not** text on light (4.36:1) |
| `brand-400` | `#FA5A50` | **was `tomato`** | decorative, or text on dark only |
| `brand-300` | `#FFAB5C` | **was `sandybrown`** | accent on dark. Never text on light (1.78:1) |
| `brand-200` | `#FFD3A6` | derived | tint |
| `brand-100` | `#FEC8D2` | **was `pink`** | tint surface |
| `brand-50` | `#FDEDE9` | derived | palest wash |

Dropped: `green`, `blue`, `gold`, `midnight`, and the `white` no-op.

Also new: a strict type scale with leading and tracking baked into every step, four
elevation levels using maroon-tinted rather than black shadows, a spacing rhythm for
section padding, a radius scale, and easing tokens.

## 9. Results, measured

| | Before | After |
| --- | ---: | ---: |
| Homepage that is saturated brand colour | **88.9%** | **29.3%** |
| Colour tokens | 10, named by appearance | 21, named by role |
| Distinct hues on the homepage | 7 | 1 (+ neutrals) |
| Type steps | 9, ratios 1.11–1.33 | 12, strict, leading + tracking per step |
| Display line-height | 1.00 | 0.95–1.07, tuned per step |
| Letter-spacing | `normal` everywhere | −0.04em display → +0.12em labels |
| Font payload | 18 TTF, **2.21 MB** | 4 WOFF2, **45 KB** |
| Dynamically-interpolated classes | 17 | 0 |
| CSS logo filter hacks | 7 | 0 |
| Contrast failures | 5 pairings, incl. body copy | 0 across all 9 page types |
| Focus states | none authored | tone-aware, both grounds |
| Broken internal links | 1 | 0 |

## 10. What changed structurally (not visually)

- **`Section` owns its ground and foreground together** via a `tone` prop. This is the
  root-cause fix for §2.4: components no longer have to be told what they are standing
  on, so `hover:text-white` can't land on an offwhite band again.
- **`NavigationBar`, `Footer`, `GetInTouch`, `ActionBanner`** take a static `light`/`dark`
  tone instead of interpolating colour names into class strings.
- **`Logo.astro`** inlines the SVG with `fill="currentColor"`, deleting
  `logo-filters.css` entirely.
- **`.prose-fm`** styles long-form markdown with descendant selectors, so the Tailwind
  `safelist` is gone. It also constrains the measure to 68ch, drops `text-justify`, and
  forces the five hardcoded-width SlideShare/YouTube embeds to be responsive — they were
  scrolling phones sideways.
- **`PageHero` and `PostCard`** were extracted from duplicated markup.
- Dead code removed: `.tool-list` + its hardcoded `#313978`, `.animate-banner`,
  `bg-primary`, the unused spacing steps, and 18 orphaned font files.

## 11. Bugs found and fixed along the way

1. `ProfilePicture` rendered `w-${width} h-${height}` defaulting to **80×64 px** — a
   non-square image forced into `rounded-full`.
2. `GetInTouch`'s `buttonColour` switch fell through to `bg-red-400`, a stock Tailwind
   colour never in the palette.
3. The founder portrait was a lazy `<img>` with no intrinsic dimensions, so its container
   collapsed to zero height until the file loaded — a layout-shift bug, now an `<Image>`.
4. The awards marquee's duplicate track is off-screen horizontally, so its `loading="lazy"`
   images never entered the viewport and never loaded; the strip went blank mid-loop.
5. `/blog/why-is-online-qual-more-inspiring-than-traditional-methods` was linked from the
   homepage and **has never existed**. Now rendered as plain text rather than pointed
   somewhere it doesn't belong — the post still needs writing.
6. `lg` at 1150px put 1024–1149px devices on the mobile layout. Now 1024px.

## 12. Open items

- The "Inspiring" principle needs its post written, or a decision about where it should link.
- `https://swingers.club/uk`, linked from one blog post, returns 403 to a HEAD request.
  Likely bot filtering rather than a dead link, but worth an eyeball.
- The seven award badges are still mismatched raster PNGs with white artwork on
  transparency. They constrain that strip to a dark ground. Re-cutting them as a single
  consistent set — or replacing them with a typographic list — is the remaining upgrade.
- No dark mode. The palette would support one; nothing has been built.
