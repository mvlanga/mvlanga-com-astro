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
		// @ts-expect-error
		{
			type: "div",
			props: {
				children: [
					{
						type: "img",
						props: {
							src: backgroundImage.buffer,
							tw: "absolute -z-10",
							style: {
								width: "1200px",
								height: "630px",
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
							tw: "text-5xl text-neutral-100 font-normal",
						},
					},
				],
				tw: "relative flex flex-col h-full w-full p-24 justify-end text-white bg-black",
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
	const blogPosts = await getCollection("blogPosts");

	return blogPosts.map((post) => ({
		params: { id: post.id },
		props: { post },
	}));
}
