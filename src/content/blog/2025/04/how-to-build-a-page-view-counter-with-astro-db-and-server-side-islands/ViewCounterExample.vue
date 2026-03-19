<script setup lang="ts">
import { onMounted, ref } from "vue";

const isLoading = ref(false);

onMounted(() => {
	const timer = setInterval(() => {
		isLoading.value = !isLoading.value;
	}, 2500);

	return () => clearInterval(timer);
});
</script>

<template>
	<div
		class="relative mb-16 flex min-h-48 items-center justify-center gap-8 rounded-2xl bg-neutral-100 p-8">
		<div v-if="isLoading">
			<div
				class="inline-flex h-lh w-[8ch] animate-pulse rounded-lg bg-neutral-200" />
		</div>
		<div v-else>
			{{ Math.floor(Math.random() * 2000).toLocaleString() }} views
		</div>
	</div>
</template>
