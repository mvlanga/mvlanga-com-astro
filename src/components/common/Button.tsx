import { clsx } from "clsx";
import { motion } from "motion/react";
import type { AriaAttributes, Ref, SyntheticEvent } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
	ref?: Ref<HTMLButtonElement>;
	level?: "primary" | "secondary";
	size?: "small" | "medium";
	className?: string;
	onClick?: (event: SyntheticEvent<HTMLButtonElement>) => void;
	onFocus?: (event: SyntheticEvent<HTMLButtonElement>) => void;
} & PerspectiveTextHoverProps &
	Partial<AriaAttributes>;

export const Button = ({
	text,
	activeText,
	ref,
	level = "primary",
	size = "medium",
	isActive = false,
	className: additionalClasses,
	onClick,
	onFocus,
	...ariaAttributes
}: ButtonProps) => {
	return (
		<motion.button
			initial="default"
			animate={isActive ? "active" : "default"}
			whileHover="hover"
			ref={ref}
			className={twMerge(
				clsx(
					"relative inline-flex items-center justify-center overflow-hidden",
					size === "small" && "rounded-2xl px-6 py-3",
					size === "medium" && "rounded-3xl px-8 py-4",
					level === "primary" && "bg-purple text-white",
					level === "secondary" &&
						"bg-neutral-900 light:bg-neutral-100 light:text-black text-white light:hover:text-white light:aria-expanded:text-white",
					additionalClasses,
				),
			)}
			onClick={onClick}
			onFocus={onFocus}
			{...ariaAttributes}
		>
			<motion.div
				transition={{ duration: 0.2, ease: "easeOut" }}
				variants={{
					default: {
						translateY: "100%",
					},
					active: {
						translateY: "0",
					},
					hover: {
						translateY: "0",
					},
				}}
				className={clsx(
					"absolute h-[200%] w-[150%] rounded-[50%] bg-purple-700",
				)}
			/>
			<PerspectiveTextHover
				className="justify-center"
				text={text}
				activeText={activeText}
				isActive={isActive}
			/>
		</motion.button>
	);
};

type PerspectiveTextHoverProps = {
	text: string;
	activeText?: undefined | string;
	isActive?: boolean;
	className?: string;
};

const PerspectiveTextHover = ({
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
						className={`${char === " " ? "" : "inline-block"} transition-colors`}
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
						className={`${char === " " ? "" : "inline-block"} transition-colors`}
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
