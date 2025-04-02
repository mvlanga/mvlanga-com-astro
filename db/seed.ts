import { getCollection } from "astro:content";
import { PageViews, db } from "astro:db";

export default async function seed() {
	const blogPosts = await getCollection("blogPosts");

	await db.insert(PageViews).values([
		...blogPosts.map((post) => ({
			id: post.id,
			count: Math.floor(Math.random() * 100),
		})),
	]);
}
