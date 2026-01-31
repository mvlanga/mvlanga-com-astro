import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type SkeletonProps = {
	className?: string;
};

export const Skeleton = ({ className }: SkeletonProps) => {
	return (
		<div
			className={twMerge(
				clsx(
					"inline-block h-[1lh] w-full animate-pulse rounded-lg bg-neutral-800 transition-colors light:bg-neutral-200",
					className,
				),
			)}
		/>
	);
};
