<script setup lang="ts">
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "motion-v";
import type { Variants } from "motion-v";
import { useElementSize } from "@/utils/useElementSize.ts";
import { computed, ref, toRefs, useTemplateRef } from "vue";
import NavigationMainSection from "@/components/header/NavigationMainSection.vue";
import NavigationSocialSection from "@/components/header/NavigationSocialSection.vue";
import Button from "@/components/common/Button.vue";
import { useEscapeKey } from "@/utils/useEscapeKey.ts";

const props = defineProps<{
	initialPath: string;
	isMenuTriggerButtonVisible: boolean;
}>();

defineEmits(["menuTriggerButtonFocus"]);

const { initialPath, isMenuTriggerButtonVisible } = toRefs(props);

const isNavigationOpen = ref(false);

const { scrollY } = useScroll();

useMotionValueEvent(scrollY, "change", () => {
	closeNavigation();
});

useEscapeKey(() => {
	isNavigationOpen.value = false;
});

const navigationButtonComponentRef =
	useTemplateRef<InstanceType<typeof Button>>("nav-trigger-button");
const navigationButtonElement = computed(
	() => navigationButtonComponentRef.value?.buttonElement ?? null,
);

const { width: menuButtonElementWidth, height: menuButtonElementHeight } =
	useElementSize(navigationButtonElement);

const navigationVariants = computed(
	() =>
		({
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
		}) satisfies Variants,
);

function triggerNavigation() {
	isNavigationOpen.value = !isNavigationOpen.value;
}

function closeNavigation() {
	isNavigationOpen.value = false;
}
</script>

<template>
	<div
		:class="[
			'fixed top-4 right-4 z-40 transition-all duration-150 ease-out sm:top-10 sm:right-10',
			isMenuTriggerButtonVisible
				? 'translate-y-0 opacity-100'
				: 'pointer-none -translate-y-full opacity-0',
		]">
		<Button
			ref="nav-trigger-button"
			@click="triggerNavigation"
			@focus="$emit('menuTriggerButtonFocus')"
			:is-active="isNavigationOpen"
			:text="{
				default: 'menu',
				activeText: 'close',
			}"
			class="shadow-2xl"
			level="secondary" />
	</div>

	<AnimatePresence>
		<motion.div
			v-if="isNavigationOpen"
			@click="closeNavigation"
			aria-hidden="true"
			class="fixed top-0 left-0 z-20 h-full w-full bg-black/20"
			:transition="{ duration: 0.15 }"
			:initial="{ opacity: 0 }"
			:animate="{ opacity: 1 }"
			:exit="{ opacity: 0 }" />
	</AnimatePresence>

	<AnimatePresence>
		<motion.nav
			v-if="isNavigationOpen"
			:variants="navigationVariants"
			initial="initial"
			animate="open"
			exit="closed"
			aria-label="Main Menu"
			class="fixed top-2 right-2 left-2 z-30 flex max-h-[calc(100%-1rem)] flex-col gap-10 overflow-y-auto rounded-2xl bg-neutral-100 px-8 py-10 sm:top-5 sm:right-5 sm:left-auto sm:w-72"
			id="main-menu">
			<div class="flex flex-col gap-4">
				<NavigationMainSection
					:initial-path="initialPath"
					@click-nav-item="closeNavigation" />
			</div>

			<div class="flex flex-col gap-4">
				<NavigationSocialSection @click-nav-item="closeNavigation" />
			</div>
		</motion.nav>
	</AnimatePresence>
</template>
