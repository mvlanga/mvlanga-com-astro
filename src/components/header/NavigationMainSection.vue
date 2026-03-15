<script setup lang="ts">
import { motion } from "motion-v";
import type { NavigationItems } from "@/components/header/types";
import { onMounted, ref, toRefs } from "vue";
import NavigationLinkInternal from "@/components/header/NavigationLinkInternal.vue";

const props = defineProps<{
	initialPath: string;
}>();

const { initialPath } = toRefs(props);

const navigationItems: NavigationItems = [
	{
		label: "Home",
		url: "/#home",
		isActive: true,
	},
	{
		label: "About",
		url: "/#about",
	},
	{
		label: "Experience",
		url: "/#experience",
	},
	{
		label: "Blog",
		url: "/blog",
	},
	{
		label: "Contact",
		url: "mailto:morizvlanga@gmail.com",
	},
];

const activeSection = ref<null | string>(null);

onMounted(() => {
	if (initialPath.value === "/") {
		const sections = document.querySelectorAll("section");

		const observer = new IntersectionObserver(
			(entries) => {
				let mostVisible = entries
					.filter((e) => e.isIntersecting)
					.sort(
						(a, b) => b.intersectionRatio - a.intersectionRatio,
					)[0];

				if (mostVisible) {
					activeSection.value = mostVisible.target.id;
				}
			},
			{
				threshold: [0.25, 0.5, 0.75],
			},
		);

		sections.forEach((section) => observer.observe(section));

		return;
	}

	activeSection.value = initialPath.value;
});
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
		Navigation
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
		class="flex flex-col gap-5">
		<motion.li
			v-for="item in navigationItems"
			:key="item.url"
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
			<NavigationLinkInternal
				:navigation-item="item"
				:is-active="activeSection === item.url.replace('/#', '')" />
		</motion.li>
	</motion.ul>
</template>
