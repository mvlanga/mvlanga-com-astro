import { clsx } from "clsx";
import type { ButtonHTMLAttributes, Ref } from "react";
import { twMerge } from "tailwind-merge";

export type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	ref?: Ref<HTMLButtonElement>;
	level?: "primary" | "secondary";
	size?: "small" | "medium";
	className?: string;
	text:
		| string
		| {
				default: string;
				activeText: string;
		  };
	isActive?: boolean;
};

export const NativeButton = ({
	ref,
	level = "primary",
	size = "medium",
	text,
	isActive,
	...additionalProps
}: NativeButtonProps) => {
	const defaultText = typeof text === "string" ? text : text.default;
	const activeText = typeof text === "string" ? text : text.activeText;
	const buttonLabel =
		(additionalProps["aria-label"] ?? isActive === false)
			? defaultText
			: activeText;

	const showActiveTextOnHover =
		typeof text === "string" || text.activeText === undefined;

	return (
		<button
			{...additionalProps}
			ref={ref}
			aria-label={buttonLabel}
			className={twMerge(
				clsx(
					"group relative inline-flex items-center justify-center overflow-clip",
					size === "small" && "rounded-2xl px-6 py-3",
					size === "medium" && "rounded-3xl px-8 py-4",
					level === "primary" && "bg-purple text-white",
					level === "secondary" &&
						"bg-neutral-900 light:bg-neutral-100 light:text-black text-white light:hover:text-white light:aria-expanded:text-white",
					isActive && "active",
					additionalProps.className,
				),
			)}
		>
			<div
				aria-hidden
				className="absolute z-0 h-[200%] w-[150%] translate-y-full rounded-[50%] bg-purple-700 transition-transform duration-200 ease-out group-hover:translate-y-0 group-[.active]:translate-y-0"
			/>

			<span className="z-10 flex justify-start whitespace-nowrap">
				<span>
					{defaultText.split("").map((char, i) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: splitting text, therefore there is no id available
							key={`default-text_${char}_${i}`}
							className={clsx(
								"transition-all duration-200 ease-out",
								showActiveTextOnHover &&
									"group-hover:-translate-y-full group-hover:opacity-0",
								!showActiveTextOnHover &&
									"group-[.active]:-translate-y-full group-[.active]:opacity-0",
								char === " " ? "" : "inline-block",
							)}
							style={{ transitionDelay: getTransitionDelayByIndex(i) }}
						>
							{char}
						</span>
					))}
				</span>

				<span className="absolute">
					{activeText.split("").map((char, i) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: splitting text, therefore there is no id available
							key={`default-text_${char}_${i}`}
							className={clsx(
								"translate-y-full opacity-0 transition-all duration-200 ease-out",
								showActiveTextOnHover &&
									"group-hover:translate-y-0 group-hover:opacity-100",
								!showActiveTextOnHover &&
									"group-[.active]:translate-y-0 group-[.active]:opacity-100",
								char === " " ? "" : "inline-block",
							)}
							style={{ transitionDelay: getTransitionDelayByIndex(i) }}
						>
							{char}
						</span>
					))}
				</span>
			</span>
		</button>
	);
};

const getTransitionDelayByIndex = (index: number) => `${index * 3}ms`;
