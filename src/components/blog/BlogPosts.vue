<script setup lang="ts">
import type { BlogPostWithViewCount } from "@/components/blog/types.ts";
import BlogPost from "@/components/blog/BlogPost.vue";
import { computed } from "vue";
import { groupPostsByMonth } from "@/components/blog/utils.ts";
import {
	BLOG_FILTER_TAG_ALL_VALUE,
	blogFilterStore,
} from "@/components/blog/blogFilterStore.ts";
import {
	motion,
	AnimatePresence,
	type Transition,
	LayoutGroup,
} from "motion-v";

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

const transition: Transition = {
	duration: 0.4,
	ease: [0.27, 0.99, 0.25, 0.99],
};

const MotionBlogPost = motion.create(BlogPost, { forwardMotionProps: true });
</script>

<template>
	<section class="grid gap-16">
		<LayoutGroup :id="'blog-posts'">
			<AnimatePresence :initial="false">
				<template
					v-for="[title, posts] in blogPostsGrouped"
					:key="title">
					<motion.div
						layout="position"
						:transition="transition"
						:exit="{ opacity: 0 }"
						:initial="{ opacity: 0 }"
						:animate="{ opacity: 1 }"
						class="grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
						<p class="col-span-full text-2xl">
							{{ title }}
						</p>

						<AnimatePresence :initial="false">
							<MotionBlogPost
								v-for="post in posts"
								:key="post.id"
								:post="post"
								layout
								:transition="transition"
								:exit="{ opacity: 0 }"
								:initial="{ opacity: 0, y: '4rem' }"
								:animate="{ opacity: 1, y: '0' }" />
						</AnimatePresence>
					</motion.div>
				</template>
			</AnimatePresence>
		</LayoutGroup>
	</section>
</template>
