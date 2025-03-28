import { expect, test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

test.describe("legal-imprint-page", () => {
	testAutomaticallyDetectableA11nIssuesByRoute("/legal/imprint");

	test("should have the correct title", async ({ page }) => {
		await page.goto("/legal/imprint");

		expect(await page.title()).toContain("Imprint");
	});
});
