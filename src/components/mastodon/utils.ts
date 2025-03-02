import type { Post } from "@/components/mastodon/types.ts";
import DOMPurify from "isomorphic-dompurify";

export const fetchPostsByUserId = async (userId: string): Promise<Post[]> => {
	const response = await fetch(
		`https://mastodon.social/api/v1/accounts/${userId}/statuses`,
	);

	const posts = (await response.json()) as Post[];

	return sanitizePostsContent(posts);
};

const sanitizePostsContent = (posts: Post[]): Post[] => {
	return posts.map((post) => ({
		...post,
		content: DOMPurify.sanitize(post.content, {
			ALLOWED_TAGS: ["p", "br", "strong"],
		}),
	}));
};

export const getTagsWithCountByPosts = (posts: Post[]) => {
	const tagCounts: Record<string, number> = {};

	for (const post of posts) {
		for (const tag of post.tags) {
			tagCounts[tag.name] = (tagCounts[tag.name] || 0) + 1;
		}
	}

	return Object.entries(tagCounts).map(([name, count]) => ({
		name,
		count,
	}));
};
