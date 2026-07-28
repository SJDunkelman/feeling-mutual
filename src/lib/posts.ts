import { getCollection } from 'astro:content';

/**
 * Every post that is served from /blog/<slug>.
 *
 * The client case studies sit in their own `featured-case-studies` collection
 * so the homepage grid can rely on `showcaseTitle` / `subCategory`, but they
 * have always been published under /blog like any other post. Anything that
 * lists or routes posts has to read both collections, otherwise the six case
 * studies vanish from the blog index and the case-study category page.
 */
export async function getAllPosts() {
  const [posts, caseStudies] = await Promise.all([
    getCollection('blog'),
    getCollection('featured-case-studies'),
  ]);
  return [...posts, ...caseStudies];
}

/** Newest first. */
export function byDateDesc<T extends { data: { date: Date } }>(entries: T[]) {
  return [...entries].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Display names for category slugs.
 *
 * These were derived by capitalising the slug and swapping the hyphen for a
 * space, which cannot pluralise: /category/case-study listed six case studies
 * under a heading reading "Case study". Naive suffixing doesn't help either —
 * "case-study" + "s" gives "Case studys" — so the plural is stated, not computed.
 */
const CATEGORY_NAMES: Record<string, { one: string; many: string }> = {
  'article':    { one: 'Article',    many: 'Articles' },
  'case-study': { one: 'Case study', many: 'Case studies' },
};

function titleCase(slug: string) {
  return slug.charAt(0).toUpperCase() + slug.slice(1).replaceAll('-', ' ');
}

/** Singular — for breadcrumbs and per-post labels. */
export function categoryName(slug: string) {
  return CATEGORY_NAMES[slug]?.one ?? titleCase(slug);
}

/** Plural — for listing pages and filters. */
export function categoryNamePlural(slug: string) {
  return CATEGORY_NAMES[slug]?.many ?? titleCase(slug);
}
