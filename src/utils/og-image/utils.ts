import path from "node:path";
import fs from "node:fs/promises";

const backgroundImages = [
	"og-background-01.png",
	"og-background-02.png",
	"og-background-03.png",
];

export const getBackgroundImage = () => {
	return fs.readFile(
		path.resolve(
			`./public/img/${backgroundImages[Math.floor(Math.random() * backgroundImages.length)]}`,
		),
	);
};

export const getFonts = async () => {
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

	return [
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
	];
};
