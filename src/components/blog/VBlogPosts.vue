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
	groupPostsByMonth(blogPostsFiltered.value),
);
</script>

<template>
	<TransitionGroup name="blog-posts" tag="section" class="grid gap-16">
		<template v-for="[title, posts] in blogPostsGrouped" :key="title">
			<div
				class="grid gap-8 duration-150 ease-out sm:grid-cols-2 xl:grid-cols-2">
				<p class="col-span-full text-2xl">
					{{ title }}
				</p>

				<TransitionGroup tag="div" name="blog-posts-area">
					<VBlogPost
						v-for="post in posts"
						:key="post.id"
						:post="post">
						<template #viewCount>
							<VViewCountViewer
								:error="error"
								:is-loading="isLoading"
								:view-count="post.viewCount" />
						</template>
					</VBlogPost>
				</TransitionGroup>
			</div>
		</template>
	</TransitionGroup>
</template>
