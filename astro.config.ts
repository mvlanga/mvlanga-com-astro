import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import astroExpressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import { visualizer } from "rollup-plugin-visualizer";
import { EnumChangefreq } from "sitemap";

export default defineConfig({
	outDir: "static",
	prefetch: {
		prefetchAll: true,
	},
	markdown: {
		shikiConfig: {
			theme: "github-dark-default",
		},
	},
	site: "https://mvlanga.com",
	integrations: [
		sitemap({
			serialize(item) {
				if (item.url === "https://mvlanga.com/") {
					item.changefreq = EnumChangefreq.MONTHLY;
					item.lastmod = new Date().toDateString();
					item.priority = 1;
				}

				if (/legal/.test(item.url)) {
					item.changefreq = EnumChangefreq.YEARLY;
					item.lastmod = new Date().toDateString();
					item.priority = 0.2;
				}

				if (/cariad|skoda|fujitsu/.test(item.url)) {
					item.changefreq = EnumChangefreq.MONTHLY;
					item.lastmod = new Date().toDateString();
					item.priority = 0.9;
				}

				if (/blog/.test(item.url)) {
					item.changefreq = EnumChangefreq.MONTHLY;
					item.lastmod = new Date().toDateString();
					item.priority = 0.8;
				}

				return item;
			},
		}),
		astroExpressiveCode({
			shiki: {
				bundledLangs: [
					"typescript",
					"jsx",
					"markdown",
					"bash",
					"astro",
					"shell",
				],
			},
			themes: ["github-dark-default"],
			styleOverrides: {
				codeBackground: "var(--color-neutral-900)",
				borderColor: "transparent",
				borderRadius: "var(--radius-xl)",
				frames: {
					terminalBackground: "var(--color-neutral-900)",
				},
			},
		}),
		mdx(),
		react(),
		db(),
	],
	vite: {
		plugins: [
			tailwindcss(),
			visualizer({
				emitFile: true,
				filename: "stats.html",
			}),
		],
	},
	adapter: netlify(),
	redirects: {
		"/:lang/personal-projects": "/",
		"/:lang/about-me": "/#about",
		"/assets/resume/*": "/moriz-von-langa_resume.pdf",

		"/:lang/skoda-enyaq-coupe": "/skoda-enyaq-coupe",
		"/:lang/fujitsu-cx-lab": "/fujitsu-cx-lab",
		"/:lang/cariad-iaa": "/cariad-iaa",
		"/:lang/skoda-fabia": "/skoda-fabia",
		"/:lang/fujitsu-smart-city": "/fujitsu-smart-city",

		"/:lang/legal/:slug": "/legal/:slug",

		"/en": "/",
		"/de": "/",

		"/blog/how-to-build-a-page-view-counter-with-astro-db-and-server-side-islands":
			"/blog/how-to-build-a-page-view-counter-with-astro-db-actions-and-server-side-islands",
	},
});
