import type { CollectionEntry } from "astro:content";
import { motion, useDragControls } from "motion/react";

type OtherProjectsProps = {
	projects: CollectionEntry<"projects">[];
};

export const OtherProjects = ({ projects }: OtherProjectsProps) => {
	const controls = useDragControls();

	return (
		<div className="overflow-x-hid1den max-w-full">
			<motion.div
				className="flex will-change-transform"
				onPointerDown={(event) => controls.start(event)}
				drag="x"
				dragConstraints={{ left: 0, right: 0 }}
				dragControls={controls}
			>
				{projects.map(({ id, data: { title, cover } }) => (
					<a
						key={title}
						href={`/project/${id}`}
						className="group user-select-none grid w-[400px] gap-6"
					>
						<img
							src={cover.src}
							alt={title}
							className="user-select-none rounded-xl transition-opacity group-hover:opacity-75"
						/>
						<h5>{title}</h5>
					</a>
				))}
			</motion.div>
		</div>
	);
};
