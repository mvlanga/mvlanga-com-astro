import type { CollectionEntry } from "astro:content";

export const sortExperience = <
	T extends CollectionEntry<"experience"> | CollectionEntry<"resumeExperience">,
>(
	experience: T[],
) => {
	return experience.sort((a, b) => b.data.from - a.data.from);
};

export const sortProjects = (projects: CollectionEntry<"projects">[]) =>
	projects.sort((a, b) => a.data.sortOrder - b.data.sortOrder);

export const shuffle = <T>(items: Array<T>) =>
	items.sort(() => Math.random() - 0.5);
