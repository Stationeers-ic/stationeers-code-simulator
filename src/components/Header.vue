<script setup lang="ts">
import {MenuItem} from "primevue/menuitem"
import {routes} from "../router.ts"
import {onMounted} from "vue"
import {useConfirm} from "primevue/useconfirm"
import {useToast} from "primevue/usetoast"
import {useI18n} from "vue-i18n"
import LangSwitcher from "../ui/LangSwitcher.vue"

const {t} = useI18n()
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
	if (import.meta.env.DEV) {
		// return true
	}
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
	// confirm.require({
	// 	target: event.currentTarget,
	// 	message: t("headers.confirmAllDelete"),
	// 	icon: "pi pi-exclamation-triangle",
	// 	rejectClass: "p-button-secondary p-button-outlined p-button-sm",
	// 	acceptClass: "p-button-danger p-button-sm",
	// 	rejectLabel: t("cancel"),
	// 	acceptLabel: t("delete"),
	// 	accept: () => {
	//		window.localStorage.clear()
	// toast.add({ severity: "info", summary: t("confirmReset.info.summary"), detail: t("confirmReset.info.detail"), life: 3000 })
	// window.location.reload()
	// 	},
	// 	reject: () => {
	// 		toast.add({ severity: "error", summary: t("confirmReset.error.summary"), detail: t("confirmReset.error.detail"), life: 3000 })
	// 	},
	// })
	if (window.confirm(t("headers.confirmAllDelete"))) {
		window.localStorage.clear()
		toast.add({severity: "info", summary: t("confirmReset.info.summary"), detail: t("confirmReset.info.detail"), life: 3000})
		window.location.reload()
	}
}

const issues = () => {
	window.open(__bugs__.url, "_blank")
}
</script>

<template>
	<Menubar :model="items">
		<template #start>
			<Avatar image="https://avatars.githubusercontent.com/u/134876386?s=400&u=fa5a08bffb00083e047a4576c24baaa4f36bd58f&v=4"/>
		</template>
		<template #item="{ item, props }">
			<RouterLink v-ripple v-bind="props.action" :active-class="$style.active" v-if="item.url" :to="item.url">
				<i :class="item.icon" class="mr-1"/>
				<span>{{ item.label }}</span>
			</RouterLink>
		</template>
		<template #end>
			<div :class="$style.end">
				<Button id="BagReport" severity="secondary" icon="pi pi-github" @click="issues" :label="t('headers.issues')"/>

				<Button v-if="is1April()" severity="secondary" class="pulse" label="🤡" @click="toggle1April"/>
				<LangSwitcher :short="true"/>
				<Button id="ResetAll" severity="danger" icon="pi pi-trash" v-tooltip.down="t('headers.ResetAllData')" @click="confirmReset"/>
			</div>
		</template>
	</Menubar>
</template>

<style module lang="scss">
.end {
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: flex-end;
	flex-wrap: nowrap;
	flex-direction: row;
	gap: 5px;
}

.active {
	span {
		font-weight: bold;
	}
}
</style>
