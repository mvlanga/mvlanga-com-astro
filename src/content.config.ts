import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

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
		from: z.string(),
		to: z.string(),
		role: z.string(),
		tasks: z.array(z.string()),
		technologies: z.array(z.string()),
		important: z.boolean(),
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
		updatedAt: z.date().optional(),
		tags: z.array(z.string()),
		draft: z.boolean().optional(),
		openGraphCover: z.string().optional(),
	}),
});

export const collections = {
	experience,
	legalPages,
	blogPosts,
};
