import { test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

const projectPages: string[] = [
	"/skoda-enyaq-coupe",
	"/fujitsu-cx-lab",
	"/cariad-iaa",
	"/skoda-fabia",
	"/fujitsu-smart-city",
];

test.describe("project-page", () => {
	for (const route of projectPages) {
		test.describe(`${route}`, () => {
			testAutomaticallyDetectableA11nIssuesByRoute(route);
		});
	}
});
