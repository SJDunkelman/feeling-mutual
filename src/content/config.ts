import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    showcaseImage: z.string().optional(),
    category: z.enum(['article', 'case-study', 'training']),
    tags: z.array(z.string()).optional(),
  }),
});

const featuredCaseStudies = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    showcaseTitle: z.string(),
    description: z.string(),
    showcaseImage: image().optional(),
    category: z.literal('case-study'),
    subCategory: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog,
  'featured-case-studies': featuredCaseStudies,
};
