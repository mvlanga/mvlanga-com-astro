<script setup lang="ts">
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion-v";
import { useElementSize } from "@/utils/ui/useElementSize.ts";
import { computed, toRefs, useTemplateRef } from "vue";
import VNavigationMainSection from "@/components/header/VNavigationMainSection.vue";
import VNavigationSocialSection from "@/components/header/VNavigationSocialSection.vue";
import VButton from "@/components/common/VButton.vue";
import { useEscapeKey } from "@/utils/ui/useEscapeKey.ts";
import { headerStore } from "@/components/header/headerStore.ts";

const props = defineProps<{
	initialPath: string;
	isMenuTriggerButtonVisible: boolean;
}>();

const { initialPath, isMenuTriggerButtonVisible } = toRefs(props);

const shouldReduceMotion = useReducedMotion();
const { scrollY } = useScroll();

useMotionValueEvent(scrollY, "change", () => {
	closeNavigation();
});

useEscapeKey(() => {
	headerStore.isNavigationOpen = false;
});

const navigationButtonComponentRef =
	useTemplateRef<InstanceType<typeof VButton>>("nav-trigger-button");
const navigationButtonElement = computed(
	() => navigationButtonComponentRef.value?.element ?? null,
);

const { width: menuButtonElementWidth, height: menuButtonElementHeight } =
	useElementSize(navigationButtonElement);

const navigationStyles = computed(() => {
	if (shouldReduceMotion.value) {
		return { "--nav-closed-clip": "none" };
	}

	return {
		"--nav-closed-clip": `inset(1.25rem 1.25rem calc(100% - ${menuButtonElementHeight.value}px - 1.25rem) calc(100% - ${menuButtonElementWidth.value}px - 1.25rem) round 1rem)`,
	};
});

function triggerNavigation() {
	headerStore.isNavigationOpen = !headerStore.isNavigationOpen;
}

function closeNavigation() {
	headerStore.isNavigationOpen = false;
}

function handleNavButtonFocus() {
	headerStore.isHeaderHidden = false;
}
</script>

<template>
	<div
		:class="[
			'fixed top-4 right-4 z-40 transition-all duration-200 ease-out sm:top-10 sm:right-10',
			isMenuTriggerButtonVisible
				? 'translate-y-0 opacity-100 blur-none'
				: 'pointer-events-none -translate-y-full opacity-0 blur-sm',
		]">
		<VButton
			ref="nav-trigger-button"
			:is-active="headerStore.isNavigationOpen"
			:text="{
				default: 'menu',
				activeText: 'close',
			}"
			class="shadow-2xl"
			level="secondary"
			@click="triggerNavigation"
			@focus="handleNavButtonFocus" />
	</div>

	<Transition
		class="duration-150 ease-out"
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
		leave-from-class="opacity-100"
		leave-to-class="opacity-0">
		<div
			v-if="headerStore.isNavigationOpen"
			key="main-menu-backdrop"
			aria-hidden="true"
			class="fixed top-0 left-0 z-20 h-full w-full bg-black/20"
			@click="closeNavigation" />
	</Transition>

	<Transition
		class="duration-200 ease-out"
		enter-active-class="transition-[opacity,clip-path]"
		leave-active-class="transition-[opacity,clip-path]"
		enter-from-class="opacity-0 [clip-path:var(--nav-closed-clip)]"
		enter-to-class="opacity-100 [clip-path:inset(0%_0%_0%_0%_round_1rem)]"
		leave-from-class="opacity-100 [clip-path:inset(0%_0%_0%_0%_round_1rem)]"
		leave-to-class="opacity-0 [clip-path:var(--nav-closed-clip)]">
		<nav
			v-if="headerStore.isNavigationOpen"
			id="main-menu"
			:style="navigationStyles"
			class="fixed top-2 right-2 left-2 z-30 flex max-h-[calc(100%-1rem)] flex-col gap-10 overflow-y-auto rounded-2xl bg-neutral-100 px-8 py-10 sm:top-5 sm:right-5 sm:left-auto sm:w-72"
			aria-label="Main Menu">
			<div class="flex flex-col gap-4">
				<VNavigationMainSection :initial-path="initialPath" />
			</div>
			<div class="flex flex-col gap-4">
				<VNavigationSocialSection />
			</div>
		</nav>
	</Transition>
</template>
