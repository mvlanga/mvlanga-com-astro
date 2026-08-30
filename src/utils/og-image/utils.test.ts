import { generateOgImage } from "@/utils/og-image/utils.ts";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

describe("generateOgImage", () => {
	it("should match previous snapshot", async () => {
		const response = await generateOgImage({
			type: "div",
			props: {
				style: {
					display: "flex",
					width: "100%",
					height: "100%",
					backgroundColor: "black",
					color: "white",
					alignItems: "center",
					justifyContent: "center",
				},
				children: "Example title",
			},
		});

		expect(response.headers.get("Content-Type")).toBe("image/jpeg");

		const jpegBuffer = Buffer.from(await response.arrayBuffer());

		const digest = createHash("sha256").update(jpegBuffer).digest("hex");
		expect({
			digest,
			size: jpegBuffer.length,
		}).toMatchInlineSnapshot(`
			{
			  "digest": "bd37c23185da224514046ead2d5f71e57bd1c9b6012b89cd015ce6a3398e1ed5",
			  "size": 5591,
			}
		`);
	});
});
