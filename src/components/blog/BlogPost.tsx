import { layoutTransition } from "@/components/blog/BlogPosts.tsx";
import type { BlogPostWithViewCount } from "@/components/blog/types.ts";
import { motion } from "motion/react";
import type { PropsWithChildren } from "react";

type BlogPostProps = {
	post: BlogPostWithViewCount;
} & PropsWithChildren;

const isSSR = import.meta.env.SSR;

export const BlogPost = ({
	post: {
		id,
		data: { title, createdAt, tags, description },
	},
	children,
}: BlogPostProps) => {
	return (
		<motion.a
			layout
			initial={{ opacity: isSSR ? 1 : 0, scale: isSSR ? 1 : 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={layoutTransition}
			className="group flex h-full w-full flex-col justify-between gap-8 rounded-4xl bg-neutral-100 p-12 transition-colors hover:bg-neutral-200"
			href={`/blog/${id}`}>
			<div className="flex flex-col items-start gap-6">
				<motion.h2 className="text-lg" layout>
					{title}
				</motion.h2>
				<motion.p layout className="text-neutral-600">
					{description}
				</motion.p>
			</div>

			<div className="flex grow items-end">
				<hr className="w-full border-neutral-300 transition-colors group-hover:border-neutral-400" />
			</div>

			<div className="flex flex-wrap justify-between gap-4 text-xs text-neutral-700">
				<p>{tags.map((tag) => `#${tag}`).join(", ")}</p>

				<div className="flex flex-wrap gap-4">
					{children}

					<p>{createdAt.toLocaleDateString("en-US")}</p>
				</div>
			</div>
		</motion.a>
	);
};
