import type { CollectionEntry } from "astro:content";

export const ExperienceItem = ({
	data: { from, to, role, company, tasks, technologies },
}: CollectionEntry<"experience">) => {
	return (
		<div className="grid gap-6 rounded-xl bg-neutral-900 p-6 md:p-10 lg:grid-cols-3 lg:gap-10 light:bg-neutral-100">
			<div className="flex flex-col gap-4 lg:col-span-1">
				<p className="text-neutral-400 light:text-neutral-600">
					{from}
					{" - "}
					{to}
				</p>
				<h3 className="text-3xl">{role}</h3>
				<p className="text-neutral-400 light:text-neutral-700">
					at <span className="font-semibold">{company.title}</span>,{" "}
					{company.description}
				</p>
			</div>

			<hr className="border-neutral-800 lg:hidden" />

			<div className="flex max-w-prose flex-col gap-8 lg:col-span-2">
				<ul className="flex flex-col gap-4 text-neutral-400 light:text-neutral-700">
					{tasks.map((task) => (
						<li>{task}</li>
					))}
				</ul>
				<div className="flex flex-wrap gap-2">
					{technologies.map((tech) => (
						<span className="rounded-full bg-neutral-800 px-5 py-2 text-sm text-neutral-400 light:bg-neutral-200 light:text-neutral-900">
							{tech}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
