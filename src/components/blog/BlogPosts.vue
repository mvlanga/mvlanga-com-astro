<script setup lang="ts">
import type { BlogPostWithViewCount } from "@/components/blog/types.ts";
import BlogPost from "@/components/blog/BlogPost.vue";
import { computed } from "vue";
import { groupPostsByMonth } from "@/components/blog/utils.ts";
import {
	BLOG_FILTER_TAG_ALL_VALUE,
	blogFilterStore,
} from "@/components/blog/blogFilterStore.ts";

const { blogPosts } = defineProps<{
	blogPosts: BlogPostWithViewCount[];
}>();

const blogPostsFiltered = computed(() =>
	blogPosts.filter(
		(post) =>
			blogFilterStore.value === BLOG_FILTER_TAG_ALL_VALUE ||
			post.data.tags.includes(blogFilterStore.value),
	),
);

const blogPostsGrouped = computed(() =>
	groupPostsByMonth(blogPostsFiltered.value),
);
</script>

<template>
	<section class="grid gap-16">
		<template v-for="[title, posts] in blogPostsGrouped" :key="title">
			<template v-if="posts && posts.length > 0">
				<div class="grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
					<p class="col-span-full text-2xl">
						{{ title }}
					</p>

					<BlogPost
						v-for="post in posts"
						:key="post.id"
						:post="post" />
				</div>
			</template>
		</template>
	</section>
</template>
