import { BackgroundImage, generateOgImage } from "@/utils/og-image/utils.ts";
import type { APIRoute } from "astro";
import { type CollectionEntry, getCollection } from "astro:content";
import { readFileSync } from "node:fs";
import path from "node:path";

export const prerender = true;

export const GET: APIRoute<{ post: CollectionEntry<"blogPosts"> }> = async ({
	props,
}) => {
	const { post } = props;

	if (post.data.openGraphCover) {
		const postCoverImage = readFileSync(
			path.resolve(`${process.cwd()}/${post.data.openGraphCover}`),
		);

		return await generateOgImage({
			type: "container",
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
				BackgroundImage(0.2),
				{
					type: "image",
					src: postCoverImage,
					style: {
						position: "relative",
						zIndex: 1,
						width: "400px",
						height: "100%",
						objectFit: "cover",
						flexShrink: 0,
					},
					tw: "rounded-3xl",
				},
				{
					type: "container",
					style: {
						position: "relative",
						zIndex: 1,
						flex: 1,
						minWidth: 0,
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					},
					children: [
						{
							type: "text",
							text: post.data.title,
							tw: "text-6xl leading-snug font-bold mb-8",
						},
						{
							type: "text",
							text: "Moriz von Langa | Blog",
							tw: "text-5xl leading-snug text-neutral-100 font-normal",
						},
					],
				},
			],
		});
	}

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
				text: post.data.title,
				tw: "text-6xl leading-snug font-bold mb-8",
			},
			{
				type: "text",
				style: { position: "relative", zIndex: 1 },
				text: "Moriz von Langa | Blog",
				tw: "text-5xl leading-snug text-neutral-100 font-normal",
			},
		],
	});
};

export async function getStaticPaths() {
	const blogPosts = await getCollection("blogPosts");

	return blogPosts.map((post) => ({
		params: { id: post.id },
		props: { post },
	}));
}
