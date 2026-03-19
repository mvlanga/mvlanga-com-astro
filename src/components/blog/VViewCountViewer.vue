<script setup lang="ts">
import VSkeletonLoader from "@/components/common/VSkeletonLoader.vue";

const { isLoading, viewCount, error } = defineProps<{
	isLoading: boolean;
	viewCount: number;
	error: unknown;
}>();
</script>

<template>
	<template v-if="!error">
		<VSkeletonLoader v-if="isLoading || viewCount === null" />

		<p v-else>{{ `${viewCount.toLocaleString()} views` }}</p>
	</template>
</template>
