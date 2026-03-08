import type { Variants } from "motion-v";

export const headerButtonsVariants = {
	hidden: {
		opacity: 0,
		pointerEvents: "none",
		scale: 0.8,
		translateY: "-100%",
	},
	visible: {
		opacity: 1,
		pointerEvents: "all",
		scale: 1,
		translateY: "0",
	},
} satisfies Variants;
