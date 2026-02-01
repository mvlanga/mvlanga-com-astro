import { ActionError, defineAction } from "astro:actions";
import { db, inArray, PageViews, sql } from "astro:db";
import { z } from "astro:schema";

const enrichIdWithEnvironemtInfo = (id: string, hostname: string) => {
	if (hostname.includes("deploy-preview")) {
		return `${hostname}/${id}`;
	}

	return id;
};

export const pageViews = {
	get: defineAction({
		input: z.array(z.string()),
		handler: async (ids, context) => {
			const idsWithEnvironmentInfo = ids.map((id) =>
				enrichIdWithEnvironemtInfo(id, context.url.hostname),
			);

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
			const idWithEnvironmentInfo = enrichIdWithEnvironemtInfo(
				id,
				context.url.hostname,
			);

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
