import type {
	BlogPost,
	BlogPostWithViewCount,
} from "@/components/blog/types.ts";
import { actions } from "astro:actions";
import { computed, onMounted, ref } from "vue";

export function useBlogPostsWithViewCount(blogPosts: BlogPost[]) {
	const isLoading = ref(true);
	const error = ref<unknown | null>(null);
	const viewCounts = ref<{ id: string; count: number }[] | null>(null);

	const fetchData = async () => {
		isLoading.value = true;
		error.value = null;

		try {
			const { data, error } = await actions.pageViews.get(
				blogPosts.map((post) => post.id),
			);

			if (error) {
				throw new Error("Unable to run `pageViews.get` action");
			}

			if (!data || !data[0]) {
				throw new Error(
					"Returned data of `pageViews.get` action is unusable",
				);
			}

			viewCounts.value = data;
		} catch (err) {
			console.error(err);
			error.value = err;
		} finally {
			isLoading.value = false;
		}
	};

	onMounted(fetchData);

	const blogPostsWithViewCount = computed(() =>
		blogPosts.map(
			(post) =>
				({
					...post,
					viewCount:
						viewCounts.value?.find(({ id }) => id === post.id)
							?.count ?? 0,
				}) satisfies BlogPostWithViewCount,
		),
	);

	return {
		isLoading,
		error,
		blogPostsWithViewCount,
	};
}
