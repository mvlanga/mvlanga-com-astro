<script setup lang="ts">
import VButton from "@/components/common/VButton.vue";
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
		<VButton
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

		<VButton
			v-for="{ name, count } in availableTags"
			:key="name"
			size="small"
			:text="`#${name} (${count})`"
			:level="blogFilterStore.value === name ? 'primary' : 'secondary'"
			@click="() => (blogFilterStore.value = name)" />
	</div>
</template>
