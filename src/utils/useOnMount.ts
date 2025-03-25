import { useEffect } from "react";

export const useOnMount = (callback: () => void, clearCallback?: () => void) =>
	// biome-ignore lint/correctness/useExhaustiveDependencies: Hook should only run on component mount
	useEffect(() => {
		callback();

		return () => clearCallback?.();
	}, []);
