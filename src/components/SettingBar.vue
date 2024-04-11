<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch} from "vue"
import {getActiveSaveSlot, getScriptNames, removeFromBrowser, setActiveSaveSlot} from "../core/Save.ts"
import {off, on} from "../core/Events.ts"
import {useConfirm} from "primevue/useconfirm"
import {useI18n} from "vue-i18n"
import {setLocale} from "../i18n"

const { t } = useI18n()
const i18n = useI18n()
const confirm = useConfirm()
const visible = defineModel<boolean>()
const saves = ref<Array<{ name: string }>>([])
const active = ref<string | null>(null)
const lang = ref<languages | undefined>()
const languages = ref(__LanguageSelector__)

const update = () => {
	saves.value = Array.from(getScriptNames()).map((name) => {
		return { name: name }
	})
	active.value = getActiveSaveSlot()
}
const open = () => (visible.value = true)
onMounted(() => {
	lang.value = languages.value.find((i) => {
		return i.code === i18n.locale.value
	})
	update()
	on("saveUpdate", update)
	on("openSetting", open)
})
onBeforeUnmount(() => {
	off("saveUpdate", update)
	off("openSetting", open)
})
watch(lang, (newVal) => {
	if (newVal) {
		setLocale(window.i18n, newVal.code)
		// i18n.locale.value = newVal.code
		window.localStorage.setItem("language", newVal.code)
	}
})
const setActive = async () => {
	if (active.value) {
		await setActiveSaveSlot(active.value)
	}
}

const remove = (event: any, name: string) => {
	event.preventDefault()
	confirm.require({
		target: event.currentTarget,
		message: t("settings.confirmDelete"),
		icon: "pi pi-exclamation-triangle",
		rejectClass: "p-button-secondary p-button-outlined p-button-sm",
		acceptClass: "p-button-danger p-button-sm",
		rejectLabel: t("cancel"),
		acceptLabel: t("delete"),
		accept: () => {
			removeFromBrowser(name)
		},
	})
}
</script>

<template>
	<div class="settingButton" @click="visible = true" />
	<div class="card flex justify-content-center">
		<Sidebar v-model:visible="visible" header=" ">
			<div>
				<Divider>{{ $t("settings.languages") }}</Divider>
				<Dropdown style="width: 100% !important" v-model="lang" :options="languages" optionLabel="code" placeholder="Select a language" class="w-full md:w-14rem">
					<template #value="slotProps">
						<div v-if="slotProps.value" class="flex align-items-center">
							<img
								:alt="slotProps.value.label"
								src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
								:class="`mr-2 ${slotProps.value.flag}`"
								style="width: 18px"
							/>
							<div>{{ slotProps.value.name }}</div>
						</div>
						<span v-else>{{ slotProps.placeholder }}</span>
					</template>
					<template #option="slotProps">
						<div class="flex align-items-center">
							<img
								:alt="slotProps.option.label"
								src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
								:class="`mr-2 ${slotProps.option.flag}`"
								style="width: 18px"
							/>
							<div>{{ slotProps.option.name }}</div>
							<span class="lang" v-if=" slotProps.option.translated_percent < 95">{{ slotProps.option.translated_percent }}%</span>
						</div>
					</template>
				</Dropdown>
			</div>
			<div>
				<Divider>{{ $t("settings.saves") }}</Divider>
				<Listbox
					v-model="active"
					:options="saves"
					@change="setActive"
					filter
					optionLabel="name"
					optionValue="name"
					:empty-message="$t('settings.noSaves')"
					:empty-filter-message="$t('settings.savesNotFound')"
					:filter-placeholder="$t('settings.searchSave')"
				>
					<template #option="slotProps">
						<div class="saveItem">
							<div>{{ slotProps.option.name }}</div>
							<Button icon="pi pi-minus-circle" severity="danger" @click="remove($event, slotProps.option.name)" />
						</div>
					</template>
				</Listbox>
			</div>
		</Sidebar>
	</div>
</template>

<style scoped lang="scss">
.lang{
	right: 0;
	position: absolute;
	color: var(--text-color-secondary) !important;
}
.settingButton {
	position: fixed;
	width: 10px;
	height: 200px;
	color: #020617;
	background: #34d399;
	border: 1px solid #34d399;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
	border-radius: 0 20px 20px 0;

	&:before {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		content: ">";
	}

	&:hover {
		background: #6ee7b7;
		color: #020617;
		border-color: #6ee7b7;
	}
}

.saveItem {
	display: flex;
	justify-content: space-between;

	.pi-minus-circle {
		color: #f87171;
	}
}
</style>
