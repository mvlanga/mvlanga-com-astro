---
title: Axe (axe-core), Playwright & Astro - Automatically detect accessibility issues
slug: automatically-detect-accessibility-issues-in-astro-using-axe-core
description: "Learn how to automatically detect accessibility issues in your Astro site using Playwright and axe-core. Set up reusable tests that ensure your pages meet basic a11y standards before shipping."
createdAt: 2025-06-05
tags: ["astro", "accessibility"]
---

When building websites with tools like Astro, ensuring accessibility (a11y) is often an afterthought. But it doesn’t have to be. With `@axe-core/playwright`, we can automate the detection of common accessibility issues as part of our testing suite using Playwright.

In this post, I’ll walk through how I integrated automatic accessibility checks into my Astro site using [Playwright](https://playwright.dev) and [Axe](https://www.npmjs.com/package/@axe-core/playwright).

## Installing the tools

Let’s assume you already have a working Astro project. We’ll install the necessary dependencies for Playwright and Axe:

```shell
npm install -D @playwright/test @axe-core/playwright
npx playwright install
```

Here’s my basic `playwright.config.ts`. It runs the dev server locally and tests against `http://localhost:4321`.

```typescript
// playwright.config.ts

import { defineConfig, devices } from "@playwright/test";

const environment = process.env.environment ?? "LOCAL";
const isLocalEnvironment = environment === "LOCAL";

const baseURL = isLocalEnvironment
	? "http://localhost:4321"
	: "https://your-website.com";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		baseURL,
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	webServer: isLocalEnvironment
		? {
				command: "npm run dev",
				url: "http://localhost:4321",
				reuseExistingServer: !process.env.CI,
			}
		: undefined,
});
```

## Utility for running a11y scans

This helper runs Axe on any given route and checks that no violations were found:

```typescript
// tests/utils.ts

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

export const testAutomaticallyDetectableA11nIssuesByRoute = (route: string) =>
    test("should not have any automatically detectable accessibility issues", async ({ page }) => {
        await page.goto(route);

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });
```

This utility navigates to a given route, runs Axe’s accessibility scanner, and asserts that there are no violations.

## Example usage

Now, we can use this utility to create targeted accessibility tests for individual pages or groups of routes.

**Homepage Test**

```typescript
// tests/home-page.test.ts

import { test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

test.describe("home-page", () => {
	testAutomaticallyDetectableA11nIssuesByRoute("/");
});
```

**Blog Post Pages Test**

```typescript
// tests/blog-post-page.test.ts

import { test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

const blogPages: string[] = [
    "/blog/your-post",
];

test.describe("blog-post-page", () => {
    for (const route of blogPages) {
        test.describe(`${route}`, () => {
            testAutomaticallyDetectableA11nIssuesByRoute(route);
        });
    }
});
```

## Reminder: Automation Isn’t Everything


Automated tools like Axe are great for catching obvious issues like:

- low color contrast
- missing labels
- invalid ARIA roles

…but they can’t check everything.

Manual testing is still essential. Tools like [Accessibility Insights for Web](https://chromewebstore.google.com/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni) can help with that, especially for keyboard navigation, screen reader behavior, and actual usability of interactive components.

## Conclusion

By integrating tools like `@axe-core/playwright` early in your development process, you can catch the low-hanging fruit and start building more inclusive websites by default.

Happy coding!