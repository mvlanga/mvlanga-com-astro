import { getCollection } from "astro:content";
import { sortBlogPosts } from "@/utils/sortCollection.ts";

const isProduction = import.meta.env.PROD;

export const getBlogPosts = async () =>
	sortBlogPosts(
		await getCollection("blogPosts", ({ data }) => {
			if (isProduction) {
				return data.draft === undefined || data.draft === false;
			}

			return true;
		}),
	);
