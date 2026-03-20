<script setup lang="ts">
import { computed, toRefs, useTemplateRef } from "vue";

const element = useTemplateRef<HTMLButtonElement | HTMLLinkElement>("element");

defineExpose({
	element,
});

const props = withDefaults(
	defineProps<{
		text:
			| string
			| {
					default: string;
					activeText: string;
			  };
		className?: string;
		level?: "primary" | "secondary";
		size?: "small" | "medium";
		isActive?: boolean;
		href?: string;
	}>(),
	{
		level: "primary",
		size: "medium",
	},
);

const { text, level, size, className, isActive, href } = toRefs(props);

const defaultText = computed(() =>
	typeof text.value === "string" ? text.value : text.value.default,
);

const activeText = computed(() =>
	typeof text.value === "string" ? text.value : text.value.activeText,
);

const buttonLabel = computed(() =>
	isActive.value ? activeText.value : defaultText.value,
);

const showActiveTextOnHover = computed(
	() => typeof text.value === "string" || text.value.activeText === undefined,
);

const elementStyles = computed(() => ({
	"group relative inline-flex items-center justify-center gap-2 overflow-clip cursor-pointer": true,
	"rounded-2xl px-4 py-2": size.value === "small",
	"rounded-3xl px-8 py-4": size.value === "medium",
	"bg-purple-500 text-white": level.value === "primary",
	"bg-neutral-100 text-black hover:text-white": level.value === "secondary",
	"active text-white": Boolean(isActive.value),
	[className.value ?? ""]: Boolean(className.value),
}));

const getTransitionDelayByIndex = (index: number) => `${index * 3}ms`;
</script>

<template>
	<component
		ref="element"
		:is="href ? 'a' : 'button'"
		:href="href"
		:aria-label="buttonLabel"
		:class="elementStyles">
		<div
			aria-hidden="true"
			class="absolute z-0 h-[200%] w-[150%] translate-y-full rounded-[50%] bg-purple-700 transition-transform duration-200 ease-out group-hover:translate-y-0 group-[.active]:translate-y-0" />

		<span class="z-10 flex justify-items-start whitespace-nowrap">
			<span>
				<span
					v-for="(char, index) in defaultText.split('')"
					:key="`default_text_${char}_${index}`"
					:class="{
						'transition-all duration-200 ease-out': true,
						'group-hover:-translate-y-full group-hover:opacity-0':
							showActiveTextOnHover,
						'group-[.active]:-translate-y-full group-[.active]:opacity-0':
							!showActiveTextOnHover,
						'inline-block': char !== ' ',
					}"
					:style="{
						'transition-delay': getTransitionDelayByIndex(index),
					}">
					{{ char }}
				</span>
			</span>

			<span class="absolute">
				<span
					v-for="(char, index) in activeText.split('')"
					:key="`active_text_${char}_${index}`"
					:class="{
						'translate-y-full opacity-0 transition-all duration-200 ease-out': true,
						'group-hover:translate-y-0 group-hover:opacity-100':
							showActiveTextOnHover,
						'group-[.active]:translate-y-0 group-[.active]:opacity-100':
							!showActiveTextOnHover,
						'inline-block': char !== ' ',
					}"
					:style="{
						'transition-delay': getTransitionDelayByIndex(index),
					}">
					{{ char }}
				</span>
			</span>
		</span>
	</component>
</template>
