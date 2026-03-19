<script setup lang="ts">
import type { CollectionEntry } from "astro:content";

const props = defineProps<{
	item: CollectionEntry<"experience">;
}>();

const { from, to, role, company, tasks, technologies } = props.item.data;
</script>

<template>
	<div
		class="grid gap-6 rounded-xl bg-neutral-100 p-6 md:p-10 lg:grid-cols-3 lg:gap-10">
		<div class="flex flex-col gap-4 lg:col-span-1">
			<p class="text-neutral-600">{{ from }} {{ " - " }} {{ to }}</p>
			<h3 class="text-3xl">{{ role }}</h3>
			<p class="text-neutral-700">
				at <span class="font-semibold">{{ company.title }}</span
				>,{{ " " }}
				{{ company.description }}
			</p>
		</div>

		<hr class="border-neutral-800 lg:hidden" />

		<div class="flex max-w-prose flex-col gap-8 lg:col-span-2">
			<ul class="flex flex-col gap-4 text-neutral-700">
				<li v-for="task in tasks" :key="task">{{ task }}</li>
			</ul>
			<div class="flex flex-wrap gap-2">
				<span
					v-for="tech in technologies"
					:key="tech"
					class="rounded-full bg-neutral-200 px-5 py-2 text-sm text-neutral-900">
					{{ tech }}
				</span>
			</div>
		</div>
	</div>
</template>
