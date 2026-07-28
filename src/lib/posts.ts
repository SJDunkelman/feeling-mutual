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
