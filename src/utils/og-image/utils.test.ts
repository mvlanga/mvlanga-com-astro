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
			  "digest": "994d0ea8fed88a352ca462f8c2cbd74ca7fc69a5dd6a1e240e9c29264acbaa60",
			  "size": 5589,
			}
		`);
	});
});
