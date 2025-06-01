import { getCollection } from "astro:content";
import { sortBlogPosts } from "@/utils/sortCollection.ts";

export const getBlogPosts = async (removeDrafts: boolean) =>
	sortBlogPosts(
		await getCollection("blogPosts", ({ data }) => {
			if (removeDrafts) {
				return data.draft === undefined || data.draft === false;
			}

			return true;
		}),
	);
