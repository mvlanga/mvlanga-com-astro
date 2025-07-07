import type { CollectionEntry } from "astro:content";

type ExperienceItemProps = {
	experienceItem: CollectionEntry<"experience">;
};

export const ExperienceItem = ({ experienceItem }: ExperienceItemProps) => {
	return experienceItem.data.reduced ? (
		<ExperienceItemReduced {...experienceItem.data} />
	) : (
		<ExperienceItemFull {...experienceItem.data} />
	);
};

const ExperienceItemReduced = ({
	from,
	to,
	role,
	company,
}: CollectionEntry<"experience">["data"]) => {
	return (
		<div className="grid gap-8 rounded-xl bg-neutral-900 light:bg-neutral-100 px-8 py-4 md:px-16 md:py-8 lg:grid-cols-3 lg:gap-16">
			<div className="flex flex-col gap-4 lg:col-span-full">
				<p className="light:text-neutral-600 text-neutral-400">
					{from}
					{" - "}
					{to}
				</p>
				<h3 className="text-2xl">{role}</h3>
				<p className="light:text-neutral-700 text-neutral-400">
					at <span className="font-semibold">{company.title}</span>,{" "}
					{company.description}
				</p>
			</div>
		</div>
	);
};

const ExperienceItemFull = ({
	from,
	to,
	role,
	company,
	tasks,
	technologies,
}: CollectionEntry<"experience">["data"]) => {
	return (
		<div className="grid gap-8 rounded-xl bg-neutral-900 light:bg-neutral-100 p-8 md:p-16 lg:grid-cols-3 lg:gap-16">
			<div className="flex flex-col gap-4 lg:col-span-1">
				<p className="light:text-neutral-600 text-neutral-400">
					{from}
					{" - "}
					{to}
				</p>
				<h3 className="text-3xl">{role}</h3>
				<p className="light:text-neutral-700 text-neutral-400">
					at <span className="font-semibold">{company.title}</span>,{" "}
					{company.description}
				</p>
			</div>

			<hr className="border-neutral-800 lg:hidden" />

			<div className="flex max-w-prose flex-col gap-8 lg:col-span-2">
				<ul className="flex flex-col gap-4 light:text-neutral-700 text-neutral-400">
					{tasks.map((task) => (
						<li key={task}>{task}</li>
					))}
				</ul>
				{technologies && (
					<div className="flex flex-wrap gap-2">
						{technologies.map((tech) => (
							<span
								key={tech}
								className="rounded-full bg-neutral-800 light:bg-neutral-200 px-5 py-2 light:text-neutral-800 text-neutral-400 text-sm"
							>
								{tech}
							</span>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
