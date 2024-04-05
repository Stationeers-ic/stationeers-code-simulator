<script setup lang="ts">
import { MenuItem } from "primevue/menuitem"
import { routes } from "../router.ts"
import { onMounted } from "vue"
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const confirm = useConfirm()
const toast = useToast()

const items: MenuItem[] = []
routes.forEach((item) => {
	items.push({
		label: item.name?.toString() ?? item.path ?? "",
		icon: item.icon,
		url: item.path,
	})
})

const is1April = () => {
	// if (import.meta.env.DEV) {
	// 	return true
	// }
	return window.dayjs().date() === 1 && window.dayjs().month() === 3
}
const toggle1April = () => {
	const a = window.document.querySelectorAll(".joker")
	a.forEach((a) => a.classList.remove("joker"))
	const b = window.document.querySelectorAll(".pulse")
	b.forEach((a) => a.classList.remove("pulse"))
}
onMounted(() => {
	if (is1April()) {
		setTimeout(() => {
			const a = window.document.querySelectorAll<HTMLDivElement>(".code-mirror")
			a.forEach((a) => a.classList.add("joker"))
		}, 300)
	}
})

const confirmReset = (event: any) => {
	confirm.require({
		target: event.currentTarget,
		message: t("control.confirmAllDelete"),
		icon: "pi pi-exclamation-triangle",
		rejectClass: "p-button-secondary p-button-outlined p-button-sm",
		acceptClass: "p-button-danger p-button-sm",
		rejectLabel: t("cancel"),
		acceptLabel: t("delete"),
		accept: () => {
			window.localStorage.clear()
			toast.add({ severity: "info", summary: "Confirmed", detail: "You have accepted", life: 3000 })
			window.location.reload()
		},
		reject: () => {
			toast.add({ severity: "error", summary: "Rejected", detail: "You have rejected", life: 3000 })
		},
	})
}
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
		<template #end>
			<Button v-if="is1April()" severity="secondary" class="pulse" label="🤡" @click="toggle1April" />
			<Button id="ResetAll" severity="danger" icon="pi pi-trash" v-tooltip.down="'Reset all data'" @click="confirmReset" />
		</template>
	</Menubar>
</template>

<style module lang="scss">
.active {
	span {
		font-weight: bold;
	}
}
</style>
