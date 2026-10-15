import { generateOgImage } from "@/utils/og-image/utils.ts";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

describe("generateOgImage", () => {
	it("should match previous snapshot", async () => {
		const response = await generateOgImage({
			type: "container",
			style: {
				display: "flex",
				width: "100%",
				height: "100%",
				backgroundColor: "black",
				color: "white",
				alignItems: "center",
				justifyContent: "center",
			},
			children: [{ type: "text", text: "Example title" }],
		});

		expect(response.headers.get("Content-Type")).toBe("image/jpeg");

		const jpegBuffer = Buffer.from(await response.arrayBuffer());

		const digest = createHash("sha256").update(jpegBuffer).digest("hex");
		expect({
			digest,
			size: jpegBuffer.length,
		}).toMatchInlineSnapshot(`
			{
			  "digest": "579e413cf5ec5d753cb006485ec638e815fb6d8624272bf4dfc037e0cf721138",
			  "size": 10020,
			}
		`);
	});
});
