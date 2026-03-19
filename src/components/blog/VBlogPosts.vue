<script setup lang="ts">
import type { BlogPost as BlogPostType } from "@/components/blog/types.ts";
import VBlogPost from "@/components/blog/VBlogPost.vue";
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

const transition: Transition = {
	duration: 0.4,
	ease: [0.27, 0.99, 0.25, 0.99],
};

const MotionBlogPost = motion.create(VBlogPost, { forwardMotionProps: true });
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
								:animate="{ opacity: 1, y: '0' }">
								<template #viewCount>
									<VViewCountViewer
										:error="error"
										:is-loading="isLoading"
										:view-count="post.viewCount" />
								</template>
							</MotionBlogPost>
						</AnimatePresence>
					</motion.div>
				</template>
			</AnimatePresence>
		</LayoutGroup>
	</section>
</template>
