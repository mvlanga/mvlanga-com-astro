import { defineConfig, devices } from "@playwright/test";

const environment = process.env.environment ?? "LOCAL";
const isLocalEnvironment = environment === "LOCAL";

const baseURL = isLocalEnvironment
	? "http://localhost:4321"
	: "https://mvlanga.com";

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
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
		{
			name: "Mobile Chrome",
			use: { ...devices["Pixel 5"] },
		},
		{
			name: "Mobile Safari",
			use: { ...devices["iPhone 12"] },
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
