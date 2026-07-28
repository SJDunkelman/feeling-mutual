# Polish plan — post-redesign

**Date:** 2026-07-28
**Branch:** `worktree-brand-redesign`, on top of `2a7d67a`
**Status:** **implemented.** See §0 for what shipped and which open decisions were
taken unilaterally.

---

## 0. Implementation record

Measured on the production build after the pass:

| | Before | After |
| --- | ---: | ---: |
| Hairline edges site-wide | 185 | **17** |
| — of which `/blog` | 78 | 9 |
| — every other page | 2–36 | **1** |
| What We Do cap-top misalignment | 39.33px | **0.53px** |
| Content width monotonic across breakpoints | no — two −47px cliffs | **yes** |
| Footer tap targets | 20×20 (WCAG 2.5.8 fail) | **44×44** |
| Burger tap target | 26×26 | **46×46** |
| Desktop nav appears at | 1024px | **768px** |
| Section eyebrows | 15 | **6** |
| Dead config tokens | 17 | **0** |
| Dead CSS custom properties | 9 of 15 | **0** |

Contrast, overflow, broken images, failed requests and alt coverage re-verified
clean across all 9 page types at 1440px and 390px.

The 17 remaining hairlines: one footer rule per page (9), plus 8 edges on the two
`/blog` category pills, where the border is what makes a filter read as a control.

### Open decisions — taken, and how

The instruction was "implement" with §7 unanswered, so each was decided rather than
blocked on. All are one-line reversals.

| | Decision | Taken | Why |
| --- | --- | --- | --- |
| D1 | Cut 8 redundant eyebrows | **done** | Explicitly asked for |
| D2 | Row dividers | **removed entirely** (`/arrange`) | `gap-16` reproduces the exact previous row-to-row distance, so rhythm is unchanged |
| D3 | Lucide icons | **all 11 removed** | Three were wrong, not merely decorative: `Recycle` is the recycling symbol, `BadgeCheck` a verification convention, `ConciergeBell` a hotel front desk. Paired with `gap-x-16` so proximity groups instead — `/arrange` was right that *something* had to anchor the tile |
| D4 | Rule in What We Do | **zero** | Consistent with the brief; the 112px gap does the work |
| D5 | `PostCard` border | **removed, no shadow** | The `shadow-e1` middle path would have reintroduced "rounded rectangle + drop shadow", which the audit named as a dated tell. Text now sits flush to the image edge instead |
| D6 | Founder offset panel | **kept** | The only large `brand-300` field on a light ground; removing it would shift the page's colour balance |
| D7 | Spacing ladder | **applied** | Structurally required once the rules went — 56px below an 80px heading is less than that heading's own leading |

### Also fixed, beyond the plan

The `href: null` guard from the previous commit left the "Inspiring" row visually
identical to its two live siblings while doing nothing, plus an orphaned
`group-hover:` class that could never fire. Linked rows now carry a permanently
visible arrow at 40% opacity, so the inert row reads as non-interactive by design.
The same `opacity-0 → group-hover` pattern in `CaseStudyGrid` was also hiding its
arrow from every touch device; it now rests at 40% too.

### Second pass — the items originally held back

All subsequently implemented.

**Copy restored from `87f6c6b^`.** The Astro migration had rewritten three pages
from scratch and replaced the client's copy with filler; the redesign preserved it.

- **`/services`** — all four service descriptions restored verbatim. The originals
  explain that the offer is *modular* ("If you can moderate and report, we can just
  design the method and sample…"), which is the actual sales proposition and which
  the filler ("ensures seamless execution from start to finish") entirely lost.
- **`/training`** — all four module descriptions restored. The filler versions were
  written to an identical imperative-verb + object + adverbial metre, four times
  running.
- **`/downloads`** — heading and intro restored ("Premium insight straight to your
  inbox" / "Select any of our premium whitepapers below and we'll email them to you
  for free"). The two whitepaper *titles* were genuine and kept; their descriptions
  were **deleted, not rewritten** — the original page had none, and the migration
  had invented claims about documents nobody here has read. Not restored: the
  original's placeholder testimonial, attributed to "John Smith, CEO, Apple".

**Blog card image cropping.** Case studies use the client's brand mark as their
showcase image, and `object-cover` at 16:10 was cutting them to "SETA", "UEFA",
"BBC Worldwid". Logos now get `object-contain` with padding; photographs still fill
the frame. `/category/*` passes `category` for the fit and a separate
`showCategory` flag for the label, so the treatment is right on both pages.

**Category pluralisation.** `/category/case-study` was headed "Case study" for a
list of seven. Naive suffixing can't fix it — "case-study" + "s" gives "Case
studys" — so `src/lib/posts.ts` now carries a display-name map with `categoryName`
(singular, for breadcrumbs and card labels) and `categoryNamePlural` (for listing
pages and filters).

**Nav "Clients" → destination mismatch.** `id="clients"` sits on the case-study
grid, while the section actually about clients is two lower and has no id. Label
renamed to "Case studies" in nav and footer, so it names where it goes.

**Case-study posts' close.** The two closes were the wrong way round: articles got
the contact CTA and case studies got the downloads banner — so the highest-intent
reader on the site, someone who has just read how you grew a client's category, was
given no way to make contact. Swapped. `ActionBanner` also rebuilt to match
`GetInTouch`'s shape (display heading, supporting copy, real button) rather than a
40px heading with an inline text link.

**Article column centred.** Raised by the client mid-pass: `.prose-fm` was capped at
68ch but left-aligned inside the 1320px band, so on a wide window a ~580px column of
text sat with ~700px of empty page beside it. The original rationale — that it shared
a left edge with the title and byline — never read, because those sit in the dark
block above. Now `margin-inline: auto` at 72ch, and the post header uses the same
72ch column so breadcrumb, title and byline sit directly above the copy they belong
to. Measured at 1920px: 647px of margin either side, header and body sharing one
left edge.

### Still open

- **`/training` no longer mentions that it is a video series.** The pre-migration
  page was "Online Qual Mastery", with a video player and counters for researchers
  taught / hours of video / downloads. The module copy is restored but that framing
  is not, because I can't verify the series is still offered or that the numbers are
  current. Worth a decision.
- The "Inspiring" principle still needs its post written.

---

Follows client review of the 2026 redesign (`docs/BRAND-AUDIT-2026.md`). Four
`impeccable` lenses were run in parallel as read-only analysis — `/distill`,
`/arrange`, `/clarify`, `/polish` — and their findings triaged against the
client's own comments below.

Numbers marked **✓verified** were re-measured independently against the production
build at 1440px; the rest are as reported by the analysis agents.

---

## 1. What the client said

Verbatim intent, from review:

> "the little lines that are used everywhere … I find that very generic and sloppy …
> it's in every single section … a lot of them, it's actually repetitive and unnecessary"

> "our clients / what clients say about us — we don't need to introduce our clients
> if we've already got the heading saying what clients say about us"

> "the subtitle could be brought lower so it's more in line with the actual heading
> rather than the little caption"

> "We definitely can't change the colour, and actually, the colour palette and the
> typography is fine. I think it works really well. I also think that the current
> redesign, in terms of the rhythm of the typography sizing, is quite nice."

### Locked — not to be touched

| | |
| --- | --- |
| Colour palette | every `ink` and `brand` token, unchanged |
| Type scale | sizes, leading, tracking, the sizing rhythm — client explicitly likes it |
| Homepage hero | unchanged |
| Awards marquee + its caption | client called out both as good additions |
| Page structure | no sections added, removed or reordered |

### Explicitly in scope, despite the "no content change" framing

Cutting redundant eyebrow **text** is content removal, and two agents flagged it as
a constraint conflict. It isn't — the client asked for it directly. Treated as in
scope throughout.

---

## 2. The problem, measured

**185 hairline border edges site-wide.** The redesign replaced "every section is a
full-bleed colour band" with "every section is a hairline rule" — the same monotony
in a quieter device.

| Page | edges | of which eyebrow rules |
| --- | ---: | ---: |
| `/blog` | 78 | 0 |
| `/category/article` | 42 | 0 |
| `/` | 36 | 5 |
| `/training` | 8 | 1 |
| `/services` | 6 | 0 |
| `/blog/<post>` | 6 | 0 |
| `/downloads` | 5 | 0 |
| `/privacy-policy`, `/404` | 2 each | 0 |
| **total** | **185** | **6** |

Mobile is identical — nothing about the line count is responsive.

**The decisive argument for deletion is already in the codebase.** ✓verified:
`PageHero.astro:23` and `404.astro:14` use a bare `.eyebrow` with no rule. Only six
call sites use `eyebrow-rule`, five of them on the homepage. So **7 of 9 pages already
ship the rule-less variant** and nothing is missing. This is removing an
inconsistency, not introducing a device.

---

## 3. Section A — the lines

### A1. Delete `.eyebrow-rule` entirely — P0

`src/styles/global.css:105–111`. Six call sites: `index.astro:85, 119, 159, 176, 238`
and `training.astro:30`.

It is 1px at 25% opacity and it separates nothing. ✓verified: in What We Do the rule
terminates at **x=696** while the copy it appears to underline starts at **x=856** —
it points at a 160px void. Lengths are arbitrary and differ per section (6/12, 5/12,
6/12 on one page).

*Carry-over:* the class bundles `pb-8`, so removing it removes the eyebrow→heading
gap. Replace with `mb-8` on the eyebrow — the pattern `PageHero` already uses.

**−5 homepage, −6 site.** No replacement device needed.

### A2. `PostCard` outline — P0, and the single biggest win

`src/components/PostCard.astro:31` — `border border-ink-200 bg-ink-50`.

✓verified: the card sits inside `Section tone="paper"`, which is **itself `bg-ink-50`**.
The fill is a literal no-op; the border does 100% of the card's work. 17 cards on
`/blog`, 10 on `/category/article`.

*Risk — the largest in this document.* Removing it changes the look more than
anything else here, and `p-6` floats without a container. Proposed mitigation: drop
`border` / `bg-ink-50` / `overflow-hidden`, keep `rounded-lg` on the image wrapper
only, and change `p-6` → `pt-5` so text aligns flush to the image edge — a stronger
alignment device than the box. Hover affordance survives: title colour change and
arrow translate are already there.

**`/blog` −68, `/category/*` −40.**

### A3. Testimonial cards — two devices for one job — P1

- `CustomerReviewCard.astro:22` — `border border-brand-100/15` **and**
  `bg-brand-100/[0.06]`. On the maroon ground the 6% tint alone defines the card. **−12**
- `CustomerReviewCard.astro:27` — `border-t` on the figcaption. The `mt-auto` push,
  the padding and the 44px avatar already separate attribution from quote. **−3**

No risk — the tint fill is untouched, so the card boundary doesn't move.

### A4. Service tile top stubs — P1

`ServiceCard.astro:30` (×4 on `/`) and `services.astro:46` (×4).

At desktop these render as four disconnected half-column segments at a shared y — an
incomplete table rule. On `/services` it's two rows of two stubs, which reads as a
broken grid.

**−4 homepage, −4 `/services`.** See §7 D3 — this interacts with the icon decision.

### A5. Case study grid — drop the frame, keep the cells — P1

`CaseStudyGrid.astro:15`.
- `border border-ink-200` (outer frame) — **decorative**, it's what makes the block
  read as a spreadsheet. **−4**
- `gap-px bg-ink-200` (interior cell lines) — **load-bearing, keep.** Six client logos
  at wildly different aspect ratios genuinely need cells or they read as a scatter.

Once every decorative rule is gone this becomes the site's *only* ruled object, which
turns a repetition into a deliberate accent.

### A6. Row lists — halve, don't remove — P2

`index.astro:133` (3 items → 4 lines), `training.astro:36` (4 → 5),
`downloads.astro:37` (2 → 3). `first:border-t` + `border-b` produces one more line
than there are gaps.

Interior dividers are load-bearing. The **first** and **last** are decorative — they
frame a list against section padding that already has 96–128px of air. Fix:
`[&:not(:last-child)]:border-b`.

**−4 homepage, −2 training, −2 downloads.**

> ⚠️ `/arrange` disagrees and would remove these entirely, converting to `gap-16` —
> which happens to be the exact current row-to-row distance, so rhythm is unchanged.
> See §7 D2.

### A7. Footer's second rule — P1

`Footer.astro:72` — two horizontal rules within ~200px. The `mt-12` plus the drop to
caption size at 60% opacity already marks the copyright line as terminal.
`Footer.astro:43` is **load-bearing, keep** — it's the one border on the site sitting
at a real seam with no colour change to mark it. **−9 site-wide.**

### A8. Smaller line removals — P2

| `file:line` | what | why |
| --- | --- | --- |
| `global.css:169` | `.prose-fm iframe` border | embeds have their own hard edges |
| `NavigationBar.astro:86,88` | mobile menu `border-t` + per-`li` `border-b` | 5 lines in a drawer already delimited by being open |
| `blog/index.astro:29` | 2 category pills, 8 edges | every card already prints its category as text — marginal, flagged only |

### Net effect on lines

| Page | now | after | |
| --- | ---: | ---: | ---: |
| `/` | 36 | 3 | −92% |
| `/blog` | 78 | 1 | −99% |
| `/category/article` | 42 | 1 | −98% |
| `/services` | 6 | 1 | −83% |
| `/training` | 8 | 4 | −50% |
| **site** | **185** | **~15** | **−92%** |

The three left on the homepage: two interior How-We-Work dividers and the footer's
top rule. Each sits between two things.

---

## 4. Section B — the eyebrows

The rule extracted from the client's comment: **an eyebrow earns its place only if it
says something the heading doesn't.** The benchmark is the awards caption — "Seven
industry awards and shortlistings, 2013–2021" carries a count and a date range found
nowhere else. Measured against that, most fail.

| `file:line` | Eyebrow | Heading above it | Verdict |
| --- | --- | --- | --- |
| `AwardsMarquee.astro:42` | Seven industry awards… | — | **KEEP** — protected, and the benchmark |
| `index.astro:85` | What we do | "Curate authentic conversations…" | **KEEP** — heading is a subject-less infinitive; the eyebrow supplies the frame |
| `index.astro:119` | How we work | "We inform agile workflows…" | **KEEP as a pair with the above** — weak alone; cut one, cut both |
| `blog/index.astro:18` | Blog | "Insights on online qualitative research" | **KEEP** — names the format vs the subject, and it's the only "you are here" signal (nav has no active state) |
| `category:32` | Category | "Article" | **KEEP** — an h1 reading just "Article" is unparseable without it |
| `privacy-policy.astro:11` | Legal | "Data protection and security policy" | **KEEP** — classifies rather than restates |
| `index.astro:238` | Why Feeling Mutual | *(none — it is the de-facto heading)* | **RELABEL → "Our purpose"** — "Why [Brand]" promises "why choose us" but the copy answers "why we're called that" |
| `index.astro:159` | Case studies | "Examples of our work" | **CUT** — definitional restatement |
| `index.astro:176` | Our clients | "What clients say about us" | **CUT** — the client's own example |
| `GetInTouch.astro:40` | Get in touch | *(headline prop)* | **CUT** — restates all three headline variants, and "Email Tom" says it a third time 30px away |
| `services.astro:37` | Our services | "Online qualitative research" | **CUT** — the word appears 5× on one screen |
| `training.astro:21` | Training | "Online qualitative research **training**" | **CUT** — the eyebrow is the last word of the heading |
| `downloads.astro:28` | Resources | "Free downloads" | **CUT** — near-synonym, and "downloads" is more concrete |
| `training.astro:30` | Course modules | "Four modules, run in sequence" | **CUT** |
| `404.astro:14` | Error 404 | "This page doesn't exist" | **CUT** — the status code helps nobody who reads this page |

**8 cut, 6 keep, 1 relabel.**

Note the provenance of two of these: `GetInTouch` and `training` both had the client's
own `<h2>` **demoted to an eyebrow** during the redesign, with a new headline invented
above it. The eyebrow is the leftover in both cases.

---

## 5. Section C — alignment

### C1. The bug the client named — P0

`src/pages/index.astro:83–100`.

✓verified at 1440px: the body copy's cap-top sits **39.33px above** the heading's
cap-top, and **20.7px below** the eyebrow's. It is optically locked to the caption,
exactly as described.

**Root cause is structural, not a padding miss.** The eyebrow and h2 are one grid
child (`lg:col-span-6`); the body is a sibling (`lg:col-span-5 lg:col-start-8`). Both
box-tops pin to the same row line, so there is nothing to align to. The `lg:pt-4`
currently there is a guess that lands near neither target.

**Fix:** hoist the eyebrow to its own full-width row so heading and copy share the
next row.

```astro
<div class="grid gap-x-12 lg:grid-cols-12">
  <p class="eyebrow mb-6 text-brand-600 lg:col-span-12 lg:mb-8">What we do</p>
  <h2 class="text-display text-ink-900 max-w-display lg:col-span-6 lg:row-start-2">…</h2>
  <div class="mt-12 flex flex-col gap-6 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:mt-0 lg:pt-1.5">…</div>
</div>
```

**The optical adjustment.** Naive box-top alignment is wrong — the two elements have
opposite half-leading. `text-display` runs `line-height: 1.0` on a `1.5em` content box,
so its first line sits 20px *above* its own box top; `text-lg` at 1.55 sits 0.5px below.
Cap-top delta = 6.78px, so the copy column needs `lg:pt-1.5` (6px). Agent-verified
across the range: +0.45px at 1024, −0.78px at 1280/1440/1600. Sub-pixel everywhere.

Must stay `lg:`-scoped — at the clamp's 44px floor the required offset falls to ~0, and
mobile is single-column with no alignment relationship.

*Why cap-top, not baseline:* first-baseline alignment would drop the 20px copy 73px to
meet the 80px heading's baseline, landing it level with the heading's **second** line.
Cap-top is the editorial standard at a 4:1 size ratio, and it is what "in line with the
actual heading" means.

### C2. Every `pb-*` alignment fudge is wrong, and deleting it fixes it — P1

`items-end` aligns margin-box bottoms. For `text-display` the last-baseline offset is
−7.00px; for `text-lg` it is −7.50px. The display's negative half-leading almost
exactly cancels its larger descender, so **plain `items-end` already baseline-aligns to
0.5px for free.** Every `pb-*` layered on top is pure error:

| `file:line` | current | error now | after deleting |
| --- | --- | ---: | ---: |
| `index.astro:162` Case Studies | `md:items-end md:pb-3` | 12.50px | 0.50px |
| `index.astro:181` Clients link | `md:items-end md:pb-3` | 12.02px | 0.02px |
| `PageHero.astro:27` intro | `lg:self-end lg:pb-2` | 8.50px | 0.50px |

Three class deletions, zero additions.

`GetInTouch.astro:38,44` currently measures 0.83px — **accidentally** correct, because
the button row happens to be 84px tall. Worth fixing to the rule anyway; any copy
change breaks it silently.

`downloads.astro:40` uses `md:items-baseline` and is **the only one built right.** Use
it as the precedent.

### C3. The rule, stated once

> **Never align boxes; align text.** The eyebrow occupies its own full-width grid row.
> Heading and supporting copy share the next row. The copy column carries `lg:pt-1.5`
> as optical cap compensation. No column gets a `pb-*` or `pt-4` fudge to fake alignment.
>
> **Exception:** where the right column is a single line of trailing action
> (`index.astro:181`), keep `md:items-end` with **no** padding.

### C4. `PageHero` is the odd one out — P1

Five of six heading-left/copy-right sections already resolve to an identical **160px
void** with the copy column at **x=856**. `PageHero.astro:22,27` is the only breaker —
`col-span-8`/`col-span-4` puts its copy 112px further right and 112px narrower, so
every interior page's intro sits on a different vertical line from every homepage
section's.

Fix: `lg:col-span-8` → `lg:col-span-7`; `lg:col-span-4` → `lg:col-span-5 lg:col-start-8`.
Agent-verified across all five pages using it — no h1 gains a line, and `/services`'
intro drops 4 lines → 3.

> ⚠️ This is a visible change to interior heroes. The homepage hero is untouched.

---

## 6. Section D — spacing, now that lines aren't separating

With the hairlines gone, whitespace carries the load. Section-level separation is fine
— 256px of ground plus a tone change is unmistakable, and no divider was ever doing
that job. **The mush is intra-section.**

Current ladder: **256 : 80 : 56 : 48 : 24 : 12**. The 80 and 56 are a 1.43× ratio —
not readable as different levels — and there's a 4× jump from 48 to 12 with nothing
between, so once card rules go there's no step that says "this block ends here."

Proposed: **256 : 112 : 64 : 24 : 12**, each step ~2× the last.

| step | value | use | changes |
| --- | --- | --- | --- |
| major | 112px | section header → its content run | `index.astro:103` `pt-20`→`pt-28`; `:157`,`:174` `pb-14`→`pb-28`; `blog/index.astro:26`, `category:41` `pb-14`→`pb-28` |
| run | 64px | between items in a run | `index.astro:103` → `gap-x-16 gap-y-16`; `:125` list `gap-16` |
| block | 24px | between blocks inside an item | mostly correct already |
| line | 12px | inside a block | unchanged |

**Where it will read as mushy without this:** `index.astro:157` and `:174`, where 56px
separates an 80px display heading from the block below. 56px is **0.7 of one line** of
the type above it — the gap below the heading is smaller than the gap between its own
lines. With rules gone the content will look like it belongs to the heading's last line.

Also: `ServiceCard` external:internal is currently **40:16 = 2.5:1**, below the ~4:1
proximity needs to group without a rule. Raising to `gap-x-16` narrows cards 294→276px
and — agent-measured — leaves every description's line count **identical**. Free.

> ⚠️ **Needs sign-off.** These are vertical-rhythm changes. They don't touch the *type*
> scale or `Section`'s `pad` tokens, but if "sizing rhythm" is read to include
> section-internal spacing, this section is out until approved.

---

## 7. Decisions needed

### D1. Redundant eyebrow text — 8 cuts
In scope per the client's own words. Confirm the list in §4, particularly the
"Why Feeling Mutual" → "Our purpose" relabel, which is a rename rather than a cut.

### D2. Row-list dividers — the two lenses disagree
`/distill` says keep interior dividers, drop only first/last (**−4** homepage).
`/arrange` says remove all and convert to `gap-16`, which preserves the exact current
row-to-row distance (**−4** and a cleaner result, but three undivided rows may read
loose). **Recommend `/arrange`'s version, checked visually, with `/distill`'s as the
fallback if it reads mushy.**

### D3. The four Lucide icons — the two lenses disagree, and this was already an open question
`/distill`: remove all 11 icons — zero information carried, three are actively wrong
(`Recycle` is the **recycling** symbol, not iteration; `BadgeCheck` is a social-media
verification convention; `ConciergeBell` is a hotel front desk). And: *"remove the
stubs and the icons together, not one or the other — removing only one leaves the tiles
unanchored."*
`/arrange`: keep the icons, because with the `border-t` gone the 26px brand-500 icon
becomes the tile's anchor.

They cannot both be right. **My read: `/distill` is right about the icons being wrong
(`Recycle` for "Agile" is genuinely a misuse), `/arrange` is right that something must
anchor the tile.** The resolution is to remove the icons *and* apply the `gap-x-16`
widening, so proximity does the grouping instead. But this is your call and it's the
one item here that changes how the section reads.

### D4. One structural rule in What We Do, or zero?
Still open from before. With the four stubs gone, a single full-width rule between the
intro block and the service row would mark a real structural break. Or zero.

### D5. `PostCard` border removal
The biggest visual change in this document. Confirm before it goes in.

### D6. The founder offset panel
`index.astro:221` — the orange block behind the portrait, marked `aria-hidden` by its
own author. `/distill` says remove it (the portrait also has `shadow-e2`, so it has two
elevation devices). ⚠️ It is the **only large field of `brand-300` on a light ground**
anywhere on the site — removing it shifts the page's colour balance visibly, though it
changes no token. **My recommendation: keep it.** It's the one moment of colour outside
the two maroon blocks, and the client praised the redesign's use of colour.

### D7. Spacing rhythm (§6) — needs explicit approval
See the warning there.

---

## 8. Out of scope — but you should know

### The copy on `/services`, `/training` and `/downloads` isn't the client's

✓verified in git history. The Dec 2025 Astro migration (`87f6c6b`) rewrote these pages
from scratch and replaced real client copy with generated filler. The redesign
preserved the filler. Originals recoverable from `87f6c6b^`.

| Now (migration-era) | Client's own (2021) |
| --- | --- |
| "We can offer everything… ensures seamless execution from start to finish." | "We take your brief and then design the most robust sample and method. We also assemble an expert team for moderation and reporting." |
| "Our set-up and design inspires deep engagement… tailored to your specific needs." | "If you can moderate and report, we can just design the method and sample, and / or set up the platform, and / or recruit and incentivise participants." |
| "We make strategic discussions and craft directional reports that provide actionable insights for your business decisions." | "If you set up the project yourself, we can provide expert moderators in any market and if required, we can analyse and report." |

The originals explain the **modularity of the offer** — pick the bits you need — which
is the actual sales proposition. Restoring them is a paste job, not a writing job.

### `training.astro` states something factually false — my error

✓verified: the pre-migration page was a **tab switcher** (`useState("Win")`) headed
**"Choose one or more of the following training modules"**, under "4 modules that will
inspire better Online Qual".

During the redesign I wrote the heading **"Four modules, run in sequence"** and a code
comment at `training.astro:8–9` asserting *"The four modules are a genuine sequence —
you win the work, then plan it, then run it"*, then justified the `01–04` numbering
from it. It is a menu, not a sequence. I invented the rationale.

**Recommend fixing regardless of scope** — it's a correctness issue, not a style one.
Proposed heading: "Four modules. Take one or take all four." Delete the false comment.
The numbering should go with it.

### Other findings held back

- **Nav "Clients" points at the case-study grid.** `id="clients"` is on `index.astro:156`
  (Case Studies); the section actually about clients is two lower and has no id.
  Label and destination disagree.
- **`/category/case-study` renders h1 "Case study"** (singular) for a list of six.
  Needs a display-name map — `categoryDisplay` can't pluralise.
- **`/services` has no section heading or eyebrow at all** after the hero. This is the
  main reason it feels thin, and spacing can't fix it — but fixing it means adding
  content, so it isn't proposed.
- **`/services` and `/downloads` content is shorter than their own footers** — 689px vs
  783px, and 551px vs 783px. `/arrange` proposes a 12-column staggered layout that
  takes `/services` to 903px using spans and spacing only.
- **`Footer.astro:63`** uses the Lucide `Twitter` bird for what is now X.

---

## 9. Micro-detail — `/polish`

Three of these are not micro at all and are promoted to the top.

### 9a. Content width *shrinks* by 47px at both breakpoints — P0, a regression I introduced

`src/styles/global.css:94–95`. ✓verified:

| viewport | content width |
| ---: | ---: |
| 767px | 719px |
| **768px** | **672px** — −47px |
| 1023px | 927px |
| **1024px** | **880px** — −47px |
| 1440px | 1296px |

The stepped `--section-gutter` (1.5rem → 3rem → 4.5rem) grows faster than the viewport
does at each breakpoint, so **an iPad in portrait gets less usable width than a 767px
phone.** Content narrows as the screen widens, twice.

Fix: fluid gutter —
`padding-inline: max(clamp(1.5rem, 5vw, 4.5rem), calc((100% - var(--section-max)) / 2))`.
Removes both cliffs; the 1440px result is unchanged.

*Knock-on:* this also fixes the homepage `h1` going 2 lines @1023 → 3 lines @1024.

### 9b. Footer social links fail WCAG 2.5.8 — P0

`src/components/Footer.astro:59–68`. ✓verified: all three measure **20×20px**, below
the 24×24 minimum. Fix: `-m-3 p-3` → 44×44, and drop the container `gap-6` to `gap-3`
to hold the optical rhythm.

The burger (`NavigationBar.astro:73`) measures 26×26 — passes the 24×24 minimum but is
under the 44×44 recommendation. Worth `-m-2.5 p-2.5` while we're there.

> Note: `BRAND-AUDIT-2026.md` claims "0 contrast failures", which remains true. Target
> size is a separate criterion that was never tested. Correcting the record.

### 9c. `/downloads` grid collapses at `md` — P1

`src/pages/downloads.astro:40`. `md:grid-cols-12` with `gap-x-12`: at 768px the content
column is 672px, 11 gutters consume 528px, leaving **12px per track**. The year label is
30px wide — it overflows its track by 18px. Tracks only reach parity with the gutter at
~1248px. Fix: `md:gap-x-6 xl:gap-x-12`, or give the year `md:col-span-2`.

### 9d. Interaction defects — P2

| `file:line` | Defect |
| --- | --- |
| `downloads.astro:37` | `group` and `py-10` are on the `<li>`, the `<a>` is inside — **82px of a 189px row** hovers but doesn't click |
| `index.astro:129–147` | The "Inspiring" row (my `href: null` fix) is visually identical to its two live siblings but inert. It also carries an orphaned `group-hover:-translate-y-0.5` with no `group` ancestor, which can never fire |
| `CustomerReviewCard.astro:22` | `hover:border-brand-300/40` on a `<figure>` containing no link — false affordance |
| `404.astro:33` | Footer has **0px** separation above and **0px** section padding below; every other page has 96/128 |
| `NavigationBar.astro:53,74` | Desktop nav withheld until 1024 though it fits from ~800px — 586px of free space at 900px and still showing a burger |

### 9e. Consistency defects — P2

- **Eyebrow→heading distance has three values for one relationship**: 32px
  (`.eyebrow-rule` `pb-8`), 24px (`mt-6` in PageHero/404/GetInTouch), 56px
  (`index.astro:238`, `pb-8` plus a parent `gap-6`). **Directly relevant to §A1** —
  deleting `.eyebrow-rule` silently drops the 32px to 0. Fix by moving spacing onto
  `.eyebrow` itself as `pb-6`, collapsing all three to one value.
- **`ServiceCard` renders with different metrics on `/` vs `/services`**: padding 24 vs
  28px, gap 12 vs 16px, icon 26 vs 28px. Same component, no reason.
- **Two easing curves run on every card hover.** `ease-out-soft` is on all 17
  transform/opacity transitions and **zero** colour transitions, so every
  `transition-colors` falls back to Tailwind's default curve. Fix: set
  `transitionTimingFunction.DEFAULT` in the config.
- **Transition durations are arbitrary** — `PostCard` fires three on one hover (border
  300, title 200, image 700). Proposed rule: 200 text colour, 300 surface/transform,
  500 imagery.
- **Card grids use three different breakpoints** — ServiceCard `sm:`, PostCard `md:`,
  CaseStudyGrid `md:`. At 700–767px `/blog` is a single column of 719px cards with
  448px-tall images.

### 9f. Dead code — P3, but it undermines the "systematic" claim

The audit doc argues the redesign replaced ad-hoc values with a system. Several parts of
that system have no consumer:

| Location | Dead |
| --- | --- |
| `tailwind.config.mjs:105–110` | `spacing.section-sm/section/section-lg/section-xl` — **0 uses**. `Section.astro` hard-codes `py-16…py-40`. The comment claims they "replace the ad-hoc py-6…py-[9rem]"; they never did |
| `tailwind.config.mjs:114–119` | `borderRadius.sm`, `DEFAULT`, `xl`, `2xl` — 0 uses |
| `tailwind.config.mjs:124–129` | `shadow-e1`, `e3`, `e4` — 0 uses. `e2` has **one** consumer (the founder portrait). A four-step elevation scale for one image |
| `tailwind.config.mjs:133,138` | `in-out-soft`, `maxWidth.measure-lg` — 0 uses |
| `tailwind.config.mjs:40–41` | `screens.mobile-only`, `no-desktop` — 0 uses. Comment says "kept so existing markup keeps working"; that markup is gone |
| `tailwind.config.mjs:86–87` | `fontSize.5xl`, `6xl` — 0 uses |
| `global.css:14–31` | **9 of 15** CSS custom properties have no consumer, including a second unused definition of the `ease-out-soft` curve |
| `global.css:197–198` | `.text-balance` / `.text-pretty` duplicate Tailwind 3.4 natives |
| `Section.astro:30,34,35,40` | tones `paper-alt`, `accent`, `tint` and `pad="sm"` — 0 call sites |

Either put them to work or delete them. `shadow-e1` as a resting state on `PostCard` /
`CustomerReviewCard` with `e2` on hover would earn the scale and give
`CustomerReviewCard` the "quiet raised surface" its own comment claims it is — which
also offers a **middle path on §A2/§A3**: replace the borders with elevation rather than
removing the container outright.

### 9g. Optical nitpicks — P3

Worth doing in the same pass since we're in these files:

- `ServiceCard.astro:32` — the two icons in a How We Work row are **5.0px** out of
  vertical alignment (`mt-1` aligns 30px and 20px boxes, not their centres); the left
  icon's ink centre also sits 2.23px below the h3 cap centre
- `training.astro:37` — `pt-1.5` misses the title baseline by **5px**. `/downloads`
  solves the identical problem with `md:items-baseline` and lands at exactly 0
- Arrows ride **~1px high** (`items-center` centres on the line box, not the text box)
- Arrow gap splits 8px/10px with no rule; three link tiers share one arrow treatment
- `ServiceCard.astro:34` `max-w-[34ch]` computes to 277px — inert below ~1400px, and
  above it wastes 17–23px of card, forcing tile 2 to a third line. Delete
- `blog/[...slug].astro:52` uses `max-w-[20ch]` where `max-w-display` exists
- `blog/[...slug].astro:37` dark hero is 64px where `PageHero` is 80px
- `privacy-policy.astro:71` is the only `pad="md"` on the site
- `global.css:68` — `:focus-visible` sets `border-radius: 2px`, which notches the
  case-study grid's `gap-px` divider lines on focus

### 9h. Structural, flagged not proposed

`blog/[...slug].astro:72–76` — case-study posts get a **much weaker close** than
articles. Articles end with `GetInTouch` (eyebrow, 80px heading, filled button);
case studies end with `ActionBanner` (no eyebrow, 40px heading, inline link, **no
contact action at all**). A prospect reading a case study — the highest-intent page on
the site — is given nowhere to go. Fixing it means changing what a section contains,
so it isn't proposed here.

### 9i. Noted, blocked by the constraint

`AwardsMarquee.astro:93–94` — the 6rem edge fade is **49.2% of a 390px viewport** (25%
at 768, 13.3% at 1440), so on a phone half the strip sits inside a gradient.
`clamp(2rem, 12vw, 6rem)` would fix it. The marquee is frozen at your request, so this
is flagged only.

---

## 10. Suggested order

Correctness first — three of these are defects, not preferences, and none of them are
what the review was about.

| | Work | Risk |
| --- | --- | --- |
| **0a** | Fluid gutter — content no longer shrinks at 768/1024 (§9a) | none — fixes a regression |
| **0b** | Footer tap targets to 44×44 (§9b) | none — WCAG failure |
| **0c** | `/downloads` grid collapse at `md` (§9c) | none |
| **0d** | Interaction defects: dead click zone, inert row, false affordance, 404 footer (§9d) | none |
| **0e** | Training "run in sequence" — corrects a false claim I introduced (§8) | none |
| 1 | Delete `.eyebrow-rule`, move spacing onto `.eyebrow` as `pb-6` (§A1 + §9e) | none — 7/9 pages already ship without it |
| 2 | Cut the 8 redundant eyebrows, relabel 1 (§4) | none |
| 3 | What We Do alignment + adopt the rule site-wide (§C1–C3) | none — deletions plus one 6px offset |
| 4 | Remove decorative lines: testimonials, service stubs, grid frame, footer 2nd rule, row-list first/last (§A3–A7) | low |
| 5 | Consistency: easing default, durations, `ServiceCard` metrics, card breakpoint (§9e) | low |
| 6 | Spacing ladder (§6) — **after sign-off** | medium, visible |
| 7 | `PageHero` span change (§C4) | visible on 5 interior pages |
| 8 | `PostCard` border (§A2) | highest visual change; review separately |
| 9 | Optical nitpicks + dead-token sweep (§9f–9g) | none |

Everything above is reversible on this branch; `2a7d67a` is the restore point.
