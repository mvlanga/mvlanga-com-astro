import { BackgroundImage, generateOgImage } from "@/utils/og-image/utils.ts";
import { type CollectionEntry, getCollection } from "astro:content";

export const prerender = true;

interface Props {
	params: { id: string };
	props: { legalPage: CollectionEntry<"legalPages"> };
}

export const GET = async ({ props }: Props) => {
	const { legalPage } = props;

	return await generateOgImage({
		type: "container",
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
			BackgroundImage(),
			{
				type: "text",
				style: { position: "relative", zIndex: 1 },
				text: legalPage.data.title,
				tw: "text-9xl leading-snug font-bold mb-8",
			},
			{
				type: "text",
				style: { position: "relative", zIndex: 1 },
				text: "Moriz von Langa | Legal",
				tw: "text-4xl text-neutral-100 font-normal",
			},
		],
	});
};

export async function getStaticPaths() {
	const legalPages = await getCollection("legalPages");

	return legalPages.map((legalPage) => ({
		params: { id: legalPage.id },
		props: { legalPage },
	}));
}
