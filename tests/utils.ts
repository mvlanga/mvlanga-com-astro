import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

export const testAutomaticallyDetectableA11nIssuesByRoute = (route: string) => {
	return test(
		"should not have any automatically detectable accessibility issues",
		{ tag: "@a11n" },
		async ({ page }) => {
			await page.goto(route);
			await page.waitForURL(`**/${route}`);

			const accessibilityScanResults = await new AxeBuilder({
				page,
			})
				.setLegacyMode(true)
				.analyze();

			expect(accessibilityScanResults.violations).toEqual([]);
		},
	);
};
