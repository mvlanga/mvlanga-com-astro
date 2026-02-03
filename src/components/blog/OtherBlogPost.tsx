import type { CollectionEntry } from "astro:content";
import type { PropsWithChildren } from "react";

type OtherBlogPostProps = {
	blogPost: CollectionEntry<"blogPosts">;
} & PropsWithChildren;

export const OtherBlogPost = ({
	children,
	blogPost: {
		id,
		data: { title, description, tags, createdAt },
	},
}: OtherBlogPostProps) => {
	return (
		<div className="transform-3d-[0_0_0] min-w-0 flex-[0_0_92%] pl-4 md:flex-[0_0_60%] md:pl-8 lg:flex-[0_0_45%]">
			<a
				className="group flex h-full w-full flex-col justify-between gap-8 rounded-4xl bg-neutral-100 p-12 transition-colors hover:bg-neutral-200"
				href={`/blog/${id}`}>
				<div className="flex flex-col items-start gap-6">
					<h3 className="text-lg">{title}</h3>
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
		</div>
	);
};
