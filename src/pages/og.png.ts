import { getBackgroundImage, getFonts } from "@/utils/og-image/utils.ts";
import satori from "satori";
import sharp from "sharp";

export const GET = async () => {
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
							children: "Hi, I’m Moriz.",
							tw: "text-9xl leading-snug",
						},
					},
					{
						type: "p",
						props: {
							children: "Frontend Developer based in Leipzig.",
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
