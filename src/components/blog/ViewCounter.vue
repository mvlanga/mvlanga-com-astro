<script setup lang="ts">
import SkeletonLoader from "@/components/common/SkeletonLoader.vue";
import { useViewCount } from "@/components/blog/useViewCount.ts";

const isSSR = import.meta.env.SSR;

const props = defineProps<{
	id: string;
}>();

const { isLoading, error, viewCount } = useViewCount(props.id);
</script>

<template>
	<template v-if="!error">
		<SkeletonLoader v-if="isSSR || isLoading || viewCount === null" />

		<p v-else>{{ `${viewCount.toLocaleString()} views` }}</p>
	</template>
</template>
