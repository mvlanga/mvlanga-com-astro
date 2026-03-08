<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "@/components/common/Button.vue";
import {
	motion,
	useScroll,
	AnimatePresence,
	useMotionValueEvent,
} from "motion-v";
import Navigation from "@/components/header/Navigation.vue";
import { headerButtonsVariants } from "@/components/header/utils.ts";

const props = defineProps<{
	currentPath: string;
}>();

const isHeaderHidden = ref(false);

const { scrollY } = useScroll();

useMotionValueEvent(scrollY, "change", (latest) => {
	const diff = latest - (scrollY.getPrevious() ?? 0);
	const direction = diff > 0 ? "down" : "up";

	isHeaderHidden.value = direction === "down" && scrollY.get() >= 100;
});

function handleMouseEnterHeaderZone() {
	isHeaderHidden.value = false;
}

const currentVariant = computed(() =>
	isHeaderHidden.value ? "hidden" : "visible",
);
</script>

<template>
	<div
		class="fixed top-0 right-0 left-0 z-10 h-20"
		@onmouseenter="handleMouseEnterHeaderZone" />

	<motion.header
		class="fixed top-4 left-4 z-10 sm:top-10 sm:left-10"
		:variants="headerButtonsVariants"
		:animate="currentVariant"
		initial="visible">
		<a aria-label="Moriz von Langa home page" href="/">
			<Button text="mvlanga" class="shadow-2xl" />
		</a>
	</motion.header>

	<Navigation :is-menu-trigger-button-visible="!isHeaderHidden" />
</template>
