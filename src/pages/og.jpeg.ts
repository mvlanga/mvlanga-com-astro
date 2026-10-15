import { BackgroundImage, generateOgImage } from "@/utils/og-image/utils.ts";

export const prerender = true;

export const GET = async () => {
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
				text: "Hi, I’m Moriz.",
				tw: "text-9xl leading-snug font-bold mb-8",
			},
			{
				type: "text",
				style: { position: "relative", zIndex: 1 },
				text: "Full Stack Developer with frontend focus based in Leipzig.",
				tw: "text-5xl leading-snug text-neutral-100 font-normal",
			},
		],
	});
};
