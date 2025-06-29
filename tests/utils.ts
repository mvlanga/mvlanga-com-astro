import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

export const testAutomaticallyDetectableA11nIssuesByRoute = (route: string) => {
	return [
		test("should not have any automatically detectable accessibility issues in dark theme", async ({
			page,
		}) => {
			await page.context().addInitScript(() => {
				localStorage.setItem("theme", "dark");
			});

			await page.goto(route);

			const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

			expect(accessibilityScanResults.violations).toEqual([]);
		}),
		test("should not have any automatically detectable accessibility issues in light theme", async ({
			page,
		}) => {
			await page.context().addInitScript(() => {
				localStorage.setItem("theme", "light");
			});

			await page.goto(route);

			const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

			expect(accessibilityScanResults.violations).toEqual([]);
		}),
	];
};
