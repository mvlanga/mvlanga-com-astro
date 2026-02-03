import type { BlogPostWithViewCount } from "@/components/blog/types.ts";
import type { PropsWithChildren } from "react";

type BlogPostPreviewContentProps = {
	post: BlogPostWithViewCount;
} & PropsWithChildren;

export const BlogPostPreviewContent = ({
	post: {
		data: { title, createdAt, tags, description },
	},
	children,
}: BlogPostPreviewContentProps) => {
	return (
		<>
			<div className="flex flex-col items-start gap-6">
				<h2 className="text-lg">{title}</h2>
				<p className="text-neutral-600">{description}</p>
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
		</>
	);
};
