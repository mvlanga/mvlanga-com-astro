import { sortBlogPosts } from "@/utils/sortCollection.ts";
import { getCollection } from "astro:content";

const isProduction =
	import.meta.env.PROD && !import.meta.env.IS_DEPLOY_PREVIEW;

export const getBlogPosts = async () =>
	sortBlogPosts(
		await getCollection("blogPosts", ({ data }) => {
			if (isProduction) {
				return data.draft === undefined || data.draft === false;
			}

			return true;
		}),
	);
