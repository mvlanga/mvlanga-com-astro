import { headerStore } from "@/components/header/headerStore.ts";
import VNavigation from "@/components/header/VNavigation.vue";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

describe("VNavigation", () => {
	beforeEach(() => {
		headerStore.isHeaderHidden = false;
		headerStore.isNavigationOpen = false;
	});

	it("should open navigation when clicking on menu button", async () => {
		const wrapper = mount(VNavigation, {
			attachTo: document.body,
			props: { initialPath: "/", isMenuTriggerButtonVisible: true },
		});

		expect(wrapper.find("[aria-label='Main Menu']").exists()).toBe(false);

		await wrapper.find("button[aria-label='menu']").trigger("click");

		expect(wrapper.get("[aria-label='Main Menu']"));

		const mainNavItems = ["home", "about", "experience", "blog", "mailto"];

		for (const item of mainNavItems) {
			expect(wrapper.get(`a[href*="${item}"]`).isVisible()).toBe(true);
		}

		const socialNavItems = ["linkedin", "github", "mastodon"];

		for (const item of socialNavItems) {
			expect(wrapper.get(`a[href*="${item}"]`).isVisible()).toBe(true);
		}
	});

	it("should close navigation when clicking on menu button while navigation is open", async () => {
		const wrapper = mount(VNavigation, {
			attachTo: document.body,
			props: { initialPath: "/", isMenuTriggerButtonVisible: true },
		});

		expect(wrapper.find("[aria-label='Main Menu']").exists()).toBe(false);

		await wrapper.find("button[aria-label='menu']").trigger("click");

		expect(wrapper.get("[aria-label='Main Menu']"));

		await wrapper.find("button[aria-label='close']").trigger("click");

		expect(wrapper.find("[aria-label='Main Menu']").exists()).toBe(false);
	});
});
