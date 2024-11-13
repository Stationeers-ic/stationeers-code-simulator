<script setup lang="ts">
import ButtonFrame from "../ui/ButtonFrame.vue"

import {ref} from "vue"
import {MenuItem} from "primevue/menuitem"

const social = ref<MenuItem[]>([
	{
		label: "Github",
		icon: "pi pi-github",
		command() {
			window.open("https://github.com/Stationeers-ic/stationeers-code-simulator", "_blank")
		},
	},
	{
		label: "Plausible",
		icon: "pi pi-plausible",
		command() {
			window.open("https://thor.traineratwot.site/ic10.dev", "_blank")
		},
	},
	{
		label: "Steam",
		icon: "pi pi-steam",
		command() {
			window.open("https://store.steampowered.com/app/544550/Stationeers/", "_blank")
		},
	},
	{
		label: "Vk Donat",
		icon: "pi pi-vk",
		command() {
			window.open("https://vk.com/app6471849_-204595079?ref=snippet_im", "_blank")
		},
	},
	{
		label: "Community translate",
		icon: "pi pi-weblate",
		command() {
			window.open("https://poeditor.com/join/project/5LiiHyJbsH", "_blank")
		},
	},
])
</script>

<template>
	<div :class="$style.rightButtons">
		<template v-for="item in social">
			<ButtonFrame :label="item.label" :icon="item.icon" size="large" :click="item.command" severity="info" />
		</template>

		<ButtonFrame icon="pi pi-kofi" severity="info">
			<iframe
				id="kofiframe"
				src="https://ko-fi.com/aidan647/?hidefeed=true&widget=true&embed=true&preview=true"
				style="border: none; width: 100%; padding: 4px; background: #f9f9f9"
				height="712"
				title="aidan647"
			>
			</iframe>
		</ButtonFrame>
		<ButtonFrame icon="pi pi-discord" severity="info">
			<iframe
				loading="lazy"
				src="https://discord.com/widget?id=848153816263295006&theme=dark"
				width="350"
				height="500"
				allowtransparency="true"
				frameborder="0"
				sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
			></iframe>
		</ButtonFrame>
	</div>
</template>

<style module lang="scss">
.rightButtons {
	position: fixed;
	bottom: 20px;
	right: 20px;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	flex-wrap: nowrap;
	align-items: center;
}

.social {
	position: fixed;
	bottom: 20px;
	left: 20px;

	a {
		text-decoration: none;
	}
}
</style>
