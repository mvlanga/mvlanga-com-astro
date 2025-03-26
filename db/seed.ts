import { PageViews, db } from "astro:db";

export default async function seed() {
	await db.insert(PageViews).values([
		{
			id: "organize-arrays-objects-dates-by-month-javascript-groupby",
			count: 1219,
		},
		{
			id: "creating-a-header-and-navigation-with-react-and-motion-dev",
			count: 2,
		},
	]);
}
