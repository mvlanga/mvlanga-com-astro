import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const client = createClient({
	url: import.meta.env.PROD
		? import.meta.env.ASTRO_DB_REMOTE_URL
		: "file:./dev.db",
	authToken: import.meta.env.PROD
		? import.meta.env.ASTRO_DB_APP_TOKEN
		: undefined,
});

export const db = drizzle(client);

export const PageViews = sqliteTable("PageViews", {
	id: text("id").primaryKey(),
	count: integer("count").notNull().default(1),
});
