import { type ImageNode, type Node, Renderer } from "@takumi-rs/core";
import { readFileSync } from "node:fs";
import path from "node:path";

const backgroundImages = [
	"og-background-01.png",
	"og-background-02.png",
	"og-background-03.png",
];

export const BackgroundImage = (brightness = 0.6): ImageNode => {
	const backgroundImage = readFileSync(
		path.resolve(
			`./public/img/${backgroundImages[Math.floor(Math.random() * backgroundImages.length)]}`,
		),
	);

	return {
		type: "image",
		src: backgroundImage,
		style: {
			position: "absolute",
			width: "1200px",
			height: "630px",
			left: 0,
			top: 0,
			objectFit: "cover",
			filter: `brightness(${brightness})`,
		},
	};
};

const renderer = new Renderer();
const fontsReady = Promise.all(
	[
		{ file: "light", weight: 300 },
		{ file: "regular", weight: 400 },
		{ file: "semibold", weight: 600 },
		{ file: "bold", weight: 700 },
	].map(({ file, weight }) =>
		renderer.registerFont({
			name: "Averta",
			data: readFileSync(
				path.resolve(`./public/fonts/averta-${file}.woff`),
			),
			weight,
			style: "normal",
		}),
	),
);

export const generateOgImage = async (content: Node) => {
	await fontsReady;

	const jpeg = await renderer.render(content, {
		width: 1200,
		height: 630,
		format: "jpeg",
		quality: 60,
		fontFamilies: ["Averta"],
	});

	return new Response(new Uint8Array(jpeg), {
		headers: {
			"Content-Type": "image/jpeg",
		},
	});
};
