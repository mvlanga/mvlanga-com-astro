<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/common/Button.vue";
import { motion, AnimatePresence, useMotionValueEvent } from "motion-v";
import { useScroll } from "motion-v";
import Navigation from "@/components/header/Navigation.vue";
import type { Variants } from "motion/react";

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

const navigationVariants = {
	initial: {
		opacity: 0,
	},
	closed: {
		opacity: 0,
	},
	open: {
		opacity: 1,
	},
} satisfies Variants;
</script>

<template>
	<div
		class="fixed top-0 right-0 left-0 z-10 h-20"
		@onmouseenter="handleMouseEnterHeaderZone" />

	<AnimatePresence>
		<motion.header
			v-if="!isHeaderHidden"
			:variants="navigationVariants"
			initial="initial"
			animate="open"
			exit="closed"
			class="fixed top-4 left-4 z-10 sm:top-10 sm:left-10">
			<a aria-label="Moriz von Langa home page" href="/">
				<Button text="mvlanga" class="shadow-2xl" />
			</a>
		</motion.header>
	</AnimatePresence>

	<Navigation :is-menu-trigger-button-visible="!isHeaderHidden" />
</template>
