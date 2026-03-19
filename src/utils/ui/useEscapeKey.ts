import { onBeforeUnmount, onMounted } from "vue";

export function useEscapeKey(handler: () => void) {
	const handleKeyup = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			handler();
		}
	};

	onMounted(() => {
		window.addEventListener("keyup", handleKeyup);
	});

	onBeforeUnmount(() => {
		window.removeEventListener("keyup", handleKeyup);
	});
}
