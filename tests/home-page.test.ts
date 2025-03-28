import { expect, test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

test.describe("home-page", () => {
	testAutomaticallyDetectableA11nIssuesByRoute("/");

	test("should have the correct title", async ({ page }) => {
		await page.goto("/");

		expect(await page.title()).toBe("Moriz von Langa — Frontend Developer");
	});
});
