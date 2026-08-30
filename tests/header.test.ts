import { expect, type Page, test } from "@playwright/test";

const mvlangaButtonElement = (page: Page) =>
	page.getByRole("link", { name: "Moriz von Langa home page" }).locator("..");

const menuButtonElement = (page: Page) =>
	page.getByRole("button", { name: "menu" }).locator("..");

test.describe("header", () => {
	// TODO: Fix flaky tests
	test.skip("should be visible/hidden depending on the scroll position", async ({
		page,
	}) => {
		await page.goto("/");

		await expect(page.locator('[data-testid="header"]')).toHaveAttribute(
			"data-mounted",
			"true",
		);

		await expect(mvlangaButtonElement(page)).toHaveCSS("opacity", "1");
		await expect(menuButtonElement(page)).toHaveCSS("opacity", "1");

		await page.evaluate(() => window.scrollBy(0, 500));

		await expect(mvlangaButtonElement(page)).toHaveCSS("opacity", "0");
		await expect(menuButtonElement(page)).toHaveCSS("opacity", "0");

		await page.evaluate(() => window.scrollBy(0, -100));

		await expect(mvlangaButtonElement(page)).toHaveCSS("opacity", "1");
		await expect(menuButtonElement(page)).toHaveCSS("opacity", "1");
	});

	// TODO: Fix flaky tests
	test.skip("should be visible when mouse enters top of the page", async ({
		page,
	}) => {
		await page.goto("/");

		await expect(page.locator('[data-testid="header"]')).toHaveAttribute(
			"data-mounted",
			"true",
		);

		await page.evaluate(() => window.scrollBy(0, 500));

		await expect(mvlangaButtonElement(page)).toHaveCSS("opacity", "0");
		await expect(menuButtonElement(page)).toHaveCSS("opacity", "0");

		await page.mouse.move(0, 0);

		await expect(mvlangaButtonElement(page)).toHaveCSS("opacity", "1");
		await expect(menuButtonElement(page)).toHaveCSS("opacity", "1");
	});
});
