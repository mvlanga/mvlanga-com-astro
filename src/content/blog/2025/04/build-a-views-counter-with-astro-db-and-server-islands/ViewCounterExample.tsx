import { useEffect, useState } from "react";

export const ViewCounterExample = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setInterval(() => {
			setIsLoading((v) => !v);
		}, 5000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="relative mb-16 flex min-h-48 items-center justify-center gap-8 rounded-2xl bg-neutral-900 p-8">
			{isLoading ? (
				<div className="inline-flex h-[1lh] w-[8ch] animate-pulse rounded-lg bg-neutral-800" />
			) : (
				<div>{Math.floor(Math.random() * 100).toLocaleString()} views</div>
			)}
		</div>
	);
};
