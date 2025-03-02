import { NOTES_LIMIT_PER_CALL } from "@/components/mastodon/constants.ts";
import type { Post } from "@/components/mastodon/types.ts";
import DOMPurify from "isomorphic-dompurify";

export const fetchPostsByUserId = async (
	userId: string,
	minId?: string,
): Promise<Post[]> => {
	const url = new URL(
		`https://mastodon.social/api/v1/accounts/${userId}/statuses`,
	);
	url.searchParams.set("limit", `${NOTES_LIMIT_PER_CALL}`);

	if (minId !== undefined) {
		url.searchParams.set("max_id", minId);
	}

	const response = await fetch(url);

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
