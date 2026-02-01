import { BackgroundImage, generateOgImage } from "@/utils/og-image/utils.ts";
import { type CollectionEntry, getCollection } from "astro:content";
import fs from "node:fs/promises";
import path from "node:path";

interface Props {
	params: { highlightSlug: string };
	props: { highlight: CollectionEntry<"highlights"> };
}

export const GET = async ({ props }: Props) => {
	const { highlight } = props;

	if (highlight.filePath === undefined) {
		return;
	}

	const highlightCoverImage = await fs.readFile(
		path.resolve(`${process.cwd()}/${highlight.data.openGraphCover}`),
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
							src: highlightCoverImage.buffer,
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
										children: `${highlight.data.customer} - ${highlight.data.title}`,
										tw: "text-5xl leading-snug",
									},
								},
								{
									type: "p",
									props: {
										children:
											"Moriz von Langa | Highlights",
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
	const highlights = await getCollection("highlights");

	return highlights.map((highlight) => ({
		params: { highlightSlug: highlight.id },
		props: { highlight },
	}));
}
