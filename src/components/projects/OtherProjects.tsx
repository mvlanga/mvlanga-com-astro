import type { CollectionEntry } from "astro:content";
import useEmblaCarousel from "embla-carousel-react";

type OtherProjectsProps = {
	projects: CollectionEntry<"projects">[];
};

export const OtherProjects = ({ projects }: OtherProjectsProps) => {
	const [emblaRef] = useEmblaCarousel();

	return (
		<div className="overflow-hidden" ref={emblaRef}>
			<div className="-ml-8 flex touch-pan-y">
				{projects.map(({ id, data: { title, cover } }, index) => (
					<div
						key={id}
						className="transform-3d-[0_0_0] min-w-0 flex-[0_0_60%] pl-8 md:flex-[0_0_30%]"
					>
						<a href={`/project/${id}`} className="group flex flex-col gap-8">
							<img
								className="block rounded-3xl bg-neutral-900 transition-opacity group-hover:opacity-50"
								width={cover.width}
								height={cover.height}
								src={cover.src}
								alt={title}
								loading="lazy"
							/>
							<h4 className="text-lg">{title}</h4>
						</a>
					</div>
				))}
			</div>
		</div>
	);
};
