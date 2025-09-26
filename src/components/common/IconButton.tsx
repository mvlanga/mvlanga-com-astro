import { clsx } from "clsx";
import type { ButtonHTMLAttributes, PropsWithChildren, Ref } from "react";
import { twMerge } from "tailwind-merge";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	PropsWithChildren & {
		ref?: Ref<HTMLButtonElement>;
		level?: "primary" | "secondary";
		size?: "small" | "medium";
		className?: string;
	};

export const IconButton = ({
	ref,
	level = "primary",
	size = "medium",
	children,
	...additionalProps
}: IconButtonProps) => {
	return (
		<button
			type="button"
			ref={ref}
			{...additionalProps}
			className={twMerge(
				clsx(
					"group relative inline-flex items-center justify-center overflow-clip",
					size === "small" && "rounded-full p-3",
					size === "medium" && "rounded-full p-4",
					level === "primary" && "bg-purple text-white",
					level === "secondary" &&
						"bg-neutral-900 light:bg-neutral-100 light:text-black text-white light:hover:text-white",
					additionalProps.className,
				),
			)}
		>
			<div
				aria-hidden
				className="absolute z-0 h-[200%] w-[150%] translate-y-full rounded-[50%] bg-purple-700 transition-transform duration-200 ease-out group-hover:translate-y-0 group-[.active]:translate-y-0"
			/>

			{children}
		</button>
	);
};
