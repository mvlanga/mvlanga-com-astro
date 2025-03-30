import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

export const testAutomaticallyDetectableA11nIssuesByRoute = (route: string) =>
	test("should not have any automatically detectable accessibility issues", async ({
		page,
	}) => {
		await page.goto(route);

		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});
