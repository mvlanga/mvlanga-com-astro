import { test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

test.describe("legal-privacy-policy-page", () => {
	testAutomaticallyDetectableA11nIssuesByRoute("/legal/privacy-policy");
});
