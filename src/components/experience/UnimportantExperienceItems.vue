<script setup lang="ts">
import { motion } from "motion-v";
import type { Variants } from "motion-v";
import { experienceFilterStore } from "@/components/experience/experienceFilterStore.ts";
import ExperienceItem from "@/components/experience/ExperienceItem.vue";
import type { CollectionEntry } from "astro:content";

const props = defineProps<{
	items: CollectionEntry<"experience">[];
}>();

const containerVariants: Variants = {
	visible: {
		height: "auto",
	},
	hidden: {
		height: "10rem",
	},
};
</script>

<template>
	<motion.div
		class="relative flex flex-col gap-4 overflow-hidden"
		:variants="containerVariants"
		initial="hidden"
		:animate="
			experienceFilterStore.experienceUnimportantVisible
				? 'visible'
				: 'hidden'
		"
		:transition="{
			duration: 0.5,
			ease: [0.27, 0.99, 0.25, 0.99],
		}"
		:aria-hidden="!experienceFilterStore.experienceUnimportantVisible">
		<div
			aria-hidden="true"
			:class="[
				'absolute inset-0 z-0 h-full w-full bg-linear-0 from-white to-transparent transition-opacity duration-150',
				experienceFilterStore.experienceUnimportantVisible
					? 'opacity-0'
					: 'opacity-100',
			]" />
		<ExperienceItem
			v-for="item in props.items"
			:key="`${item.data.company}_${item.data.role}`"
			:item="item" />
	</motion.div>
</template>
