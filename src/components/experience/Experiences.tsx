import { ExperienceFilter } from "@/components/experience/ExperienceFilter.tsx";
import { ExperienceItem } from "@/components/experience/ExperienceItem";
import { UnimportantExperienceItems } from "@/components/experience/UnimportantExperienceItems.tsx";
import type { CollectionEntry } from "astro:content";

export const Experiences = ({
	experienceItems,
}: {
	experienceItems: CollectionEntry<"experience">[];
}) => {
	const importantExperience = experienceItems.filter(
		(item) => item.data.important,
	);
	const unimportantExperience = experienceItems.filter(
		(item) => !item.data.important,
	);

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-4">
				{importantExperience.map((item) => (
					<ExperienceItem {...item} />
				))}

				<div className="flex flex-col gap-4">
					<UnimportantExperienceItems items={unimportantExperience} />
				</div>
			</div>
			<div className="w-full text-end">
				<ExperienceFilter />
			</div>
		</div>
	);
};
