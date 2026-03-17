import type { BlogPost } from "@/components/blog/types.ts";

export const getTagsWithCountByPosts = (posts: BlogPost[]) => {
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

export const groupPostsByMonth = (posts: BlogPost[]) => {
	return Object.entries(
		Object.groupBy(posts, ({ data: { createdAt } }) => {
			const isThisYear =
				createdAt.getFullYear() === new Date().getFullYear();

			return createdAt.toLocaleString("en-US", {
				month: "long",
				...(isThisYear ? {} : { year: "numeric" }),
			});
		}),
	);
};

export const getViewCount = () => {};
