import { Button } from "@/components/common/Button.tsx";
import { experienceUnimportantVisible } from "@/components/experience/experienceFilterStore.ts";
import { useStore } from "@nanostores/react";

export const ExperienceFilter = () => {
	const $unimportantItemsVisible = useStore(experienceUnimportantVisible);

	return (
		<Button
			text={{
				default: "Early career",
				activeText: "Less please",
			}}
			isActive={$unimportantItemsVisible}
			onClick={() =>
				experienceUnimportantVisible.set(!$unimportantItemsVisible)
			}
		/>
	);
};
