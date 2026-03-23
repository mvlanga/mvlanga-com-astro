<script setup lang="ts">
import type { BlogPost as BlogPostType } from "@/components/blog/types.ts";
import VBlogPost from "@/components/blog/VBlogPost.vue";
import { computed } from "vue";
import { groupPostsByMonth } from "@/components/blog/utils.ts";
import {
	BLOG_FILTER_TAG_ALL_VALUE,
	blogFilterStore,
} from "@/components/blog/blogFilterStore.ts";
import { useBlogPostsWithViewCount } from "@/components/blog/useBlogPostsWithViewCount.ts";
import VViewCountViewer from "@/components/blog/VViewCountViewer.vue";

const props = defineProps<{
	blogPosts: BlogPostType[];
}>();

const { isLoading, error, blogPostsWithViewCount } = useBlogPostsWithViewCount(
	props.blogPosts,
);

const blogPostsFiltered = computed(
	() =>
		blogPostsWithViewCount.value?.filter(
			(post) =>
				blogFilterStore.value === BLOG_FILTER_TAG_ALL_VALUE ||
				post.data.tags.includes(blogFilterStore.value),
		) ?? [],
);

const blogPostsGrouped = computed(() =>
	groupPostsByMonth(blogPostsFiltered.value).flat(),
);
</script>

<template>
	<section class="grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
		<Transition
			class="duration-2000"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
			leave-active-class="absolute">
			<template
				v-for="item in blogPostsGrouped"
				:key="
					typeof item === 'string'
						? item
						: item?.map((i) => i.id).join(',')
				">
				<template v-if="typeof item === 'string'">
					<p class="col-span-full text-2xl">
						{{ item }}
					</p>
				</template>

				<template v-else>
					<VBlogPost v-for="post in item" :key="post.id" :post="post">
						<template #viewCount>
							<VViewCountViewer
								:error="error"
								:is-loading="isLoading"
								:view-count="post.viewCount" />
						</template>
					</VBlogPost>
				</template>
			</template>
		</Transition>
	</section>
</template>
