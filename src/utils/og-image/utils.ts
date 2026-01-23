import fs from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import satori from "satori";
import sharp from "sharp";

const backgroundImages = [
	"og-background-01.png",
	"og-background-02.png",
	"og-background-03.png",
];

export const BackgroundImage = async (brightness = 0.6) => {
	const backgroundImage = await fs.readFile(
		path.resolve(
			`./public/img/${backgroundImages[Math.floor(Math.random() * backgroundImages.length)]}`,
		),
	);

	return {
		type: "img",
		props: {
			src: backgroundImage.buffer,
			style: {
				position: "absolute",
				width: "1200px",
				height: "630px",
				left: 0,
				top: 0,
				objectFit: "cover",
				filter: `brightness(${brightness})`,
			},
		},
	};
};

export const generateOgImage = async (content: ReactNode) => {
	const avertaRegularData = await fs.readFile(
		path.resolve("./public/fonts/averta-regular.woff"),
	);
	const avertaLightData = await fs.readFile(
		path.resolve("./public/fonts/averta-light.woff"),
	);
	const avertaSemiboldData = await fs.readFile(
		path.resolve("./public/fonts/averta-semibold.woff"),
	);
	const avertaBoldData = await fs.readFile(
		path.resolve("./public/fonts/averta-bold.woff"),
	);

	const svg = await satori(content, {
		width: 1200,
		height: 630,
		debug: false,
		fonts: [
			{
				name: "Averta",
				data: avertaLightData,
				weight: 300,
				style: "normal",
			},
			{
				name: "Averta",
				data: avertaRegularData,
				weight: 400,
				style: "normal",
			},
			{
				name: "Averta",
				data: avertaSemiboldData,
				weight: 600,
				style: "normal",
			},
			{
				name: "Averta",
				data: avertaBoldData,
				weight: 700,
				style: "normal",
			},
		],
	});

	const jpeg = await sharp(Buffer.from(svg))
		.jpeg({
			quality: 60,
		})
		.toBuffer();

	return new Response(new Uint8Array(jpeg), {
		headers: {
			"Content-Type": "image/jpeg",
		},
	});
};
