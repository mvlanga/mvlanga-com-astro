import { reactive } from "vue";

export const BLOG_FILTER_TAG_ALL_VALUE = "All";

export const blogFilterStore = reactive({
	value: BLOG_FILTER_TAG_ALL_VALUE,
});
