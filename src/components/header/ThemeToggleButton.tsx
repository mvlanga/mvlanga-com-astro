import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState} from "react";
import { IconButton } from "@/components/common/IconButton.tsx";

type Theme = "dark" | "light";

export const ThemeToggleButton = () => {
	const shouldReduceMotion = useReducedMotion();

	const [theme, setTheme] = useState<Theme>(
		"dark"
	);

	useEffect(() => {
        setTheme(userPrefersLightTheme() ? "light" : "dark");
    }, []);

	function toggleTheme() {
		const root = document.documentElement;
		const currentTheme = root.getAttribute("data-theme") || "dark";

		const newTheme = currentTheme === "light" ? "dark" : "light";

		try {
			localStorage.setItem("theme", newTheme);
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
		<IconButton
			level="secondary"
			onClick={() => toggleTheme()}
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
		>
			<div className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-current transition-colors">
				<motion.div
					variants={{
						dark: {
							translateX: "-60%",
						},
						light: {
							translateX: "40%",
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

    try {
        const storedTheme = localStorage.getItem("theme");

        return (
            storedTheme === "light" ||
            (storedTheme === null &&
                window.matchMedia("(prefers-color-scheme: light)").matches)
        );
    } catch {
        return window.matchMedia("(prefers-color-scheme: light)").matches;
    }
};
