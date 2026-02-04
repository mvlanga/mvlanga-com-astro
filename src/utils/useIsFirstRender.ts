import { useEffect, useRef } from "react";

export const useIsFirstRender = (): boolean => {
	const renderRef = useRef(true);

	useEffect(() => {
		renderRef.current = false;
	}, []);

	return renderRef.current;
};
