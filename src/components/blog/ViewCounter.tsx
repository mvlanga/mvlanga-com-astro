import { useViewCount } from "@/components/blog/utils";
import { Skeleton } from "@/components/common/Skeleton";

const isSSR = import.meta.env.SSR;

type ViewCounterProps = {
	id: string;
};

export const ViewCounter = ({ id }: ViewCounterProps) => {
	const { isLoading, error, viewCount } = useViewCount(id);

	if (error) {
		return;
	}

	return isSSR || isLoading || viewCount === null ? (
		<Skeleton className="w-[8ch]" />
	) : (
		<p className="inline-block">{viewCount.toLocaleString()} views</p>
	);
};
