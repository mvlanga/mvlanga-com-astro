import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const client = createClient({
	url: import.meta.env.ASTRO_DB_REMOTE_URL,
	authToken: import.meta.env.ASTRO_DB_APP_TOKEN,
});

export const db = drizzle(client);

export const PageViews = sqliteTable("PageViews", {
	id: text("id").primaryKey(),
	count: integer("count").notNull().default(1),
});
