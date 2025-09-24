import { useStore } from "@nanostores/react";
import { NativeButton } from "@/components/common/NativeButton";
import { BLOG_FILTER_TAG_ALL_VALUE, blogFilterTag } from "./blogFilterStore";

type BlogFilterProps = {
	availableTags: { name: string; count: number }[];
};

export const BlogFilter = ({ availableTags }: BlogFilterProps) => {
	const $selectedTag = useStore(blogFilterTag);

	return (
		<div className="flex flex-wrap gap-2">
			<NativeButton
				text="All"
				size="small"
				level={
					$selectedTag === BLOG_FILTER_TAG_ALL_VALUE ? "primary" : "secondary"
				}
				onClick={() => blogFilterTag.set(BLOG_FILTER_TAG_ALL_VALUE)}
			/>

			{availableTags.map(({ name, count }) => (
				<NativeButton
					key={name}
					size="small"
					text={`#${name} (${count})`}
					level={$selectedTag === name ? "primary" : "secondary"}
					onClick={() => blogFilterTag.set(name)}
				/>
			))}
		</div>
	);
};
