import { IconButton } from "@/components/common/IconButton.tsx";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

type Theme = "dark" | "light";

export const ThemeToggleButton = () => {
	const shouldReduceMotion = useReducedMotion();

	const [theme, setTheme] = useState<Theme>(
		userPrefersLightTheme() ? "light" : "dark",
	);

	function toggleTheme() {
		const root = document.documentElement;
		const currentTheme = root.getAttribute("data-theme") || "dark";

		const newTheme = currentTheme === "light" ? "dark" : "light";

		try {
			localStorage.theme = newTheme;
		} catch (e) {
			console.warn("Could not save theme preference:", e);
		}

		if (shouldReduceMotion || !document.startViewTransition) {
			setTheme(newTheme);
			root.setAttribute("data-theme", newTheme);

			return;
		}

		document.startViewTransition(() => {
			setTheme(newTheme);
			root.setAttribute("data-theme", newTheme);
		});
	}

	return (
		<IconButton level="secondary" onClick={() => toggleTheme()}>
			<div className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-current transition-colors">
				<motion.div
					variants={{
						dark: {
							translateX: "-50%",
						},
						light: {
							translateX: "50%",
						},
					}}
					animate={theme}
					className="absolute h-full w-full bg-current transition-colors"
				/>
			</div>
		</IconButton>
	);
};

const isSSR = import.meta.env.SSR;

const userPrefersLightTheme = () => {
	if (isSSR) {
		return false;
	}

	return (
		localStorage.theme === "light" ||
		(!("theme" in localStorage) &&
			window.matchMedia("(prefers-color-scheme: light)").matches)
	);
};
