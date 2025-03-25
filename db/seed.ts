import { BlogPostViews, db } from "astro:db";

export default async function seed() {
	await db.insert(BlogPostViews).values([
		{
			id: "organize-arrays-objects-dates-by-month-javascript-groupby",
			count: 5,
		},
	]);
}
