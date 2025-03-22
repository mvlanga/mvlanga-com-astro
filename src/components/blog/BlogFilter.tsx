import { Button } from "@/components/common/Button.tsx";
import { useStore } from "@nanostores/react";
import { SELECTED_TAG_ALL_VALUE, selectedTag } from "./selectedTagStore.ts";

type BlogFilterProps = {
	availableTags: string[];
};

export const BlogFilter = ({ availableTags }: BlogFilterProps) => {
	const $selectedTag = useStore(selectedTag);

	return (
		<div className="flex flex-wrap gap-2">
			<Button
				key={SELECTED_TAG_ALL_VALUE}
				text="All"
				level={
					$selectedTag === SELECTED_TAG_ALL_VALUE ? "primary" : "secondary"
				}
				onClick={() => selectedTag.set(SELECTED_TAG_ALL_VALUE)}
			/>

			{availableTags.map((tag) => (
				<Button
					key={tag}
					text={`#${tag}`}
					level={$selectedTag === tag ? "primary" : "secondary"}
					onClick={() => selectedTag.set(tag)}
				/>
			))}
		</div>
	);
};
