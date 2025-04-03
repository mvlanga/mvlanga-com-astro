import { type CollectionEntry, getCollection } from "astro:content";
import { getBackgroundImage, getFonts } from "@/utils/og-image/utils.ts";
import satori from "satori";
import sharp from "sharp";

interface Props {
	params: { id: string };
	props: { post: CollectionEntry<"blogPosts"> };
}

export const GET = async ({ props }: Props) => {
	const { post } = props;

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
							children: post.data.title,
							tw: "text-6xl leading-snug",
						},
					},
					{
						type: "p",
						props: {
							children: "Moriz von Langa | Blog",
							tw: "text-5xl leading-snug text-neutral-100 font-normal",
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

	const jpeg = await sharp(Buffer.from(svg))
		.jpeg({
			quality: 60,
		})
		.toBuffer();

	return new Response(jpeg, {
		headers: {
			"Content-Type": "image/jpeg",
		},
	});
};

export async function getStaticPaths() {
	const blogPosts = await getCollection("blogPosts");

	return blogPosts.map((post) => ({
		params: { id: post.id },
		props: { post },
	}));
}
