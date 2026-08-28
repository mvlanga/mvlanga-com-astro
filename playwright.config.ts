import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		baseURL: "http://localhost:4321",
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			grepInvert: /@a11n/,
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "webkit",
			grepInvert: /@a11n/,
			use: { ...devices["Desktop Safari"] },
		},
		{
			name: "Mobile Chrome",
			grepInvert: /@a11n/,
			use: { ...devices["Pixel 5"] },
		},
		{
			name: "Mobile Safari",
			grepInvert: /@a11n/,
			use: { ...devices["iPhone 12"] },
		},
	],
	webServer: {
		command: "pnpm run test:e2e:serve",
		url: "http://localhost:4321",
		reuseExistingServer: !process.env.CI,
	},
});
