import "@/styles.css";
import { clsx } from "clsx";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

export type PerspectiveTextHoverProps = {
	text: string;
	activeText?: string;
	isActive?: boolean;
	className?: string;
};

export const PerspectiveTextHover = ({
	text,
	activeText,
	isActive,
	className: additionalClasses,
}: PerspectiveTextHoverProps) => {
	return (
		<motion.span
			variants={{
				default: {
					transition: {
						staggerChildren: 0.002,
						delay: 0,
						duration: 0.05,
						staggerDirection: -1,
					},
				},
				active: {
					transition: {
						staggerChildren: 0.002,
						delay: 0,
						duration: 0.05,
					},
				},
				hover: {
					transition: {
						staggerChildren: 0.002,
						delay: 0,
						duration: 0.1,
					},
				},
			}}
			className={twMerge(
				clsx(
					"relative flex justify-start whitespace-nowrap",
					additionalClasses,
				),
			)}
		>
			<motion.span
				aria-hidden={activeText !== undefined && isActive}
				aria-label={text}
			>
				{text.split("").map((char, i) => (
					<motion.span
						// biome-ignore lint/suspicious/noArrayIndexKey: splitting text, therefore there is no id available
						key={`default-text_${char}_${i}`}
						className={char === " " ? "" : "inline-block"}
						variants={{
							default: {
								visibility: "visible",
								translateY: "0",
								opacity: 1,
							},
							active: {
								visibility: "hidden",
								translateY: "-100%",
								opacity: 0,
							},
							hover:
								activeText === undefined
									? {
											visibility: "hidden",
											translateY: "-100%",
											opacity: 0,
										}
									: {},
						}}
					>
						{char}
					</motion.span>
				))}
			</motion.span>
			<motion.span
				className="absolute"
				aria-hidden={activeText === undefined || !isActive}
				aria-label={activeText ?? text}
			>
				{(activeText ?? text).split("").map((char, i) => (
					<motion.span
						// biome-ignore lint/suspicious/noArrayIndexKey: splitting text, therefore there is no id available
						key={`active-text_${char}_${i}`}
						className={char === " " ? "" : "inline-block"}
						variants={{
							default: {
								visibility: "hidden",
								translateY: "100%",
								opacity: 0,
							},
							active: {
								visibility: "visible",
								translateY: "0",
								opacity: 1,
							},
							hover:
								activeText === undefined
									? {
											visibility: "visible",
											translateY: "0",
											opacity: 1,
										}
									: {},
						}}
					>
						{char}
					</motion.span>
				))}
			</motion.span>
		</motion.span>
	);
};
