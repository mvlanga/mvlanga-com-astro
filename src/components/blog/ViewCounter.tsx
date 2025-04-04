import { useViewCount } from "@/components/blog/utils.ts";
import { Skeleton } from "@/components/common/Skeleton.tsx";

type ViewCounterProps = {
	id: string;
};

export const ViewCounter = ({ id }: ViewCounterProps) => {
	const { isLoading, error, viewCount } = useViewCount(id);

	if (error) {
		return;
	}

	return isLoading || viewCount === null ? (
		<Skeleton className="w-[8ch]" />
	) : (
		<p className="inline-block">{viewCount.toLocaleString()} views</p>
	);
};
