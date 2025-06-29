import { IconButton } from "@/components/common/IconButton.tsx";
import { motion } from "motion/react";
import { useState } from "react";

type Theme = "dark" | "light";

export const ThemeToggleButton = () => {
	const [theme, setTheme] = useState<Theme>(
		userPrefersLightTheme() ? "light" : "dark",
	);

	function toggleTheme() {
		const root = document.documentElement;
		const currentTheme = root.getAttribute("data-theme");

		const newTheme: Theme = currentTheme === "light" ? "dark" : "light";

		localStorage.theme = newTheme;

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
							left: "-50%",
						},
						light: {
							left: "50%",
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
