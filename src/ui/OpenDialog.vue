<script setup lang="ts">
import { ref } from "vue"
import { useToast } from "primevue/usetoast"
import IcUpload from "./IcUpload.vue"

const visible = defineModel<boolean>()
const scripName = ref(localStorage.getItem("currentScriptName") ?? "")
const invalid = ref(false)
const toast = useToast()
const close = () => {
	visible.value = false
}
</script>

<template>
	<Dialog v-model:visible="visible" header="Open script and environment" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
		<div class="flex align-items-center gap-3 mb-3">
			<label for="username" class="font-semibold w-6rem">Script Name</label>
			<InputText id="username" v-model="scripName" :invalid="invalid" class="flex-auto" autocomplete="off" />
		</div>
		<div class="flex align-items-center gap-3 mb-3">
			<IcUpload />
		</div>
		<div class="flex justify-content-end gap-2">
			<Button type="button" label="Cancel" severity="secondary" @click="close" />
			<Button type="button" label="Load" severity="primary" @click="close" />
		</div>
	</Dialog>
</template>

<style scoped lang="scss"></style>
