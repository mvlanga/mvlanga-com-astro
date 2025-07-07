import { type CollectionEntry, getCollection } from "astro:content";
import fs from "node:fs/promises";
import path from "node:path";
import { BackgroundImage, generateOgImage } from "@/utils/og-image/utils.ts";

interface Props {
	params: { id: string };
	props: { post: CollectionEntry<"blogPosts"> };
}

export const GET = async ({ props }: Props) => {
	const { post } = props;

	if (post.data.openGraphCover) {
		const postCoverImage = await fs.readFile(
			path.resolve(`${process.cwd()}/${post.data.openGraphCover}`),
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
								src: postCoverImage.buffer,
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
					],
				},
			},
		);
	}

	return await generateOgImage(
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
					await BackgroundImage(),
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
	);
};

export async function getStaticPaths() {
	const blogPosts = await getCollection("blogPosts");

	return blogPosts.map((post) => ({
		params: { id: post.id },
		props: { post },
	}));
}
