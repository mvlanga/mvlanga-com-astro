<script setup lang="ts">
import VButton from "@/components/common/VButton.vue";
import { experienceFilterStore } from "@/components/experience/experienceFilterStore.ts";
</script>

<template>
	<VButton
		:text="
			experienceFilterStore.experienceUnimportantVisible
				? 'Less please'
				: 'Early career'
		"
		:is-active="experienceFilterStore.experienceUnimportantVisible"
		@click="() => experienceFilterStore.toggleVisibility()" />
</template>
