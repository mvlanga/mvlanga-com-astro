<script setup lang="ts">
import useEmblaCarousel from "embla-carousel-vue";
import type { BlogPost as BlogPostType } from "@/components/blog/types.ts";
import BlogPost from "@/components/blog/BlogPost.vue";
import ViewCountViewer from "@/components/blog/ViewCountViewer.vue";
import { useBlogPostsWithViewCount } from "@/components/blog/useBlogPostsWithViewCount.ts";

const props = defineProps<{
	blogPosts: BlogPostType[];
}>();

const [emblaRef] = useEmblaCarousel();

const { isLoading, error, blogPostsWithViewCount } = useBlogPostsWithViewCount(
	props.blogPosts,
);
</script>

<template>
	<div ref="emblaRef" class="overflow-hidden">
		<div class="-ml-3 flex touch-pan-y md:-ml-6">
			<div
				v-for="post in blogPostsWithViewCount"
				:key="post.id"
				class="transform-3d-[0_0_0] min-w-0 flex-[0_0_92%] pl-3 md:flex-[0_0_60%] md:pl-6 lg:flex-[0_0_45%]">
				<BlogPost :post="post">
					<template #viewCount>
						<ViewCountViewer
							:error="error"
							:is-loading="isLoading"
							:view-count="post.viewCount" />
					</template>
				</BlogPost>
			</div>
		</div>
	</div>
</template>
