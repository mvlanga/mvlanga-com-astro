<script setup lang="ts">
import type { BlogPostWithViewCount } from "@/components/blog/types.ts";
import { computed } from "vue";

const props = defineProps<{
	post: BlogPostWithViewCount;
}>();

const {
	id,
	data: { title, description, tags, createdAt },
} = props.post;

const combinedTags = computed(() => tags.map((tag) => `#${tag}`).join(", "));
</script>

<template>
	<a
		class="group flex h-full w-full flex-col justify-between gap-8 rounded-4xl bg-neutral-100 p-6 transition-colors hover:bg-neutral-200 md:p-10"
		:href="`/blog/${{ id }}`">
		<div class="flex flex-col items-start gap-6">
			<h2 class="text-lg">{{ title }}</h2>
			<p class="text-neutral-600">{{ description }}</p>
		</div>

		<div class="flex grow items-end">
			<hr
				class="w-full border-neutral-300 transition-colors group-hover:border-neutral-400" />
		</div>

		<div
			class="flex flex-wrap justify-between gap-4 text-xs text-neutral-700">
			<p>
				{{ combinedTags }}
			</p>

			<div class="flex flex-wrap gap-4">
				<p>{{ createdAt.toLocaleDateString("en-US") }}</p>
			</div>
		</div>
	</a>
</template>
