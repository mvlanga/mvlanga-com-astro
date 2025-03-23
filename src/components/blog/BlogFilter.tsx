import { Button } from "@/components/common/Button.tsx";
import { useStore } from "@nanostores/react";
import { BLOG_FILTER_TAG_ALL_VALUE, blogFilterTag } from "./blogFilterStore.ts";

type BlogFilterProps = {
	availableTags: { name: string; count: number }[];
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

			{availableTags.map(({ name, count }) => (
				<Button
					key={name}
					text={`#${name} (${count})`}
					level={$selectedTag === name ? "primary" : "secondary"}
					onClick={() => blogFilterTag.set(name)}
				/>
			))}
		</div>
	);
};
