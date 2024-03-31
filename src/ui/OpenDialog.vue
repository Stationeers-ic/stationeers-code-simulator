<script setup lang="ts">
import { ref } from "vue"
import { useToast } from "primevue/usetoast"
import IcUpload from "./IcUpload.vue"
import { load } from "../core/Share.ts"

const visible = defineModel<boolean>()
const scripName = ref(localStorage.getItem("currentScriptName") ?? "")
const invalid = ref(false)
const fileContent = ref("")
const dumpContent = ref("")
const toast = useToast()
const close = () => {
	visible.value = false
}

const loadHandle = async () => {
	try {
		const m = {
			file: fileContent.value,
			string: dumpContent.value,
		}
		const find = Object.entries(m).find(([_name, value]) => value)
		if (find) {
			const [name, value] = find
			switch (name) {
				case "string":
					await load(value)
			}
			toast.add({ severity: "success", summary: "Loaded", detail: `loaded from ${name}`, life: 3000 })
		} else {
			throw new Error("Empty content")
		}
		close()
	} catch (e: any) {
		toast.add({ severity: "error", summary: "Load", detail: e.message, life: 3000 })
	}
}
</script>

<template>
	<Dialog v-model:visible="visible" header="Open script and environment" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
		<div class="flex align-items-center gap-3 mb-3">
			<label for="ScriptName" class="font-semibold w-6rem">Script Name</label>
			<InputText id="ScriptName" v-model="scripName" :invalid="invalid" class="flex-auto" autocomplete="off" />
		</div>
		<div class="flex align-items-center gap-3 mt-5 mb-3">
			<InputGroup>
				<InputGroupAddon>#</InputGroupAddon>
				<FloatLabel>
					<label for="DataString" class="font-semibold w-6rem">Data string</label>
					<InputText id="DataString" v-model="dumpContent" :invalid="invalid" class="flex-auto" autocomplete="off" />
				</FloatLabel>
			</InputGroup>
		</div>
		<Divider>Or</Divider>
		<div class="flex align-items-center gap-3 mb-3">
			<IcUpload v-model="fileContent" />
		</div>
		<div class="flex justify-content-end gap-2">
			<Button type="button" label="Cancel" severity="secondary" @click="close" />
			<Button type="button" label="Load" severity="primary" @click="loadHandle" />
		</div>
	</Dialog>
</template>

<style scoped lang="scss"></style>
