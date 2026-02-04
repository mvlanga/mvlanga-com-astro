import type { BlogPostWithViewCount } from "@/components/blog/types.ts";
import { createElement, type PropsWithChildren, type Ref } from "react";

type SemanticTitleElement = "h2" | "h3";

type BlogPostProps = {
	post: BlogPostWithViewCount;
	semanticTitleElement: SemanticTitleElement;
	ref?: Ref<HTMLAnchorElement>;
} & PropsWithChildren;

const DynamicTitle = ({
	element,
	className,
	content,
}: {
	className: string;
	element: SemanticTitleElement;
	content: string;
}) => createElement(element, { className }, content);

export const BlogPost = ({
	post: {
		id,
		data: { title, description, tags, createdAt },
	},
	semanticTitleElement,
	children,
	ref,
}: BlogPostProps) => {
	return (
		<a
			ref={ref}
			className="group flex h-full w-full flex-col justify-between gap-8 rounded-4xl bg-neutral-100 p-6 transition-colors hover:bg-neutral-200 md:p-10"
			href={`/blog/${id}`}>
			<div className="flex flex-col items-start gap-6">
				<DynamicTitle
					element={semanticTitleElement}
					className="text-lg"
					content={title}
				/>
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
		</a>
	);
};
