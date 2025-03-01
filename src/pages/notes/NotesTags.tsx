import { Button } from "@/components/common/Button.tsx";
import { useStore } from "@nanostores/react";
import { SELECTED_TAG_ALL_VALUE, selectedTag } from "./selectedTagStore";

type NotesProps = {
	availableTags: { name: string; count?: number }[];
};

export const NotesTags = ({ availableTags }: NotesProps) => {
	const $selectedTag = useStore(selectedTag);

	return (
		<div className="flex flex-wrap gap-2">
			{[{ name: SELECTED_TAG_ALL_VALUE }, ...availableTags].map(
				({ name, count }) => (
					<Button
						key={name}
						text={`${name} ${count ? `(${count})` : ""}`}
						level={$selectedTag === name ? "primary" : "secondary"}
						onClick={() => selectedTag.set(name)}
					/>
				),
			)}
		</div>
	);
};
