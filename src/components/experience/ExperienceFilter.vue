<script setup lang="ts">
import Button from "@/components/common/Button.vue";
import { experienceFilterStore } from "@/components/experience/experienceFilterStore.ts";
</script>

<template>
	<Button
		:text="
			experienceFilterStore.experienceUnimportantVisible
				? 'Less please'
				: 'Early career'
		"
		:is-active="experienceFilterStore.experienceUnimportantVisible"
		@click="() => experienceFilterStore.toggleVisibility()" />
</template>
