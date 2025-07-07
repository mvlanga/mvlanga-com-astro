import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getBlogPosts } from "@/utils/collections.ts";

export const GET: APIRoute = async (context) => {
	const blogPosts = await getBlogPosts();

	if (context.site === undefined) {
		return new Response(null, {
			status: 500,
			statusText: "GET context is missing property `site`",
		});
	}

	return rss({
		title: "Moriz’s Blog",
		description:
			"A few notes and reminders for myself, usually when I've found a solution to something I was struggling with, discovered a good solution to a channeling problem, or tried something new. It's just great to have a place to go back to.",
		site: context.site,
		items: blogPosts.map(
			({ id, data: { title, description, tags, createdAt } }) => ({
				title,
				description,
				categories: tags,
				pubDate: createdAt,
				link: `/blog/${id}/`,
			}),
		),
	});
};
