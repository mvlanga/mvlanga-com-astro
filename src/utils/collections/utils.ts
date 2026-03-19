import { type CollectionEntry, getCollection } from "astro:content";

const isProduction = import.meta.env.PROD && !import.meta.env.IS_DEPLOY_PREVIEW;

export const getBlogPosts = async () =>
	sortBlogPosts(
		await getCollection("blogPosts", ({ data }) => {
			if (isProduction) {
				return data.draft === undefined || data.draft === false;
			}

			return true;
		}),
	);

export const sortExperience = <T extends CollectionEntry<"experience">>(
	experience: T[],
) => {
	return experience.sort(
		(a, b) =>
			Number.parseInt(b.data.from, 10) - Number.parseInt(a.data.from, 10),
	);
};

export const sortBlogPosts = <T extends CollectionEntry<"blogPosts">>(
	blogPosts: T[],
) => {
	return blogPosts.sort(
		(a, b) => b.data.createdAt.getTime() - a.data.createdAt.getTime(),
	);
};
