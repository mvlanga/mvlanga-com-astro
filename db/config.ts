import { NOW, column, defineDb, defineTable } from "astro:db";

const PageViews = defineTable({
	columns: {
		id: column.text({ unique: true, primaryKey: true }),
		count: column.number({
			default: 1,
		}),
	},
});

const BlogComments = defineTable({
	columns: {
		id: column.text({ unique: true, primaryKey: true }),
		blogPostSlug: column.text(),
		name: column.text(),
		content: column.text(),
		createdAt: column.date({
			default: NOW,
		}),
		reviewed: column.boolean({
			default: false,
		}),
	},
});

export default defineDb({
	tables: {
		PageViews,
		BlogComments,
	},
});
