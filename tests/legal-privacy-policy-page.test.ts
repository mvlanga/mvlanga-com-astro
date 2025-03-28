import { expect, test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

test.describe("legal-privacy-policy-page", () => {
	testAutomaticallyDetectableA11nIssuesByRoute("/legal/privacy-policy");

	test("should have the correct title", async ({ page }) => {
		await page.goto("/legal/privacy-policy");

		expect(await page.title()).toContain("Privacy Policy");
	});
});
