import { enrichPageViewIdWithHostnameInfo } from "@/utils/page-views";
import { ActionError, defineAction } from "astro:actions";
import { db, inArray, PageViews, sql } from "astro:db";
import { z } from "astro:schema";

export const pageViews = {
	get: defineAction({
		input: z.array(z.string()),
		handler: async (ids, context) => {
			const idsWithEnvironmentInfo = ids.map((id) =>
				enrichPageViewIdWithHostnameInfo(id, context.url.hostname),
			);

			console.log("GET PAGE VIEWS", idsWithEnvironmentInfo);

			try {
				return await db
					.select()
					.from(PageViews)
					.where(inArray(PageViews.id, idsWithEnvironmentInfo));
			} catch (e) {
				console.error(e);

				throw new ActionError({
					code: "BAD_REQUEST",
					message: `Error getting "PageViews" with ids "${idsWithEnvironmentInfo.join(", ")}"`,
				});
			}
		},
	}),
	increase: defineAction({
		input: z.string(),
		handler: async (id, context) => {
			const idWithEnvironmentInfo = enrichPageViewIdWithHostnameInfo(
				id,
				context.url.hostname,
			);

			console.log("SET PAGE VIEWS", idWithEnvironmentInfo);

			try {
				return await db
					.insert(PageViews)
					.values({
						id: idWithEnvironmentInfo,
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
					message: `Error increasing "PageViews" entry with id "${idWithEnvironmentInfo}"`,
				});
			}
		},
	}),
};
