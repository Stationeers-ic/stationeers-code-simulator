<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch} from "vue"
import {useToast} from "primevue/usetoast"
import {getActiveSaveSlot, getShareLink, saveToBrowser, saveToFile} from "../core/Save.ts"
import clipboard from "web-clipboard"
import {off, on} from "../core/Events.ts"
import {useI18n} from "vue-i18n"

const visible = defineModel<boolean>()
const scripName = ref(localStorage.getItem("currentScriptName") ?? "")
const invalid = ref(false)
const toast = useToast()
const { t } = useI18n()
const update = () => {
	scripName.value = getActiveSaveSlot()
}
onMounted(() => {
	update()
	on("saveUpdate", update)
})
onBeforeUnmount(() => {
	off("saveUpdate", update)
})

const close = () => {
	visible.value = false
}
const saveAsFile = async () => {
	await saveToFile()
	toast.add({ severity: "success", summary: "Download", detail: "File saved", life: 3000 })
	close()
}
const share = () => {
	clipboard.write(getShareLink())
	toast.add({ severity: "success", summary: "Share", detail: "Copied to clipboard", life: 3000 })
	close()
}
watch(scripName, () => {
	invalid.value = false
})

const save = () => {
	if (!scripName.value) {
		invalid.value = true
		return
	}
	saveToBrowser(scripName.value)
	toast.add({ severity: "success", summary: t("toastSave.success.summary"), detail: t("toastSave.success.detail", { store: "browser" }), life: 3000 })
	close()
}
</script>

<template>
	<Dialog v-model:visible="visible" :header="t('modal.saveAs.header')" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
		<div class="flex align-items-center gap-3 mb-3">
			<label for="username" class="font-semibold">
				{{ t("modal.saveAs.label") }}
				<sup style="color: red">*</sup>
			</label>
			<InputText id="username" v-model="scripName" :invalid="invalid" class="flex-auto" autocomplete="off" required />
		</div>
		<div class="flex justify-content-end gap-2">
			<Button type="button" label="Cancel" severity="secondary" @click="close"></Button>
			<Button type="button" icon="pi pi-file-edit" label="Save as file" @click="saveAsFile"></Button>
			<Button type="button" icon="pi pi-share-alt" label="Share" @click="share"></Button>
			<Button type="button" icon="pi pi-file" label="Save" @click="save"></Button>
		</div>
	</Dialog>
</template>

<style scoped lang="scss"></style>
