import { expect, test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

const projectPages: { route: string; title: string }[] = [
	{
		route: "/project/skoda-enyaq-coupe",
		title: "Digital World Premiere of the new Škoda Enyaq Coupé — Škoda",
	},
	{
		route: "/project/fujitsu-cx-lab",
		title:
			"Customer Experience Lab, a new virtual Co-Creation-Platform — Fujitsu",
	},
	{
		route: "/project/cariad-iaa",
		title: "Digital Booth at IAA 2021 for CARIAD — CARIAD",
	},
	{
		route: "/project/skoda-fabia",
		title: "Digital World Premiere of the all-new Škoda Fabia — Škoda",
	},
	{
		route: "/project/fujitsu-smart-city",
		title: "Smart City exhibit at Fujitsu Forum 2019 — Fujitsu",
	},
];

test.describe("project-page", () => {
	for (const { route, title } of projectPages) {
		test.describe(`${route}`, () => {
			testAutomaticallyDetectableA11nIssuesByRoute(route);

			test("should have the correct title", async ({ page }) => {
				await page.goto(route);

				expect(await page.title()).toContain(title);
			});
		});
	}
});
