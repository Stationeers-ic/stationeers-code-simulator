<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useToast } from "primevue/usetoast"
import { saveToBrowser } from "../core/Save.ts"
import clipboard from "web-clipboard"
import { dump } from "../core/Share.ts"

const visible = defineModel<boolean>()
const scripName = ref(localStorage.getItem("currentScriptName") ?? "")
const invalid = ref(false)
const toast = useToast()
onMounted(() => {
	scripName.value = localStorage.getItem("currentScriptName") ?? ""
})

watch(scripName, () => {
	window.localStorage.setItem("currentScriptName", scripName.value)
})

const close = () => {
	visible.value = false
}
const saveAsFile = () => {
	toast.add({ severity: "warn", summary: "Download", detail: "Coming soon" })

	close()
}
const share = () => {
	const url = new URL(document.location.href)
	url.hash = dump()
	clipboard.write(url.toString())
	toast.add({ severity: "success", summary: "Share", detail: "Copied to clipboard" })
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
	toast.add({ severity: "success", summary: "Saved!", detail: "Saved to Browser", life: 3000 })
	close()
}
</script>

<template>
	<Dialog
		v-model:visible="visible"
		header="Save script and environment"
		:style="{ width: '50rem' }"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
	>
		<div class="flex align-items-center gap-3 mb-3">
			<label for="username" class="font-semibold w-6rem">Script Name</label>
			<InputText
				id="username"
				v-model="scripName"
				:invalid="invalid"
				class="flex-auto"
				autocomplete="off"
				required
			/>
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
