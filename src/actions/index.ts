import { ActionError, defineAction } from "astro:actions";
import { PageViews, db, eq, sql } from "astro:db";
import { z } from "astro:schema";

export const server = {
	updatePageView: defineAction({
		input: z.object({
			id: z.string(),
			shouldIncrease: z.boolean(),
		}),
		handler: async ({ id, shouldIncrease }) => {
			try {
				if (shouldIncrease === false) {
					return await db.select().from(PageViews).where(eq(PageViews.id, id));
				}

				return await db
					.insert(PageViews)
					.values({
						id,
					})
					.onConflictDoUpdate({
						target: PageViews.id,
						set: { count: sql`count + 1` },
					})
					.returning({ count: PageViews.count });
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
