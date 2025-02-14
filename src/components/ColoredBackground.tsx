import { clsx } from "clsx";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

export const ColoredBackground = ({ className }: { className?: string }) => {
	const ref = useRef<HTMLDivElement | null>(null);

	const { scrollYProgress } = useScroll({
		target: ref,
	});

	return (
		<motion.div
			ref={ref}
			className={twMerge(
				clsx(
					"-z-10 absolute top-0 right-0 bottom-0 left-0 bg-neutral-900",
					className,
				),
			)}
			style={{
				opacity: useTransform(scrollYProgress, [0, 1], [0, 1]),
			}}
		/>
	);
};
