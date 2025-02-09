export const useOnResize = (callback: () => void) => {
	window.addEventListener("resize", callback);

	return () => window.removeEventListener("resize", callback);
};
