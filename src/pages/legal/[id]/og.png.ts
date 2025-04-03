import { type CollectionEntry, getCollection } from "astro:content";
import { getBackgroundImage, getFonts } from "@/utils/og-image/utils.ts";
import satori from "satori";
import sharp from "sharp";

interface Props {
	params: { id: string };
	props: { legalPage: CollectionEntry<"legalPages"> };
}

export const GET = async ({ props }: Props) => {
	const { legalPage } = props;

	const backgroundImage = await getBackgroundImage();

	const svg = await satori(
		// @ts-expect-error: Astro currently does not support endpoints with tsx file format
		// because of that, we need to use react-elements-like objects
		// satori still expects valid JSX elements, that's why we get typescript errors here
		{
			type: "div",
			props: {
				style: {
					display: "flex",
					flexDirection: "column",
					width: "100%",
					height: "100%",
					color: "white",
					backgroundColor: "black",
					padding: "80px",
					justifyContent: "flex-end",
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
								filter: "brightness(0.6)",
							},
						},
					},
					{
						type: "h1",
						props: {
							children: legalPage.data.title,
							tw: "text-9xl leading-snug",
						},
					},
					{
						type: "p",
						props: {
							children: "Moriz von Langa | Legal",
							tw: "text-4xl text-neutral-100 font-normal",
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
	const legalPages = await getCollection("legalPages");

	return legalPages.map((legalPage) => ({
		params: { id: legalPage.id },
		props: { legalPage },
	}));
}
