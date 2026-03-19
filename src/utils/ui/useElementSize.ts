import { ref, watch, type TemplateRef } from "vue";

export function useElementSize(element: TemplateRef<HTMLElement | null>) {
	const width = ref<number>(0);
	const height = ref<number>(0);

	let observer: ResizeObserver | null = null;

	function disconnect(): void {
		if (observer !== null) {
			observer.disconnect();
			observer = null;
		}
	}

	function connect(el: HTMLElement): void {
		disconnect();

		observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
			const rect = entries[0]?.contentRect;
			if (rect) {
				width.value = rect.width;
				height.value = rect.height;
			}
		});

		observer.observe(el);
	}

	watch(element, (el) => {
		if (el) {
			connect(el);
		} else {
			disconnect();
		}
	});

	return {
		width,
		height,
	};
}
