import type { CollectionEntry } from "astro:content";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type OtherProjectsProps = {
	projects: CollectionEntry<"projects">[];
};

export const OtherProjects = ({ projects }: OtherProjectsProps) => {
	return (
		<Swiper spaceBetween={48} slidesPerView={"auto"} className="w-full">
			{projects.map(({ id, data: { title, cover } }, index) => (
				<SwiperSlide key={id} virtualIndex={index} className="group w-80!">
					<a href={`/project/${id}`} className="flex flex-col gap-8">
						<img
							className="block rounded-3xl transition-opacity group-hover:opacity-50"
							width={cover.width}
							height={cover.height}
							src={cover.src}
							alt={title}
							loading="lazy"
						/>
						<h4 className="text-lg">{title}</h4>
					</a>
				</SwiperSlide>
			))}
		</Swiper>
	);
};
