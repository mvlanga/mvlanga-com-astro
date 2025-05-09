import fs from "node:fs/promises";
import path from "node:path";
import { type CollectionEntry, getCollection } from "astro:content";
import { BackgroundImage, generateOgImage } from "@/utils/og-image/utils.ts";

interface Props {
	params: { projectSlug: string };
	props: { project: CollectionEntry<"projects"> };
}

export const GET = async ({ props }: Props) => {
	const { project } = props;

	if (project.filePath === undefined) {
		return;
	}

	const projectCoverImage = await fs.readFile(
		path.resolve(`${process.cwd()}/${project.data.openGraphCover}`),
	);

	return await generateOgImage(
		// @ts-expect-error: Astro currently does not support endpoints with tsx file format
		// because of that, we need to use react-elements-like objects
		// satori still expects valid JSX elements, that's why we get typescript errors here
		{
			type: "div",
			props: {
				style: {
					display: "flex",
					width: "100%",
					height: "100%",
					color: "white",
					backgroundColor: "black",
					padding: "80px",
					gap: "80px",
				},
				children: [
					await BackgroundImage(0.2),
					{
						type: "img",
						props: {
							src: projectCoverImage.buffer,
							style: {
								width: "400px",
								height: "100%",
								objectFit: "cover",
							},
							tw: "rounded-3xl",
						},
					},
					{
						type: "div",
						props: {
							style: {
								width: "600px",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							},
							children: [
								{
									type: "h1",
									props: {
										children: `${project.data.customer} - ${project.data.title}`,
										tw: "text-5xl leading-snug",
									},
								},
								{
									type: "p",
									props: {
										children: "Moriz von Langa | Projects",
										tw: "text-4xl text-neutral-100 font-normal",
									},
								},
							],
						},
					},
				],
			},
		},
	);
};

export async function getStaticPaths() {
	const projects = await getCollection("projects");

	return projects.map((project) => ({
		params: { projectSlug: project.id },
		props: { project },
	}));
}
