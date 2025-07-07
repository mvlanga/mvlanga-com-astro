import type { CollectionEntry } from "astro:content";
import useEmblaCarousel from "embla-carousel-react";

type OtherHighlightsProps = {
	highlights: CollectionEntry<"highlights">[];
};

export const OtherHighlights = ({ highlights }: OtherHighlightsProps) => {
	const [emblaRef] = useEmblaCarousel();

	return (
		<div className="overflow-hidden" ref={emblaRef}>
			<div className="-ml-8 flex touch-pan-y">
				{highlights.map(({ id, data: { title, cover, coverAlt } }, _index) => (
					<div
						key={id}
						className="transform-3d-[0_0_0] min-w-0 flex-[0_0_60%] pl-8 md:flex-[0_0_30%]"
					>
						<a href={`/${id}`} className="group flex flex-col gap-8">
							<img
								className="block rounded-3xl bg-neutral-900 light:bg-neutral-100 transition-opacity group-hover:light:opacity-75 group-hover:opacity-50"
								width={cover.width}
								height={cover.height}
								src={cover.src}
								alt={coverAlt}
								loading="lazy"
							/>
							<h3 className="text-lg">{title}</h3>
						</a>
					</div>
				))}
			</div>
		</div>
	);
};
