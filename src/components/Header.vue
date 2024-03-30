<script setup lang="ts">
import { MenuItem } from "primevue/menuitem"
import { routes } from "../router.ts"

const items: MenuItem[] = []
routes.forEach((item) => {
	items.push({
		label: item.name?.toString() ?? item.path ?? "",
		icon: item.icon,
		url: item.path,
	})
})
</script>

<template>
	<Menubar :model="items">
		<template #start>
			<Image />
		</template>
		<template #item="{ item, props }">
			<RouterLink v-ripple v-bind="props.action" :to="item.url">
				<i :class="item.icon" />
				<span>{{ item.label }}</span>
			</RouterLink>
		</template>
		<template #end></template>
	</Menubar>
</template>

<style scoped lang="scss"></style>
