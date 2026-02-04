import type { CollectionEntry } from "astro:content";

export type BlogPost = {
	id: CollectionEntry<"blogPosts">["id"];
	data: CollectionEntry<"blogPosts">["data"];
};

export type BlogPostWithViewCount = BlogPost & {
	viewCount?: number;
};
