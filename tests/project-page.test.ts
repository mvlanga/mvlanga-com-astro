import { test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

const projectPages: string[] = [
	"/project/skoda-enyaq-coupe",
	"/project/fujitsu-cx-lab",
	"/project/cariad-iaa",
	"/project/skoda-fabia",
	"/project/fujitsu-smart-city",
];

test.describe("project-page", () => {
	for (const route of projectPages) {
		test.describe(`${route}`, () => {
			testAutomaticallyDetectableA11nIssuesByRoute(route);
		});
	}
});
