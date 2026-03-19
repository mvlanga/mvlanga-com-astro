<script setup lang="ts">
import BaseSkeletonLoader from "@/components/common/BaseSkeletonLoader.vue";
import { useViewCount } from "@/components/blog/useViewCount.ts";

const props = defineProps<{
	id: string;
}>();

const { isLoading, error, viewCount } = useViewCount(props.id);
</script>

<template>
	<template v-if="!error">
		<BaseSkeletonLoader v-if="isLoading || viewCount === null" />

		<p v-else>{{ `${viewCount.toLocaleString()} views` }}</p>
	</template>
</template>
