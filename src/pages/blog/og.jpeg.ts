import { getBackgroundImage, getFonts } from "@/utils/og-image/utils.ts";
import satori from "satori";
import sharp from "sharp";

export const GET = async () => {
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
							children: "Blog",
							tw: "text-9xl leading-snug",
						},
					},
					{
						type: "p",
						props: {
							children:
								"A few notes and reminders, it's just great to have a place to go back to",
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
