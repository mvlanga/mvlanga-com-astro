import { Button } from "@/components/common/Button.tsx";
import { useStore } from "@nanostores/react";
import { BLOG_FILTER_TAG_ALL_VALUE, blogFilterTag } from "./blogFilterStore.ts";

type BlogFilterProps = {
	availableTags: string[];
};

export const BlogFilter = ({ availableTags }: BlogFilterProps) => {
	const $selectedTag = useStore(blogFilterTag);

	return (
		<div className="flex flex-wrap gap-2">
			<Button
				text="All"
				level={
					$selectedTag === BLOG_FILTER_TAG_ALL_VALUE ? "primary" : "secondary"
				}
				onClick={() => blogFilterTag.set(BLOG_FILTER_TAG_ALL_VALUE)}
			/>

			{availableTags.map((tag) => (
				<Button
					key={tag}
					text={`#${tag}`}
					level={$selectedTag === tag ? "primary" : "secondary"}
					onClick={() => blogFilterTag.set(tag)}
				/>
			))}
		</div>
	);
};
