<script setup lang="ts">
import useEmblaCarousel from "embla-carousel-vue";
import type { BlogPost as BlogPostType } from "@/components/blog/types.ts";
import SkeletonLoader from "@/components/common/SkeletonLoader.vue";
import BlogPost from "@/components/blog/BlogPost.vue";

const { blogPosts } = defineProps<{
	blogPosts: BlogPostType[];
}>();

const [emblaRef] = useEmblaCarousel();
</script>

<template>
	<div ref="emblaRef" class="overflow-hidden">
		<div class="-ml-3 flex touch-pan-y md:-ml-6">
			<div
				v-for="post in blogPosts"
				:key="post.id"
				class="transform-3d-[0_0_0] min-w-0 flex-[0_0_92%] pl-3 md:flex-[0_0_60%] md:pl-6 lg:flex-[0_0_45%]">
				<BlogPost :post="post">
					<SkeletonLoader />
				</BlogPost>
			</div>
		</div>
	</div>
</template>
