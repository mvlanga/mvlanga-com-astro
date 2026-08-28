import { test } from "@playwright/test";
import { testAutomaticallyDetectableA11nIssuesByRoute } from "./utils.ts";

test.describe("blog-page", () => {
	testAutomaticallyDetectableA11nIssuesByRoute("/blog");
});
