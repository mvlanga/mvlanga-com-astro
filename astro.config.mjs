// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    site: "https://mvlanga.com",
    integrations: [
      mdx(),
      react(),
      tailwind({ applyBaseStyles: false }),
    ],
});