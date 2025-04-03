import fs from "node:fs/promises";
import path from "node:path";
import { type CollectionEntry, getCollection } from "astro:content";
import { getBackgroundImage, getFonts } from "@/utils/og-image/utils.ts";
import satori from "satori";
import sharp from "sharp";

interface Props {
	params: { projectSlug: string };
	props: { project: CollectionEntry<"projects"> };
}

export const GET = async ({ props }: Props) => {
	const { project } = props;

	const backgroundImage = await getBackgroundImage();

	const coverImg = await fs.readFile(
		import.meta.env.DEV
			? path.resolve(
					`${process.cwd()}/src/${project.data.cover.src.split("/src")[1]?.replace(/\?.*/, "")}`,
				)
			: path.resolve(project.data.cover.src.replace("/", "dist/")),
	);

	const svg = await satori(
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
					gap: "40px",
				},
				children: [
					{
						type: "img",
						props: {
							src: backgroundImage.buffer,
							style: {
								position: "absolute",
								width: "1200px",
								height: "630px",
								objectFit: "cover",
								filter: "brightness(0.2)",
							},
						},
					},
					{
						type: "img",
						props: {
							src: coverImg.buffer,
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
		{
			width: 1200,
			height: 630,
			debug: false,
			fonts: await getFonts(),
		},
	);

	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
		},
	});
};

export async function getStaticPaths() {
	const projects = await getCollection("projects");

	return projects.map((project) => ({
		params: { projectSlug: project.id },
		props: { project },
	}));
}
