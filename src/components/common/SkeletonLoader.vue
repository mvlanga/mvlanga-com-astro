<script setup lang="ts">
const props = defineProps<{
	className: string;
}>();
</script>

<template>
	<div
		:class="[
			'inline-block h-lh w-full animate-pulse rounded-lg bg-neutral-200 transition-colors',
			props.className,
		]" />
</template>
