import { test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

test.describe("legal-imprint-page", () => {
	testAutomaticallyDetectableA11nIssuesByRoute("/legal/imprint");
});
