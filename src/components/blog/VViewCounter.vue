<script setup lang="ts">
import VSkeletonLoader from "@/components/common/VSkeletonLoader.vue";
import { useIncreaseViewCount } from "@/components/blog/useIncreaseViewCount.ts";

const props = defineProps<{
	id: string;
}>();

const { isLoading, error, viewCount } = useIncreaseViewCount(props.id);
</script>

<template>
	<template v-if="!error">
		<VSkeletonLoader v-if="isLoading || viewCount === null" />

		<p v-else>{{ `${viewCount.toLocaleString()} views` }}</p>
	</template>
</template>
