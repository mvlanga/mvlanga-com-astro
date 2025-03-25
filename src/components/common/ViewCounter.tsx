import { actions } from "astro:actions";
import { useState } from "react";
import { useOnMount } from "@/utils/useOnMount.ts";

export const ViewCounter = ({
	id,
	shouldIncrease = false,
}: { id: string; shouldIncrease?: boolean }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [viewCount, setViewCount] = useState<number | null>(null);

	useOnMount(() => {
		const fetchData = async () => {
			const { data, error } = await actions.updatePageView({
				id,
				shouldIncrease,
			});

			setIsLoading(false);

			if (error) {
				throw new Error("Unable to run `blogPostViews` action");
			}

			const count = data?.[0]?.count;

			if (count === undefined) {
				throw new Error("Returned data of `blogPostViews` action is unusable");
			}

			setViewCount(count);
		};

		fetchData().catch(console.error);
	});

	return isLoading || viewCount === null ? (
		<div className="inline-block h-[1lh] w-[8ch] animate-pulse rounded-lg bg-neutral-900" />
	) : (
		<p className="inline-block">{viewCount.toLocaleString()} views</p>
	);
};
