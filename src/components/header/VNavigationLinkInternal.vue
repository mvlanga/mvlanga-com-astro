<script setup lang="ts">
import type { NavigationItem } from "@/components/header/types.ts";
import { computed, toRefs } from "vue";
import { headerStore } from "@/components/header/headerStore.ts";

const props = defineProps<{
	navigationItem: NavigationItem;
	isActive: boolean;
}>();

const { isActive } = toRefs(props);

const indicatorClasses = computed(() => ({
	"absolute right-full h-1 w-8 place-self-center rounded-full bg-purple-300 transition-transform duration-100": true,
	"-translate-x-4": isActive.value,
	"-translate-x-full": !isActive.value,
}));

function handleNavItemClick(event: MouseEvent) {
	headerStore.isNavigationOpen = false;

	const href = props.navigationItem.url;

	if (href.startsWith("/#")) {
		const el = document.querySelector(href.replace("/#", "#"));

		if (el) {
			event.preventDefault();

			el.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}
}
</script>

<template>
	<span :class="indicatorClasses" aria-hidden="true" />
	<a
		:href="props.navigationItem.url"
		class="inline-block"
		@click="handleNavItemClick">
		{{ props.navigationItem.label }}
	</a>
</template>
