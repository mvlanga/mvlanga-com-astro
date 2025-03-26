import { actions } from "astro:actions";
import type { CollectionEntry } from "astro:content";
import type { BlogPostWithViewCount } from "@/components/blog/types.ts";
import { useOnMount } from "@/utils/useOnMount.ts";
import { useState } from "react";

export const getTagsWithCountByPosts = (
	posts: CollectionEntry<"blogPosts">[],
) => {
	const tagCounts: Record<string, number> = {};

	for (const post of posts) {
		for (const tag of post.data.tags) {
			tagCounts[tag] = (tagCounts[tag] || 0) + 1;
		}
	}

	return Object.entries(tagCounts).map(([name, count]) => ({
		name,
		count,
	}));
};

export const groupPostsByMonth = (posts: CollectionEntry<"blogPosts">[]) => {
	return Object.entries(
		Object.groupBy(posts, ({ data: { createdAt } }) => {
			const isThisYear = createdAt.getFullYear() === new Date().getFullYear();

			return createdAt.toLocaleString("en-US", {
				month: "long",
				...(isThisYear ? {} : { year: "numeric" }),
			});
		}),
	);
};

export const useBlogPosts = (blogPosts: CollectionEntry<"blogPosts">[]) => {
	const [isLoading, setIsLoading] = useState(true);
	const [blogPostsWithViewCount, setBlogPostsWithViewCount] =
		useState<BlogPostWithViewCount[]>(blogPosts);

	const fetchData = async () => {
		const { data, error } = await actions.getPageViews(
			blogPosts.map((post) => post.id),
		);

		setIsLoading(false);

		if (error) {
			throw new Error("Unable to run `blogPostViews` action");
		}

		if (data === undefined) {
			throw new Error("Returned data of `blogPostViews` action is unusable");
		}

		setBlogPostsWithViewCount(
			blogPosts.map((post) => ({
				...post,
				viewCount: data.find(({ id }) => id === post.id)?.count ?? 0,
			})),
		);
	};

	useOnMount(() => {
		fetchData().catch(console.error);
	});

	return {
		isLoading,
		blogPostsWithViewCount,
	};
};
