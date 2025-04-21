import { getCollection } from "astro:content";
import { sortBlogPosts } from "@/utils/sortCollection.ts";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

const isProduction = import.meta.env.PROD;

export const GET: APIRoute = async (context) => {
	const blogPosts = sortBlogPosts(
		await getCollection("blogPosts", ({ data }) => {
			return isProduction
				? data.draft === undefined || data.draft === false
				: true;
		}),
	);

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
				tags,
				createdAt,
				link: `/blog/${id}/`,
			}),
		),
	});
};
