import { getCollection } from "astro:content";
import { BlogComments, PageViews, db } from "astro:db";
import { v4 as uuidv4 } from "uuid";

const seedViewCounts = async () => {
	const blogPosts = await getCollection("blogPosts");

	await db.insert(PageViews).values(
		blogPosts.map((post) => ({
			id: post.id,
			count: Math.floor(Math.random() * 100),
		})),
	);
};

const seedBlogComments = async () => {
	const blogPosts = await getCollection("blogPosts");

	await db.insert(BlogComments).values(
		blogPosts.map(({ id, data: { title } }) => ({
			id: uuidv4(),
			blogPostSlug: id,
			name: "John Doe",
			content: `Wooow, I really liked ${title}!`,
			reviewed: true,
		})),
	);
};

export default async function seed() {
	seedViewCounts();
	seedBlogComments();
}
