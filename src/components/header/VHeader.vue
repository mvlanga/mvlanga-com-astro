<script setup lang="ts">
import VButton from "@/components/common/VButton.vue";
import { useScroll, useMotionValueEvent } from "motion-v";
import VNavigation from "@/components/header/VNavigation.vue";
import { headerStore } from "@/components/header/headerStore.ts";

const { initialPath } = defineProps<{
	initialPath: string;
}>();

const { scrollY } = useScroll();

useMotionValueEvent(scrollY, "change", (latest) => {
	const diff = latest - (scrollY.getPrevious() ?? 0);
	const direction = diff > 0 ? "down" : "up";

	headerStore.isHeaderHidden = direction === "down" && scrollY.get() >= 300;
});

function handleMouseEnterHeaderZone() {
	headerStore.isHeaderHidden = false;
}

function handleHeaderButtonFocus() {
	headerStore.isHeaderHidden = false;
}
</script>

<template>
	<div
		v-if="headerStore.isHeaderHidden"
		class="fixed top-0 right-0 left-0 z-10 h-20"
		@mouseenter="handleMouseEnterHeaderZone" />

	<header
		:class="[
			'fixed top-4 left-4 z-30 transition-all duration-300 ease-out sm:top-10 sm:left-10',
			headerStore.isHeaderHidden
				? 'pointer-events-none -translate-y-32 scale-75 opacity-0 blur-xs'
				: 'translate-y-0 scale-100 opacity-100 blur-none',
		]">
		<VButton
			href="/"
			text="mvlanga"
			class="shadow-2xl"
			aria-label="Moriz von Langa home page"
			@focus="handleHeaderButtonFocus" />
	</header>

	<VNavigation
		:initial-path="initialPath"
		:is-menu-trigger-button-visible="!headerStore.isHeaderHidden" />
</template>
