import { BlogPost } from "@/components/blog/BlogPost.tsx";
import { useBlogPostsWithViewCount } from "@/components/blog/utils";
import { Skeleton } from "@/components/common/Skeleton";
import type { CollectionEntry } from "astro:content";
import useEmblaCarousel from "embla-carousel-react";

type OtherBlogPostsProps = {
	blogPosts: CollectionEntry<"blogPosts">[];
};

export const LatestBlogPosts = ({ blogPosts }: OtherBlogPostsProps) => {
	const [emblaRef] = useEmblaCarousel();

	const { isLoading, blogPostsWithViewCount } =
		useBlogPostsWithViewCount(blogPosts);

	return (
		<div className="overflow-hidden" ref={emblaRef}>
			<div className="-ml-3 flex touch-pan-y md:-ml-6">
				{blogPostsWithViewCount.map((post) => (
					<div
						key={post.id}
						className="transform-3d-[0_0_0] min-w-0 flex-[0_0_92%] pl-3 md:flex-[0_0_60%] md:pl-6 lg:flex-[0_0_45%]">
						<BlogPost post={post}>
							{isLoading ? (
								<Skeleton className="w-[8ch]" />
							) : (
								<span>
									{post.viewCount?.toLocaleString()} views
								</span>
							)}
						</BlogPost>
					</div>
				))}
			</div>
		</div>
	);
};
