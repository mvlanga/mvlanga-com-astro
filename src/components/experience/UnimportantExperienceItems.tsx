import { experienceUnimportantVisible } from "@/components/experience/experienceFilterStore.ts";
import { ExperienceItem } from "@/components/experience/ExperienceItem.tsx";
import { useStore } from "@nanostores/react";
import type { CollectionEntry } from "astro:content";
import { clsx } from "clsx";
import { motion } from "motion/react";

export const UnimportantExperienceItems = ({
	items,
}: {
	items: CollectionEntry<"experience">[];
}) => {
	const $unimportantItemsVisible = useStore(experienceUnimportantVisible);
	const isHidden = !$unimportantItemsVisible;

	return (
		<motion.div
			className="relative flex flex-col gap-4 overflow-hidden"
			variants={{
				visible: {
					height: "auto",
				},
				hidden: {
					height: "10rem",
				},
			}}
			initial="hidden"
			animate={isHidden ? "hidden" : "visible"}
			transition={{
				duration: 0.5,
				ease: [0.27, 0.99, 0.25, 0.99],
			}}
			aria-hidden={isHidden}>
			{isHidden && (
				<div
					aria-hidden
					className={clsx(
						"absolute inset-0 z-0 h-full w-full bg-linear-0 from-white to-transparent opacity-100 transition-opacity duration-150",
						isHidden && "opacity-0",
					)}
				/>
			)}
			{items.map((item) => (
				<ExperienceItem key={item.id} {...item} />
			))}
		</motion.div>
	);
};
