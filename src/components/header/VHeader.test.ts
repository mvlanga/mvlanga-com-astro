import VHeader from "@/components/header/VHeader.vue";
import { render, screen } from "@testing-library/vue";
import { describe, expect, test } from "vitest";

describe("VHeader", () => {
	test("should be visible/hidden depending on the scroll position", async () => {
		render(VHeader, { props: { initialPath: "/" } });

		expect(
			screen.getByRole("link", { name: "Moriz von Langa home page" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "menu" }),
		).toBeInTheDocument();
	});
});
