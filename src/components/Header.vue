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
			<Avatar image="https://avatars.githubusercontent.com/u/134876386?s=400&u=fa5a08bffb00083e047a4576c24baaa4f36bd58f&v=4" />
		</template>
		<template #item="{ item, props }">
			<RouterLink v-ripple v-bind="props.action" :active-class="$style.active" v-if="item.url" :to="item.url">
				<i :class="item.icon" class="mr-1" />
				<span>{{ item.label }}</span>
			</RouterLink>
		</template>
		<template #end></template>
	</Menubar>
</template>

<style module lang="scss">
.active {
	span {
		font-weight: bold;
	}
}
</style>
