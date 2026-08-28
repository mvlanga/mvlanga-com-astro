import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	forbidOnly: !!process.env.CI,
	timeout: 10_000,
	retries: 0,
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
			use: { ...devices["Pixel 8"] },
		},
		{
			name: "Mobile Safari",
			grepInvert: /@a11n/,
			use: { ...devices["iPhone 14"] },
		},
	],
	webServer: {
		command: "pnpm run test:e2e:serve",
		url: "http://localhost:4321",
		reuseExistingServer: !process.env.CI,
	},
});
