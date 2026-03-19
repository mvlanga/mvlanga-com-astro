<script setup lang="ts">
import { computed, toRefs, useAttrs, useTemplateRef } from "vue";

const buttonElement = useTemplateRef<HTMLButtonElement>("button-element");

defineOptions({
	inheritAttrs: false,
});

defineExpose({
	buttonElement,
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
	}>(),
	{
		level: "primary",
		size: "medium",
	},
);

const { text, level, size, className, isActive } = toRefs(props);

const additionalProps = useAttrs();

const defaultText = computed(() =>
	typeof text.value === "string" ? text.value : text.value.default,
);

const activeText = computed(() =>
	typeof text.value === "string" ? text.value : text.value.activeText,
);

const buttonLabel = computed(() =>
	(additionalProps["aria-label"] ?? !isActive.value)
		? defaultText.value
		: activeText.value,
);

const showActiveTextOnHover =
	typeof text.value === "string" || text.value.activeText === undefined;

const styleObject = computed(() => ({
	"group relative inline-flex items-center justify-center gap-2 overflow-clip": true,
	"rounded-2xl px-6 py-3": size.value === "small",
	"rounded-3xl px-8 py-4": size.value === "medium",
	"bg-purple-500 text-white": level.value === "primary",
	"bg-neutral-100 text-black hover:text-white": level.value === "secondary",
	"active text-white": Boolean(isActive.value),
	[className.value ?? ""]: Boolean(className.value),
}));

const getTransitionDelayByIndex = (index: number) => `${index * 3}ms`;
</script>

<template>
	<button
		ref="button-element"
		v-bind="additionalProps"
		type="button"
		:aria-label="buttonLabel"
		:class="styleObject">
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
	</button>
</template>
