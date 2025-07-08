import type { CollectionEntry } from "astro:content";

export const sortExperience = <T extends CollectionEntry<"experience">>(
	experience: T[],
) => {
	return experience.sort(
		(a, b) => parseInt(b.data.from, 10) - parseInt(a.data.from, 10),
	);
};

export const sortHighlights = (highlights: CollectionEntry<"highlights">[]) =>
	highlights.sort((a, b) => a.data.sortOrder - b.data.sortOrder);

export const sortBlogPosts = <T extends CollectionEntry<"blogPosts">>(
	blogPosts: T[],
) => {
	return blogPosts.sort(
		(a, b) => b.data.createdAt.getTime() - a.data.createdAt.getTime(),
	);
};

export const shuffle = <T>(items: Array<T>) =>
	items.sort(() => Math.random() - 0.5);
