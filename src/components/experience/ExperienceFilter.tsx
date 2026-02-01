import { Button } from "@/components/common/Button.tsx";
import { experienceUnimportantVisible } from "@/components/experience/experienceFilterStore.ts";
import { useStore } from "@nanostores/react";

export const ExperienceFilter = () => {
	const $unimportantItemsVisible = useStore(experienceUnimportantVisible);

	return (
		<Button
			text={$unimportantItemsVisible ? "Less please" : "Early career"}
			isActive={$unimportantItemsVisible}
			onClick={() =>
				experienceUnimportantVisible.set(!$unimportantItemsVisible)
			}
		/>
	);
};
