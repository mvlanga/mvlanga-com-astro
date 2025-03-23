import type { CollectionEntry } from "astro:content";
import useEmblaCarousel from "embla-carousel-react";

type OtherBlogPostsProps = {
	blogPosts: CollectionEntry<"blogPosts">[];
};

export const OtherBlogPosts = ({ blogPosts }: OtherBlogPostsProps) => {
	const [emblaRef] = useEmblaCarousel();

	return (
		<div className="overflow-hidden" ref={emblaRef}>
			<div className="-ml-8 flex touch-pan-y">
				{blogPosts.map(
					({ id, data: { title, description, tags, createdAt } }) => (
						<div
							key={id}
							className="transform-3d-[0_0_0] min-w-0 flex-[0_0_75%] pl-8 md:flex-[0_0_40%] lg:flex-[0_0_45%]"
						>
							<a
								className="flex h-full w-full flex-col justify-between gap-8 rounded-4xl bg-neutral-900 p-12 transition-colors hover:bg-neutral-800"
								href={`/blog/${id}`}
							>
								<div className="flex flex-col items-start gap-6">
									<h5 className="text-lg">{title}</h5>
									<p className="text-neutral-300">{description}</p>
								</div>

								<div className="flex flex-wrap justify-between gap-2 text-neutral-400 text-xs">
									<p>{tags.map((tag) => `#${tag}`).join(", ")}</p>
									<p>{createdAt.toLocaleDateString("en-US")}</p>
								</div>
							</a>
						</div>
					),
				)}
			</div>
		</div>
	);
};
