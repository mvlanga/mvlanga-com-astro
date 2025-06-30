import type { CollectionEntry } from "astro:content";
import { OtherBlogPost } from "@/components/blog/OtherBlogPost";
import { useBlogPostsWithViewCount } from "@/components/blog/utils";
import { Skeleton } from "@/components/common/Skeleton";
import useEmblaCarousel from "embla-carousel-react";

type OtherBlogPostsProps = {
	blogPosts: CollectionEntry<"blogPosts">[];
};

export const OtherBlogPosts = ({ blogPosts }: OtherBlogPostsProps) => {
	const [emblaRef] = useEmblaCarousel();

	const { isLoading, blogPostsWithViewCount } =
		useBlogPostsWithViewCount(blogPosts);

	return (
		<div className="overflow-hidden" ref={emblaRef}>
			<div className="-ml-4 md:-ml-8 flex touch-pan-y">
				{blogPostsWithViewCount.map((post) => (
					<OtherBlogPost key={post.id} blogPost={post}>
						{isLoading ? (
							<Skeleton className="w-[8ch]" />
						) : (
							<span>{post.viewCount?.toLocaleString()} views</span>
						)}
					</OtherBlogPost>
				))}
			</div>
		</div>
	);
};
