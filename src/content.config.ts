import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const experience = defineCollection({
	loader: glob({
		base: "src/content/experience",
		pattern: "*.json",
	}),
	schema: z.object({
		company: z.object({
			title: z.string(),
			description: z.string(),
		}),
		from: z.number(),
		to: z.string().optional(),
		role: z.string(),
		tasks: z.array(z.string()),
		technologies: z.array(z.string()).optional(),
	}),
});

const highlights = defineCollection({
	loader: glob({
		base: "src/content/highlights",
		pattern: "**/*.mdx",
	}),
	schema: ({ image }) =>
		z.object({
			sortOrder: z.number(),
			title: z.string(),
			description: z.string(),
			customer: z.string(),
			cover: image(),
			coverAlt: z.string(),
			coverOnHover: image(),
			coverOnHoverAlt: z.string(),
			openGraphCover: z.string(),
		}),
});

const legalPages = defineCollection({
	loader: glob({
		base: "src/content/legal",
		pattern: "*.md",
	}),
	schema: z.object({
		title: z.string(),
	}),
});

const blogPosts = defineCollection({
	loader: glob({
		base: "src/content/blog",
		pattern: ["**/**/*.md", "**/**/*.mdx"],
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		createdAt: z.date(),
		tags: z.array(z.string()),
		draft: z.boolean().optional(),
		openGraphCover: z.string().optional(),
	}),
});

export const collections = {
	experience,
	highlights,
	legalPages,
	blogPosts,
};
