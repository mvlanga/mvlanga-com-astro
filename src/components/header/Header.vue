<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/common/Button.vue";
import { useMotionValue, useMotionValueEvent } from "motion-v";
import { useScroll } from "motion-v";

const props = defineProps<{
	currentPath: string;
}>();

const isHeaderHidden = ref(false);

const { scrollY } = useScroll();

useMotionValueEvent(scrollY, "change", (latest) => {
	const diff = latest - (scrollY.getPrevious() ?? 0);
	const direction = diff > 0 ? "down" : "up";

	console.log("scroll");

	isHeaderHidden.value = direction === "down" && scrollY.get() >= 100;
});

function handleMouseEnterHeaderZone() {
	isHeaderHidden.value = false;
}
</script>

<template>
	<div
		v-if="!isHeaderHidden"
		class="fixed top-0 right-0 left-0 -z-50 h-20"
		@onmouseenter="handleMouseEnterHeaderZone" />

	<header
		v-if="!isHeaderHidden"
		class="fixed top-4 left-4 z-10 sm:top-10 sm:left-10">
		<a aria-label="Moriz von Langa home page" href="/">
			<Button text="mvlanga" class="shadow-2xl" />
		</a>
	</header>
</template>
