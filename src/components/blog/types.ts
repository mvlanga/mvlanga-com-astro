import type { CollectionEntry } from "astro:content";

export type BlogPostWithViewCount = CollectionEntry<"blogPosts"> & {
	viewCount?: number;
};
