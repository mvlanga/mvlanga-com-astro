import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const PageViews = sqliteTable("PageViews", {
	id: text("id").primaryKey(),
	count: integer("count").notNull().default(1),
});

const globalForDb = globalThis as typeof globalThis & {
	__mvlangaDb?: ReturnType<typeof drizzle>;
};

function createDb() {
	const client = createClient({
		url: import.meta.env.ASTRO_DB_REMOTE_URL,
		authToken: import.meta.env.ASTRO_DB_APP_TOKEN,
	});
	return drizzle(client);
}

export function getDb() {
	if (!globalForDb.__mvlangaDb) {
		globalForDb.__mvlangaDb = createDb();
	}

	return globalForDb.__mvlangaDb;
}
