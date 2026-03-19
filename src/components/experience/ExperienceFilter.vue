<script setup lang="ts">
import BaseButton from "@/components/common/BaseButton.vue";
import { experienceFilterStore } from "@/components/experience/experienceFilterStore.ts";
</script>

<template>
	<BaseButton
		:text="
			experienceFilterStore.experienceUnimportantVisible
				? 'Less please'
				: 'Early career'
		"
		:is-active="experienceFilterStore.experienceUnimportantVisible"
		@click="() => experienceFilterStore.toggleVisibility()" />
</template>
