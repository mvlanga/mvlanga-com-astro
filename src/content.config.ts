import {defineCollection, z} from "astro:content";
import {file} from "astro/loaders";

const skills = defineCollection({
    loader: file("src/content/skills.json", { parser: (content) => JSON.parse(content).skills }),
    schema: z.array(z.string())
})

export const collections = {skills};
