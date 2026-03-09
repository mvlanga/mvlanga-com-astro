<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/common/Button.vue";
import { useScroll, useMotionValueEvent } from "motion-v";
import Navigation from "@/components/header/Navigation.vue";

const props = defineProps<{
	currentPath: string;
}>();

const isHeaderHidden = ref(false);

const { scrollY } = useScroll();

useMotionValueEvent(scrollY, "change", (latest) => {
	const diff = latest - (scrollY.getPrevious() ?? 0);
	const direction = diff > 0 ? "down" : "up";

	isHeaderHidden.value = direction === "down" && scrollY.get() >= 300;
});

function handleMouseEnterHeaderZone() {
	isHeaderHidden.value = false;
}

function handleHeaderButtonFocus() {
	isHeaderHidden.value = false;
}
</script>

<template>
	<div
		v-if="isHeaderHidden"
		class="fixed top-0 right-0 left-0 z-10 h-20"
		@mouseenter="handleMouseEnterHeaderZone" />

	<header
		:aria-hidden="isHeaderHidden"
		class="aria-hidden:pointer-none fixed top-4 left-4 z-40 translate-y-0 opacity-100 transition-all duration-150 ease-out aria-hidden:-translate-y-full aria-hidden:opacity-0 sm:top-10 sm:left-10"
		@focus="handleHeaderButtonFocus">
		<a aria-label="Moriz von Langa home page" href="/">
			<Button text="mvlanga" class="shadow-2xl" />
		</a>
	</header>

	<Navigation
		:is-menu-trigger-button-visible="!isHeaderHidden"
		@menu-trigger-button-focus="handleHeaderButtonFocus" />
</template>
