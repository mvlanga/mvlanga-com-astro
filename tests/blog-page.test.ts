import { expect, test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

test.describe("blog-page", () => {
	testAutomaticallyDetectableA11nIssuesByRoute("/blog");

	test("should have the correct title", async ({ page }) => {
		await page.goto("/blog");

		expect(await page.title()).toContain("Blog");
	});
});
