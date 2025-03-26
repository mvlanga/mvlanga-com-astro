import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, inArray, PageViews } from "astro:db";

export const pageViews = {
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
