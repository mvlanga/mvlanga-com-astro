<script setup lang="ts">
import SkeletonLoader from "@/components/common/SkeletonLoader.vue";
import { actions } from "astro:actions";
import { onMounted, ref } from "vue";

const isSSR = import.meta.env.SSR;

const { id } = defineProps<{
	id: string;
}>();

const viewCount = ref<null | number>(null);
const isLoading = ref(true);
const error = ref(null);

const fetchData = async () => {
	const { data, error } = await actions.pageViews.increase(id);

	isLoading.value = false;

	if (error) {
		throw new Error("Unable to run `pageViews.increase` action");
	}

	if (data === undefined || data[0] === undefined) {
		throw new Error(
			"Returned data of `pageViews.increase` action is unusable",
		);
	}

	viewCount.value = data[0].count;
};

onMounted(() => {
	fetchData().catch((error) => {
		error.value = error;
	});
});
</script>

<template>
	<template v-if="!error">
		<SkeletonLoader
			v-if="isSSR || isLoading || viewCount === null"
			class-name="w-[8ch]" />

		<p v-else>{{ `${viewCount.toLocaleString()} views` }}</p>
	</template>
</template>
