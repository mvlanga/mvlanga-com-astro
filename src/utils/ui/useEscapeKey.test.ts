import { useEscapeKey } from "@/utils/ui/useEscapeKey.ts";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";

const handler = vi.fn();

const TestComponent = defineComponent({
	setup() {
		useEscapeKey(handler);
		return () => null;
	},
});

describe("useEscapeKey", () => {
	it("should call handler when Escape key is pressed", async () => {
		const wrapper = mount(TestComponent);

		window.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
		expect(handler).not.toHaveBeenCalled();

		window.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape" }));
		expect(handler).toHaveBeenCalledTimes(1);

		wrapper.unmount();
	});

	it("should remove keyup listener on unmount", () => {
		const wrapper = mount(TestComponent);
		wrapper.unmount();

		window.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape" }));
		expect(handler).not.toHaveBeenCalled();
	});
});
