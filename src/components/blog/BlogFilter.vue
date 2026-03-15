<script setup lang="ts">
import Button from "@/components/common/Button.vue";
import {
	BLOG_FILTER_TAG_ALL_VALUE,
	blogFilterStore,
} from "@/components/blog/blogFilterStore.ts";

const { availableTags } = defineProps<{
	availableTags: { name: string; count: number }[];
}>();
</script>

<template>
	<div class="flex flex-wrap gap-2">
		<Button
			text="All"
			size="small"
			:level="
				blogFilterStore.value === BLOG_FILTER_TAG_ALL_VALUE
					? 'primary'
					: 'secondary'
			"
			@click="
				() => (blogFilterStore.value = BLOG_FILTER_TAG_ALL_VALUE)
			" />

		<Button
			v-for="{ name, count } in availableTags"
			:key="name"
			size="small"
			:text="`#${name} (${count})`"
			:level="blogFilterStore.value === name ? 'primary' : 'secondary'"
			@click="() => (blogFilterStore.value = name)" />
	</div>
</template>
