import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const PageViews = sqliteTable("PageViews", {
	id: text("id").primaryKey(),
	count: integer("count").notNull().default(1),
});

const globalForDb = globalThis as typeof globalThis & {
	mvlangaDb?: ReturnType<typeof drizzle>;
};

function createDb() {
	const url = import.meta.env.ASTRO_DB_REMOTE_URL;
	const authToken = import.meta.env.ASTRO_DB_APP_TOKEN;

	if (!url) {
		throw new Error(
			"ASTRO_DB_REMOTE_URL is not set. Please configure the environment variable.",
		);
	}

	if (!authToken) {
		throw new Error(
			"ASTRO_DB_APP_TOKEN is not set. Please configure the environment variable.",
		);
	}

	const client = createClient({ url, authToken });
	return drizzle(client);
}

export function getDb() {
	if (!globalForDb.mvlangaDb) {
		globalForDb.mvlangaDb = createDb();
	}

	return globalForDb.mvlangaDb;
}
