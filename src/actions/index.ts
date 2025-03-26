import { ActionError, defineAction } from "astro:actions";
import { PageViews, db, inArray } from "astro:db";
import { z } from "astro:schema";

export const server = {
	getPageViews: defineAction({
		input: z.array(z.string()),
		handler: async (ids) => {
			try {
				return await db
					.select()
					.from(PageViews)
					.where(inArray(PageViews.id, ids));
			} catch (e) {
				console.error(e);

				throw new ActionError({
					code: "BAD_REQUEST",
					message: "Error updating `PageViews`",
				});
			}
		},
	}),
};
