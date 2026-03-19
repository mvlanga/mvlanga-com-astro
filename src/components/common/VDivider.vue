<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { mix, useReducedMotion } from "motion-v";

const containerEl = ref<HTMLDivElement | null>(null);
const pathEl = ref<SVGPathElement | null>(null);

const shouldReduceMotion = useReducedMotion();

let progress = 0;
let x = 0.5;
let time = Math.PI / 2;
let reqId: number | null = null;

const setPath = (p: number) => {
	if (!containerEl.value || !pathEl.value) return;

	const width = containerEl.value.offsetWidth ?? 0;

	pathEl.value.setAttribute(
		"d",
		`M0 250 Q${width * x} ${250 + p}, ${width} 250`,
	);
};

const handleResize = () => setPath(progress);

onMounted(() => {
	setPath(progress);
	window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
	window.removeEventListener("resize", handleResize);
	if (reqId) cancelAnimationFrame(reqId);
});

const manageMouseEnter = () => {
	if (reqId) {
		cancelAnimationFrame(reqId);
		resetAnimation();
	}
};

const manageMouseMove = (e: MouseEvent) => {
	if (!pathEl.value) return;

	const { movementY, clientX } = e;
	const bounds = pathEl.value.getBoundingClientRect();

	x = (clientX - bounds.left) / bounds.width;
	progress += movementY;

	setPath(progress);
};

const manageMouseLeave = () => {
	animateOut();
};

const animateOut = () => {
	const newProgress = progress * Math.sin(time);

	progress = mix(progress, 0, 0.05);
	time += 0.2;

	setPath(newProgress);

	if (Math.abs(progress) > 0.75) {
		reqId = requestAnimationFrame(animateOut);
	} else {
		resetAnimation();
	}
};

const resetAnimation = () => {
	time = Math.PI / 2;
	progress = 0;
};
</script>

<template>
	<hr v-if="shouldReduceMotion" class="border-neutral-300" />

	<div
		v-else
		ref="containerEl"
		class="group relative h-px w-full"
		aria-hidden="true">
		<div
			class="relative -top-5 z-10 h-10 w-full hover:-top-20 hover:h-40"
			@mouseenter="manageMouseEnter"
			@mousemove="manageMouseMove"
			@mouseleave="manageMouseLeave" />

		<svg class="pointer-events-none absolute top-[-250px] h-[500px] w-full">
			<path
				ref="pathEl"
				class="fill-none stroke-neutral-300 stroke-[1px] transition-colors duration-300 group-hover:stroke-neutral-400" />
		</svg>
	</div>
</template>
