import { BackgroundImage, generateOgImage } from "@/utils/og-image/utils.ts";

export const prerender = true;

export const GET = async () => {
	return await generateOgImage({
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
						children: "Hi, I’m Moriz.",
						tw: "text-9xl leading-snug",
					},
				},
				{
					type: "p",
					props: {
						children:
							"Full Stack Developer with frontend focus based in Leipzig.",
						tw: "text-5xl leading-snug text-neutral-100 font-normal",
					},
				},
			],
		},
	});
};
