<script setup lang="ts">
import type { NavigationItems } from "@/components/header/types";
import { onMounted, ref, toRefs } from "vue";
import VNavigationLinkInternal from "@/components/header/VNavigationLinkInternal.vue";

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
	<p
		class="text-sm opacity-100 transition-opacity delay-150 duration-150 ease-out motion-safe:starting:opacity-0">
		Navigation
	</p>

	<ul class="flex flex-col gap-5">
		<li
			v-for="(item, index) in navigationItems"
			:key="item.url"
			class="group relative flex translate-y-0 items-center justify-start text-2xl opacity-100 transition-all duration-200 ease-overshoot-out motion-safe:starting:translate-y-1/2 motion-safe:starting:opacity-0"
			:style="{ 'transition-delay': `${50 * (index + 1) + 100}ms` }">
			<VNavigationLinkInternal
				:navigation-item="item"
				:is-active="activeSection === item.url.replace('/#', '')" />
		</li>
	</ul>
</template>
