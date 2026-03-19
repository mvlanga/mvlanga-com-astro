import { reactive } from "vue";

export const experienceFilterStore = reactive({
	experienceUnimportantVisible: false,
	toggleVisibility() {
		this.experienceUnimportantVisible = !this.experienceUnimportantVisible;
	},
});
