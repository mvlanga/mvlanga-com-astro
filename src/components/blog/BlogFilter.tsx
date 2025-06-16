import { Button } from "@/components/common/Button.tsx";
import { useDebounce } from "@/utils/useDebounce.ts";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import {
	BLOG_FILTER_TAG_ALL_VALUE,
	blogFilterSearchTerm,
	blogFilterTag,
} from "./blogFilterStore.ts";

type BlogFilterProps = {
	availableTags: { name: string; count: number }[];
};

export const BlogFilter = ({ availableTags }: BlogFilterProps) => {
	const $selectedTag = useStore(blogFilterTag);

	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	useEffect(() => {
		blogFilterSearchTerm.set(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	return (
		<div className="flex flex-wrap gap-2">
			<Button
				text="All"
				size="small"
				level={
					$selectedTag === BLOG_FILTER_TAG_ALL_VALUE ? "primary" : "secondary"
				}
				onClick={() => blogFilterTag.set(BLOG_FILTER_TAG_ALL_VALUE)}
			/>

			{availableTags.map(({ name, count }) => (
				<Button
					key={name}
					size="small"
					text={`#${name} (${count})`}
					level={$selectedTag === name ? "primary" : "secondary"}
					onClick={() => blogFilterTag.set(name)}
				/>
			))}

<input
  className="min-w-[30ch] flex-1 rounded-3xl bg-neutral-900 px-8 py-4 text-white"
  type="text"
  placeholder="Search by title, description or tag"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
		</div>
	);
};
