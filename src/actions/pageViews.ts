import { getDb, PageViews } from "@/db";
import { z } from "astro/zod";
import { ActionError, defineAction } from "astro:actions";
import { inArray, sql } from "drizzle-orm";

export const pageViews = {
	get: defineAction({
		input: z.array(z.string()),
		handler: async (ids) => {
			if (ids.length === 0) {
				throw new ActionError({
					code: "BAD_REQUEST",
					message: "ids cannot be empty"
				});
			}

			try {
				return await getDb()
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
				return await getDb()
					.insert(PageViews)
					.values({
						id,
					})
					.onConflictDoUpdate({
						target: PageViews.id,
						set: { count: sql`${PageViews.count} + 1` },
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
