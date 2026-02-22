<script setup lang="ts">
import { motion } from "motion-v";
import type { NavigationItems } from "@/components/header/types";

const {
	title,
	navigationItems,
	external = false,
} = defineProps<{
	title: string;
	navigationItems: NavigationItems;
	external?: boolean;
}>();

defineEmits(["clickNavItem"]);
</script>

<template>
	<motion.p
		:variants="{
			initial: { opacity: 0 },
			closed: { opacity: 0 },
			open: {
				opacity: 1,
				transition: { delay: 0.2 },
			},
		}"
		class="text-sm"
		>{{ title }}</motion.p
	>

	<motion.ul
		v-if="external"
		:variants="{
			open: {
				transition: {
					when: 'beforeChildren',
					staggerChildren: 0.05,
					delayChildren: 0.25,
				},
			},
		}"
		class="flex flex-wrap gap-4">
		<motion.li
			v-for="{ url, label } in navigationItems"
			:variants="{
				initial: { opacity: 0 },
				closed: { opacity: 0 },
				open: { opacity: 1 },
			}">
			<a
				@click="$emit('clickNavItem')"
				:href="url"
				referrerpolicy="no-referrer"
				target="_blank"
				rel="noreferrer"
				data-umami-event="link-click"
				:data-umami-event-url="url">
				{{ label }}
			</a>
		</motion.li>
	</motion.ul>

	<motion.ul
		v-else
		:variants="{
			open: {
				transition: {
					when: 'beforeChildren',
					staggerChildren: 0.05,
					delayChildren: 0.25,
				},
			},
		}"
		class="flex flex-col gap-5">
		<motion.li
			v-for="item in navigationItems"
			:variants="{
				initial: {
					opacity: 0,
					translateY: '50%',
				},
				closed: {
					opacity: 0,
					translateY: '0px',
				},
				open: {
					opacity: 1,
					translateY: '0px',
				},
			}"
			class="group relative text-2xl">
			<a
				@click="$emit('clickNavItem')"
				:href="item.url"
				class="flex items-center">
				{{ item.label }}
			</a>
		</motion.li>
	</motion.ul>
</template>
