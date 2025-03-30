import { test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

test.describe("blog-post-page", () => {
	testAutomaticallyDetectableA11nIssuesByRoute(
		"/blog/organize-arrays-objects-dates-by-month-javascript-groupby",
	);
});
