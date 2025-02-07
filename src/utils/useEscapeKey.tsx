import { useCallback, useEffect } from "react";

export function useEscapeKey(handleClose: () => void) {
	const handleEscKey = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleClose();
			}
		},
		[handleClose],
	);

	useEffect(() => {
		document.addEventListener("keyup", handleEscKey);

		return () => {
			document.removeEventListener("keyup", handleEscKey);
		};
	}, [handleEscKey]);
}
