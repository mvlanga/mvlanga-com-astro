import { ActionError, defineAction } from "astro:actions";
import { BlogComments, and, db, eq } from "astro:db";
import { z } from "astro:schema";
import { v4 as uuidv4 } from "uuid";

const isProduction = import.meta.env.PROD;

export const blogComments = {
	get: defineAction({
		input: z.string(),
		handler: async (blogPostSlug) => {
			try {
				return await db
					.select()
					.from(BlogComments)
					.where(
						and(
							eq(BlogComments.reviewed, true),
							eq(BlogComments.blogPostSlug, blogPostSlug),
						),
					);
			} catch (e) {
				console.error(e);

				throw new ActionError({
					code: "BAD_REQUEST",
					message: `Error getting "BlogComments" with blog post slug "${blogPostSlug}"`,
				});
			}
		},
	}),
	add: defineAction({
		input: z.object({
			blogPostSlug: z.string(),
			name: z.string(),
			content: z.string(),
		}),
		handler: async ({ blogPostSlug, name, content }) => {
			try {
				return await db
					.insert(BlogComments)
					.values({
						id: uuidv4(),
						blogPostSlug,
						name,
						content,
						reviewed: !isProduction,
					})
					.returning();
			} catch (e) {
				console.error(e);

				throw new ActionError({
					code: "BAD_REQUEST",
					message: `Error adding "BlogComments" with data "${blogPostSlug} ${name} ${content}"`,
				});
			}
		},
	}),
};
