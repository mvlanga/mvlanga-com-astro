import { clsx } from "clsx";
import { motion } from "motion/react";
import type {
	AriaAttributes,
	PropsWithChildren,
	Ref,
	SyntheticEvent,
} from "react";
import { twMerge } from "tailwind-merge";

type IconButtonProps = {
	ref?: Ref<HTMLButtonElement>;
	level?: "primary" | "secondary";
	size?: "small" | "medium";
	className?: string;
	isActive?: boolean;
	onClick?: (event: SyntheticEvent<HTMLButtonElement>) => void;
	onFocus?: (event: SyntheticEvent<HTMLButtonElement>) => void;
} & PropsWithChildren &
	Partial<AriaAttributes>;

export const IconButton = ({
	ref,
	level = "primary",
	size = "medium",
	className: additionalClasses,
	onClick,
	onFocus,
	isActive,
	children,
	...ariaAttributes
}: IconButtonProps) => {
	return (
		<motion.button
			initial="default"
			animate={isActive ? "active" : "default"}
			whileHover="hover"
			ref={ref}
			className={twMerge(
				clsx(
					"relative inline-flex items-center justify-center overflow-hidden",
					size === "small" && "rounded-full p-3",
					size === "medium" && "rounded-full p-4",
					level === "primary" && "bg-purple text-white",
					level === "secondary" &&
					"bg-neutral-900 light:bg-neutral-100 light:text-black text-white light:hover:text-white",
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
			{children}
		</motion.button>
	);
};
