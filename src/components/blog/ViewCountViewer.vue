<script setup lang="ts">
import BaseSkeletonLoader from "@/components/common/BaseSkeletonLoader.vue";

const { isLoading, viewCount, error } = defineProps<{
	isLoading: boolean;
	viewCount: number;
	error: unknown;
}>();
</script>

<template>
	<template v-if="!error">
		<BaseSkeletonLoader v-if="isLoading || viewCount === null" />

		<p v-else>{{ `${viewCount.toLocaleString()} views` }}</p>
	</template>
</template>
