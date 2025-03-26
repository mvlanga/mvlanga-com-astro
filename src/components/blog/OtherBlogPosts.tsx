import type { CollectionEntry } from "astro:content";
import { useBlogPostsWithViewCount } from "@/components/blog/utils.ts";
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
			<div className="-ml-8 flex touch-pan-y">
				{blogPostsWithViewCount.map(
					({
						id,
						data: { title, description, tags, createdAt },
						viewCount,
					}) => (
						<div
							key={id}
							className="transform-3d-[0_0_0] min-w-0 flex-[0_0_75%] pl-8 md:flex-[0_0_40%] lg:flex-[0_0_45%]"
						>
							<a
								className="group flex h-full w-full flex-col justify-between gap-8 rounded-4xl bg-neutral-900 p-12 transition-colors hover:bg-neutral-800"
								href={`/blog/${id}`}
							>
								<div className="flex flex-col items-start gap-6">
									<h5 className="text-lg">{title}</h5>
									<p className="text-neutral-300">{description}</p>
								</div>

								<hr className="border-neutral-800 transition-colors group-hover:border-neutral-700" />

								<div className="flex flex-wrap justify-between gap-4 text-neutral-400 text-xs">
									<p>{tags.map((tag) => `#${tag}`).join(", ")}</p>

									<div className="flex flex-wrap gap-4">
										{isLoading ? (
											<div className="inline-block h-[1lh] w-[8ch] animate-pulse rounded-lg bg-neutral-800" />
										) : (
											<span>{viewCount?.toLocaleString()} views</span>
										)}

										<p>{createdAt.toLocaleDateString("en-US")}</p>
									</div>
								</div>
							</a>
						</div>
					),
				)}
			</div>
		</div>
	);
};
