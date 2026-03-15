<script setup lang="ts">
import { motion } from "motion-v";
import type { NavigationItems } from "@/components/header/types.ts";

defineEmits(["clickNavItem"]);

const socialItems: NavigationItems = [
	{
		label: "LinkedIn",
		url: "https://www.linkedin.com/in/mvlanga",
	},
	{
		label: "GitHub",
		url: "https://github.com/mvlanga",
	},
	{
		label: "Mastodon",
		url: "https://mastodon.social/@mvlanga",
	},
];
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
		class="text-sm">
		Social
	</motion.p>

	<motion.ul
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
			v-for="{ url, label } in socialItems"
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
</template>
