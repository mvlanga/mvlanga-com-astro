import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const skills = defineCollection({
	loader: file("src/content/skills.json"),
	schema: z.array(z.string()),
});

const experiences = defineCollection({
	loader: glob({
		base: "src/content/experience",
		pattern: "*.json",
	}),
	schema: z.object({
		company: z.string(),
		from: z.number(),
		to: z.string().optional(),
		role: z.string(),
		tasks: z.array(z.string()),
	}),
});

const projects = defineCollection({
	loader: glob({
		base: "src/content/projects",
		pattern: "**/*.mdx",
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			customer: z.string(),
			year: z.number(),
			cover: image(),
			coverOnHover: image(),
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

export const collections = { skills, experiences, projects, legalPages };
