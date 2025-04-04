import { ActionError, defineAction } from "astro:actions";
import { PageViews, db, inArray, sql } from "astro:db";
import { z } from "astro:schema";

export const pageViews = {
	get: defineAction({
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
					message: `Error getting "PageViews" with ids "${ids.join(", ")}"`,
				});
			}
		},
	}),
	increase: defineAction({
		input: z.string(),
		handler: async (id) => {
			try {
				return await db
					.insert(PageViews)
					.values({
						id,
					})
					.onConflictDoUpdate({
						target: PageViews.id,
						set: { count: sql`count + 1` },
					})
					.returning();
			} catch (e) {
				console.error(e);

				throw new ActionError({
					code: "BAD_REQUEST",
					message: `Error increasing "PageViews" entry with id "${id}"`,
				});
			}
		},
	}),
};
