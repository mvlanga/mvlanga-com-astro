const isSSR = import.meta.env.SSR;

export const useUsersReducedMotionPreference = (): boolean =>
	isSSR ? true : window.matchMedia("prefers-reduced-motion: reduce").matches;
