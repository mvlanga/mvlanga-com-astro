import { actions } from "astro:actions";
import { onMounted, ref, watch } from "vue";

export function useViewCount(id: string) {
	const isLoading = ref(true);
	const error = ref<unknown | null>(null);
	const viewCount = ref<number | null>(null);

	const fetchData = async () => {
		isLoading.value = true;
		error.value = null;

		try {
			const { data, error } = await actions.pageViews.increase(id);

			if (error) {
				throw new Error("Unable to run `pageViews.increase` action");
			}

			if (!data || !data[0]) {
				throw new Error(
					"Returned data of `pageViews.increase` action is unusable",
				);
			}

			viewCount.value = data[0].count;
		} catch (err) {
			console.error(err);
			error.value = err;
		} finally {
			isLoading.value = false;
		}
	};

	onMounted(fetchData);

	// Optional: refetch if id changes
	watch(() => id, fetchData);

	return {
		isLoading,
		error,
		viewCount,
	};
}
