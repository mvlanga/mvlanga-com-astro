<script setup lang="ts">
import type { NavigationItems } from "@/components/header/types.ts";
import { headerStore } from "@/components/header/headerStore.ts";

const socialItems: NavigationItems = [
	{
		label: "LinkedIn",
		url: "https://www.linkedin.com/in/mvlanga",
	},
	{
		label: "GitHub",
		url: "https://github.com/mvlanga",
	},
	{
		label: "Mastodon",
		url: "https://mastodon.social/@mvlanga",
	},
];

function handleNavItemClick() {
	headerStore.isNavigationOpen = false;
}
</script>

<template>
	<p
		class="text-sm opacity-100 transition-opacity delay-200 duration-150 ease-out starting:opacity-0">
		Social
	</p>

	<ul class="flex flex-wrap gap-4">
		<li
			v-for="({ url, label }, index) in socialItems"
			:key="url"
			class="opacity-100 transition-opacity duration-150 ease-out starting:opacity-0"
			:style="{ 'transition-delay': `${50 * index + 1 + 250}ms` }">
			<a
				:href="url"
				referrerpolicy="no-referrer"
				target="_blank"
				rel="noreferrer"
				data-umami-event="link-click"
				:data-umami-event-url="url"
				@click="handleNavItemClick">
				{{ label }}
			</a>
		</li>
	</ul>
</template>
