import { column, defineDb, defineTable } from "astro:db";

const PageViews = defineTable({
	columns: {
		id: column.text({ unique: true, primaryKey: true }),
		count: column.number({
			default: 1,
		}),
	},
});

export default defineDb({
	tables: {
		PageViews,
	},
});
