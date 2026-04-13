import { headerStore } from "@/components/header/headerStore.ts";
import VNavigation from "@/components/header/VNavigation.vue";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";
import { beforeEach, describe, expect, it } from "vitest";

describe("VNavigation", () => {
	beforeEach(() => {
		headerStore.isHeaderHidden = false;
		headerStore.isNavigationOpen = false;
	});

	it("should open navigation when clicking on menu button", async () => {
		const user = userEvent.setup();

		render(VNavigation, {
			props: { initialPath: "/", isMenuTriggerButtonVisible: true },
		});

		expect(screen.queryByLabelText("Main Menu")).not.toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "menu" }));

		expect(screen.getByLabelText("Main Menu")).toBeVisible();

		const mainNavItems = ["Home", "About", "Experience", "Blog", "Contact"];

		for (const item of mainNavItems) {
			expect(screen.getByText(item)).toBeVisible();
		}

		const socialNavItems = ["LinkedIn", "GitHub", "Mastodon"];

		for (const item of socialNavItems) {
			expect(screen.getByText(item)).toBeVisible();
		}
	});

	it("should close navigation when clicking on menu button while navigation is open", async () => {
		const user = userEvent.setup();

		render(VNavigation, {
			props: { initialPath: "/", isMenuTriggerButtonVisible: true },
		});

		expect(screen.queryByLabelText("Main Menu")).not.toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "menu" }));

		expect(screen.getByLabelText("Main Menu")).toBeVisible();

		await user.click(screen.getByRole("button", { name: "close" }));

		expect(screen.queryByLabelText("Main Menu")).not.toBeInTheDocument();
	});
});
