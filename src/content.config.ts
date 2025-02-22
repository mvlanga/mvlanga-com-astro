import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

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

const projects = defineCollection({
	loader: glob({
		base: "src/content/projects",
		pattern: "**/*.mdx",
	}),
	schema: ({ image }) =>
		z.object({
			sortOrder: z.number(),
			title: z.string(),
			description: z.string(),
			customer: z.string(),
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

const resumeSkills = defineCollection({
	loader: file("src/content/resume/skills.json"),
	schema: z.array(z.string()),
});

const resumeInterests = defineCollection({
	loader: file("src/content/resume/interests.json"),
	schema: z.array(z.string()),
});

const resumeLanguages = defineCollection({
	loader: file("src/content/resume/languages.json"),
	schema: z.array(
		z.object({
			language: z.string(),
			level: z.string(),
		}),
	),
});

const resumeExperience = defineCollection({
	loader: glob({
		base: "src/content/resume/experience",
		pattern: "*.json",
	}),
	schema: z.object({
		company: z.string(),
		from: z.number(),
		to: z.string().optional(),
		role: z.string(),
		tasks: z.array(z.string()),
		technologies: z.array(z.string()).optional(),
	}),
});

export const collections = {
	experience,
	projects,
	legalPages,
	resumeExperience,
	resumeSkills,
	resumeInterests,
	resumeLanguages,
};
