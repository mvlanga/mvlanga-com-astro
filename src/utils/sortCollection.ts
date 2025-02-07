import type { CollectionEntry } from "astro:content";

export const sortExperiences = (
	experiences: CollectionEntry<"experiences">[],
) => experiences.sort((a, b) => b.data.from - a.data.from);

export const sortWorkItems = (workItems: CollectionEntry<"workItems">[]) =>
	workItems.sort((a, b) => b.data.year - a.data.year);
