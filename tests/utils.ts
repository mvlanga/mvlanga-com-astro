import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

export const testAutomaticallyDetectableA11nIssuesByRoute = (route: string) => {
	return test(
		"should not have any automatically detectable accessibility issues",
		{ tag: "@a11n" },
		async ({ page }) => {
			await page.goto(route);

			const accessibilityScanResults = await new AxeBuilder({ page, }).analyze();

			expect(accessibilityScanResults.violations).toEqual([]);
		},
	);
};

export const disableAnimations = async (page: Page) => {
	return await page.addStyleTag({
		content: `
    *,
    *::before,
    *::after {
      transition: none !important;
      animation: none !important;
    }
  `,
	});
}