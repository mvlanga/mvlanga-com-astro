<script setup lang="ts">
import BaseButton from "@/components/common/BaseButton.vue";
import { useScroll, useMotionValueEvent } from "motion-v";
import GlobalNavigation from "@/components/header/GlobalNavigation.vue";
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
			'fixed top-4 left-4 z-40 transition-all duration-150 ease-out sm:top-10 sm:left-10',
			headerStore.isHeaderHidden
				? 'pointer-none -translate-y-full opacity-0'
				: 'translate-y-0 opacity-100',
		]">
		<a aria-label="Moriz von Langa home page" href="/" tabindex="-1">
			<BaseButton
				text="mvlanga"
				class="shadow-2xl"
				@focus="handleHeaderButtonFocus" />
		</a>
	</header>

	<GlobalNavigation
		:initial-path="initialPath"
		:is-menu-trigger-button-visible="!headerStore.isHeaderHidden" />
</template>
