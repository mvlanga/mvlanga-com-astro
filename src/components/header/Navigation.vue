<script setup lang="ts">
import { motion } from "motion-v";
import { useElementSize } from "@/utils/useElementSize.ts";
import type { Variants } from "motion/react";
import type { TemplateRef } from "vue";
import type { NavigationItems } from "@/components/header/types.ts";
import NavigationSection from "@/components/header/NavigationSection.vue";

const { isMenuOpen, menuButtonElement } = defineProps<{
	isMenuOpen: boolean;
	menuButtonElement: TemplateRef<HTMLButtonElement>;
}>();

defineEmits(["clickNavItem"]);

const navItems: NavigationItems = [
	{
		label: "Home",
		url: "/#home",
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
		label: "Highlights",
		url: "/#highlights",
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

const { width: menuButtonElementWidth, height: menuButtonElementHeight } =
	useElementSize(menuButtonElement);

const navigationVariants = {
	initial: {
		opacity: 0,
		clipPath: `inset(1.25rem 1.25rem calc(100% - ${menuButtonElementHeight.value}px - 1.25rem) calc(100% - ${menuButtonElementWidth.value}px - 1.25rem) round 1rem)`,
	},
	closed: {
		opacity: 0,
		clipPath: `inset(1.25rem 1.25rem calc(100% - ${menuButtonElementHeight.value}px - 1.25rem) calc(100% - ${menuButtonElementWidth.value}px - 1.25rem) round 1rem)`,
	},
	open: {
		opacity: 1,
		clipPath: "inset(0% 0% 0% 0% round 1rem)",
	},
} satisfies Variants;
</script>

<template>
	<motion.nav
		v-if="isMenuOpen"
		:variants="navigationVariants"
		initial="initial"
		animate="open"
		exit="closed"
		aria-label="Main Menu"
		class="fixed top-2 right-2 left-2 z-30 flex max-h-[calc(100%-1rem)] flex-col gap-10 overflow-y-auto rounded-2xl bg-neutral-100 px-8 py-10 sm:top-5 sm:right-5 sm:left-auto sm:w-72"
		id="main-menu">
		<div class="flex flex-col gap-4">
			<NavigationSection
				title="Navigation"
				:navigationItems="navItems"
				@clickNavItem="() => $emit('clickNavItem')" />
		</div>

		<div class="flex flex-col gap-4">
			<NavigationSection
				title="Socials"
				:navigationItems="socialItems"
				:external="true"
				@clickNavItem="() => $emit('clickNavItem')" />
		</div>
	</motion.nav>
</template>
