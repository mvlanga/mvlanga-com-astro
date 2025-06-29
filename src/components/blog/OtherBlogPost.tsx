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
				className="group flex h-full w-full flex-col justify-between gap-8 rounded-4xl bg-neutral-900 light:bg-neutral-200 p-12 transition-colors hover:bg-neutral-800 light:hover:bg-neutral-300"
				href={`/blog/${id}`}
			>
				<div className="flex flex-col items-start gap-6">
					<h3 className="text-lg">{title}</h3>
					<p className="light:text-neutral-600 text-neutral-300 contrast-more:light:text-neutral-800">
						{description}
					</p>
				</div>

				<div className="flex grow-1 items-end">
					<hr className="w-full border-neutral-800 light:border-neutral-400 transition-colors group-hover:border-neutral-700 group-hover:light:border-neutral-500" />
				</div>

				<div className="flex flex-wrap justify-between gap-4 light:text-neutral-700 text-neutral-400 text-xs">
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
