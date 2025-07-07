import { test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

const highlightPages: string[] = [
	"/skoda-enyaq-coupe",
	"/fujitsu-cx-lab",
	"/cariad-iaa",
	"/skoda-fabia",
	"/fujitsu-smart-city",
];

test.describe("highlight-page", () => {
	for (const route of highlightPages) {
		test.describe(`${route}`, () => {
			testAutomaticallyDetectableA11nIssuesByRoute(route);
		});
	}
});
