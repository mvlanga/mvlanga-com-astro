import { expect, type Page, test } from "@playwright/test";

const mvlangaButtonElement = (page: Page) =>
	page.getByRole("link", { name: "Moriz von Langa home page" }).locator("..");

const menuButtonElement = (page: Page) =>
	page.getByRole("button", { name: "menu" }).locator("..");

test.describe("header", () => {
	test("should be visible/hidden depending on the scroll position", async ({
		page,
	}) => {
		await page.goto("/");

		await expect(mvlangaButtonElement(page)).toHaveCSS("opacity", "1");
		await expect(menuButtonElement(page)).toHaveCSS("opacity", "1");

		await page.evaluate(() => window.scrollBy(0, 500));

		await expect(mvlangaButtonElement(page)).toHaveCSS("opacity", "0");
		await expect(menuButtonElement(page)).toHaveCSS("opacity", "0");

		await page.evaluate(() => window.scrollBy(0, -100));

		await expect(mvlangaButtonElement(page)).toHaveCSS("opacity", "1");
		await expect(menuButtonElement(page)).toHaveCSS("opacity", "1");
	});

	test("should be visible when mouse enters top of the page", async ({
		page,
	}) => {
		await page.goto("/");

		await page.evaluate(() => window.scrollBy(0, 500));

		await expect(mvlangaButtonElement(page)).toHaveCSS("opacity", "0");
		await expect(menuButtonElement(page)).toHaveCSS("opacity", "0");

		await page.mouse.move(0, 0);

		await expect(mvlangaButtonElement(page)).toHaveCSS("opacity", "1");
		await expect(menuButtonElement(page)).toHaveCSS("opacity", "1");
	});
});
