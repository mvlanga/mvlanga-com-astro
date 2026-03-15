<script setup lang="ts">
import { useReducedMotion } from "motion-v";

const shouldReduceMotion = useReducedMotion();

console.log(shouldReduceMotion);
</script>

<template>
	<hr class="border-neutral-300" />
</template>
