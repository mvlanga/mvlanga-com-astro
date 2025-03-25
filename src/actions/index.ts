import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { BlogPostViews, db, sql } from "astro:db";

export const server = {
	blogPostViews: defineAction({
		input: z.object({
			id: z.string(),
		}),
		handler: async ({ id }) => {
			try {
				return await db
					.insert(BlogPostViews)
					.values({
						id,
					})
					.onConflictDoUpdate({
						target: BlogPostViews.id,
						set: { count: sql`count + 1` },
					})
					.returning({ count: BlogPostViews.count });
			} catch (e) {
				console.error(e);

				throw new ActionError({
					code: "BAD_REQUEST",
					message: "Error updating views",
				});
			}
		},
	}),
};
