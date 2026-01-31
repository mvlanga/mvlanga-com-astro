import type { CollectionEntry } from "astro:content";
import useEmblaCarousel from "embla-carousel-react";
import { OtherBlogPost } from "@/components/blog/OtherBlogPost";
import { useBlogPostsWithViewCount } from "@/components/blog/utils";
import { Skeleton } from "@/components/common/Skeleton";

type OtherBlogPostsProps = {
	blogPosts: CollectionEntry<"blogPosts">[];
};

export const OtherBlogPosts = ({ blogPosts }: OtherBlogPostsProps) => {
	const [emblaRef] = useEmblaCarousel();

	const { isLoading, blogPostsWithViewCount } =
		useBlogPostsWithViewCount(blogPosts);

	return (
		<div className="overflow-hidden" ref={emblaRef}>
			<div className="-ml-4 flex touch-pan-y md:-ml-8">
				{blogPostsWithViewCount.map((post) => (
					<OtherBlogPost key={post.id} blogPost={post}>
						{isLoading ? (
							<Skeleton className="w-[8ch]" />
						) : (
							<span>
								{post.viewCount?.toLocaleString()} views
							</span>
						)}
					</OtherBlogPost>
				))}
			</div>
		</div>
	);
};
