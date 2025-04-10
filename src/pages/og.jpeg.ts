import { BackgroundImage, generateOgImage } from "@/utils/og-image/utils.ts";

export const GET = async () => {
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
							children: "Hi, I’m Moriz.",
							tw: "text-9xl leading-snug",
						},
					},
					{
						type: "p",
						props: {
							children: "Frontend Developer based in Leipzig.",
							tw: "text-5xl leading-snug text-neutral-100 font-normal",
						},
					},
				],
			},
		},
	);
};
