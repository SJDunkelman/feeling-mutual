# CMS setup (one-time, for the developer)

The site uses [Decap CMS](https://decapcms.org) as the editor and
[DecapBridge](https://decapbridge.com) for sign-in.

There is no server and no database. `/admin` is a static page that talks to the
GitHub API on the client's behalf. When Tom hits Publish, a markdown file is
committed to `master`, Netlify sees the commit and rebuilds, and the article is
live. DecapBridge exists purely so Tom can sign in with an email address
instead of needing a GitHub account.

Files involved:

| File | Purpose |
| --- | --- |
| `public/admin/index.html` | Loads Decap CMS. Version pinned deliberately. |
| `public/admin/config.yml` | Backend settings and the article/case-study forms. |
| `docs/WRITING-GUIDE.md` | Plain-English instructions to send to Tom. |

## Steps

### 1. Create a GitHub access token

On **your** GitHub account (not the client's — they never need one):

Settings → Developer settings → Personal access tokens → Fine-grained tokens →
Generate new token.

- Repository access: **only** `SJDunkelman/feeling-mutual`
- Permissions: **Contents → Read and write**

That single permission is enough. The editorial workflow is switched off in
`config.yml`, so no Pull requests permission is needed.

**It must be a fine-grained token, not a classic one.** A classic PAT's `repo`
scope is account-wide and cannot be narrowed — it would reach every repository
on the account, including other clients' and any organisations. Fine-grained is
the only type that binds to a single repository.

**Metadata: Read-only appears automatically.** GitHub attaches it to any
repository permission. Nothing to configure.

Leave **Workflows** off. That is the permission that would let a leaked token
add a GitHub Action to the repo. Nothing here needs it.

Blast radius if the token leaks: file writes to this one public repo. Because
Netlify executes the repo at build time, that includes the build container — so
keep this Netlify site's environment variables limited to what this site needs,
and no unrelated secrets.

> **Set the expiry deliberately.** If the token expires, publishing breaks with
> an unhelpful error and the client will not know why. Either use no expiry, or
> put the renewal date in a calendar with a reminder a week before.

### 2. Register the site with DecapBridge

Create a free account at [decapbridge.com](https://decapbridge.com). The free
tier covers 3 sites and 10 collaborators per site, which is comfortably more
than this needs.

Add the site, giving it:

- Repository: `SJDunkelman/feeling-mutual`
- Branch: `master` (not `main` — this repo predates the rename)
- The token from step 1

### 3. Paste the generated backend block into the config — done

DecapBridge generates a `backend:` block containing the site's PKCE auth
endpoints. This is already merged into `public/admin/config.yml`, with the site
ID `2c19ab3d-7b4e-4f95-973a-7076b6c31455`.

Two deliberate changes were made to the generated snippet:

- **`branch: master`, not `main`.** DecapBridge's template assumes `main`. This
  repo's default branch is `master`. The mismatch does not surface until
  someone tries to publish, at which point it fails against a branch that does
  not exist — so it presents as a broken editor rather than a config typo.
  Check the branch field in the DecapBridge dashboard matches too.
- **`logo_url` points at the Feeling Mutual mark** rather than the DecapBridge
  logo the snippet suggests, so the login screen shows something the client
  recognises.

If you ever regenerate the snippet, re-apply both, and leave the `collections:`
block below it untouched.

### 4. Deploy

Commit and push. Netlify rebuilds and `/admin` goes live.

### 5. Invite the client

From the DecapBridge dashboard, send an email invitation. Tom clicks the link,
picks a password (or signs in with Google), and is in. Nothing else is required
of him.

### 6. Test before handing over

Worth doing properly, because the failure modes are quiet:

1. Log in at `/admin` yourself.
2. Create an article, upload an image, publish.
3. Confirm the commit lands on `master` and Netlify rebuilds.
4. Check the article renders at `/blog/<slug>` and the image appears.
5. Open the committed file and confirm the frontmatter reads
   `showcaseImage: something.jpg` — a bare filename, no leading path.
6. Delete the test article through the CMS.

Step 5 is the one to actually look at. The image path is the only part of this
setup where a wrong value fails at build time rather than in the editor.

## Things worth knowing

**Netlify's free tier is the real constraint, not the CMS.** Netlify moved to
credit-based billing in late 2025: the free plan is 300 credits per month, a
production deploy costs 15 credits, and bandwidth costs 20 credits per GB. So
four articles a month uses 60 credits and leaves about 12 GB of transfer. It is
a hard limit with no overage. If the site outgrows it, moving to Cloudflare
Pages (unlimited bandwidth, 500 builds a month, free) is a config change, not a
rewrite — the CMS setup is entirely independent of the host.

**The editor is locked to rich text.** `modes: [rich_text]` in `config.yml`
means Tom never sees markdown syntax. The trade-off is that raw HTML in a post
body can be mangled if he re-saves it through the CMS. Five posts embed a
SlideShare or YouTube `<iframe>`:

- `blog/why-are-we-called-feeling-mutual`
- `blog/mrs-award-nomination-2017`
- `blog/mrs-independent-researchers-award-winner-2021`
- `blog/how-mobile-qualitative-research-inspired-swingers-global-expansion`
- `featured-case-studies/set-app`

If any of those need changing, edit them in the repo rather than through the
CMS. Everything Tom writes from scratch is unaffected.

**The `<br/>` spacers are gone.** Posts used to carry a hand-written `<br/>`
between every paragraph. The 2026 brand refresh replaced that approach with
`.prose-fm > * + * { margin-top: 1.4em }` in `src/styles/global.css`, which
spaces sibling elements automatically — so the 61 leftover tags were adding a
second gap on top of the real one. They have been removed. The rich-text editor
cannot produce them anyway, so hand-written and CMS-written posts now render
identically.

**Upgrading Decap.** The version in `public/admin/index.html` is pinned. To
bump it, change the number, deploy, then load `/admin` and publish a test edit
before walking away.
