import { test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

const blogPages: string[] = [
	"/blog/organize-arrays-objects-dates-by-month-javascript-groupby",
	"/blog/how-to-build-a-page-view-counter-with-astro-db-actions-and-server-side-islands",
	"/blog/generating-open-graph-images-in-astro",
	"/blog/forking-my-website",
];

test.describe("blog-post-page", () => {
	for (const route of blogPages) {
		test.describe(`${route}`, () => {
			testAutomaticallyDetectableA11nIssuesByRoute(route);
		});
	}
});
