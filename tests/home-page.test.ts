import { test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

test.describe("home-page", () => {
	testAutomaticallyDetectableA11nIssuesByRoute("/");
});
