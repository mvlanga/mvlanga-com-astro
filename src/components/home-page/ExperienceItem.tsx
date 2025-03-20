import type { CollectionEntry } from "astro:content";
import { clsx } from "clsx";
import {
	motion,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export type ExperienceItemProps = Pick<
	CollectionEntry<"experience">,
	"data"
> & { index: number };

export const ExperienceItem = ({
	data: { from, to, role, technologies, company, tasks },
	index,
}: ExperienceItemProps) => {
	const refEl = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: refEl,
		offset: ["start end", "start start"],
	});

	const [isPrevItemOverlayHidden, setIsPrevItemOverlayHidden] = useState(true);

	const opacity = useTransform(scrollYProgress, [0, 1], [0, 0.8]);

	useMotionValueEvent(opacity, "change", (value) =>
		setIsPrevItemOverlayHidden(value === 0),
	);

	return (
		<>
			{index >= 1 && (
				<motion.div
					aria-hidden
					className={clsx(
						"pointer-events-none absolute inset-0 bg-black",
						isPrevItemOverlayHidden && "hidden",
					)}
					style={{
						zIndex: index * 10,
						opacity,
					}}
				/>
			)}
			<div
				ref={refEl}
				className="grid gap-x-8 gap-y-8 rounded-xl bg-neutral-900 p-8 md:p-16 lg:sticky lg:top-16 lg:grid-cols-3 lg:gap-32 lg:gap-x-16"
				style={{ zIndex: index * 20 }}
			>
				<div className="flex flex-col gap-4 lg:col-span-1">
					<p className="text-neutral-400">
						{from}
						{" - "}
						{to}
					</p>
					<h3 className="text-3xl">{role}</h3>
					<p className="text-neutral-300 text-xl">{company.title}</p>
					<p className="text-neutral-400">{company.description}</p>
				</div>
				<hr className="border-neutral-800 lg:hidden" />
				<div className="flex max-w-prose flex-col gap-8 lg:col-span-2">
					<ul className="flex flex-col gap-4 text-neutral-400">
						{tasks.map((task) => (
							<li key={task}>{task}</li>
						))}
					</ul>
					{technologies && (
						<div className="flex flex-wrap gap-2">
							{technologies.map((tech) => (
								<span
									key={tech}
									className="rounded-full bg-neutral-800 px-5 py-2 text-neutral-400 text-sm"
								>
									{tech}
								</span>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};
