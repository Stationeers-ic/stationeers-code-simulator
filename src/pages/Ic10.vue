<script setup lang="ts">
import CodeMirror from "../components/CodeMirror.vue"
import Errors from "../components/Errors.vue"
import Control from "../components/Control.vue"
import Register from "../components/Register.vue"
import Stack from "../components/Stack.vue"
import Devises from "../components/Devises.vue"
import { onBeforeUnmount, onMounted, ref } from "vue"
import isHotkey from "is-hotkey"
import { useToast } from "primevue/usetoast"

import delay from "delay"
import SaveDialog from "../ui/SaveDialog.vue"
import { saveToBrowser } from "../core/Save.ts"
import SettingBar from "../components/SettingBar.vue"
import { off, on } from "../core/Events.ts"
import OpenDialog from "../ui/OpenDialog.vue"
import { useI18n } from "vue-i18n"

const isSaveHotkey = isHotkey("mod+s")
const isSaveAsHotkey = isHotkey("mod+shift+s")
const isOpenHotkey = isHotkey("mod+o")
const saveDialogOpen = ref(false)
const openDialogOpen = ref(false)
const toast = useToast()
const { t } = useI18n()
const showSaveDialog = () => (saveDialogOpen.value = true)
const showOpenDialog = () => (openDialogOpen.value = true)
const save = async () => {
	await delay(200)
	console.log("save")
	try {
		const name = saveToBrowser()
		toast.add({ severity: "success", summary: t("toastSave.success.summary"), detail: t("toastSave.success.detail", { name }), life: 3000 })
	} catch (e: any) {
		toast.add({ severity: "error", summary: t("toast.error.summary"), detail: t("toast.error.detail", { errMsg: e?.message }), life: 3000 })
	}
}
const HotKeyHandler = async (e: any) => {
	if (isSaveHotkey(e)) {
		e.preventDefault()
		await save()
	}
	if (isSaveAsHotkey(e)) {
		e.preventDefault()
		await delay(200)
		console.log("save as")
		saveDialogOpen.value = true
	}
	if (isOpenHotkey(e)) {
		e.preventDefault()
		await delay(200)
		console.log("open")
		openDialogOpen.value = true
	}
}

onMounted(() => {
	window.document.addEventListener("keydown", HotKeyHandler)
	on("saveDialogOpen", showSaveDialog)
	on("openDialogOpen", showOpenDialog)
	on("save", save)
})
onBeforeUnmount(() => {
	window.document.removeEventListener("keydown", HotKeyHandler)
	off("saveDialogOpen", showSaveDialog)
	off("openDialogOpen", showOpenDialog)
	off("save", save)
})
</script>

<template>
	<SettingBar />
	<SaveDialog v-model="saveDialogOpen" />
	<OpenDialog v-model="openDialogOpen" />
	<div class="ic10-container">
		<div class="code" id="tour-code-ic10">
			<Splitter style="height: 100%">
				<SplitterPanel :size="70" :min-size="10">
					<Splitter layout="vertical">
						<SplitterPanel :size="90" :min-size="10">
							<CodeMirror></CodeMirror>
						</SplitterPanel>
						<SplitterPanel :size="10" :min-size="10">
							<Errors></Errors>
						</SplitterPanel>
					</Splitter>
				</SplitterPanel>
				<SplitterPanel :size="30" :min-size="10">
					<Register></Register>
				</SplitterPanel>
			</Splitter>
		</div>
		<Control></Control>
		<Stack></Stack>
		<div class="bottom" id="tour-devises">
			<Devises></Devises>
		</div>
	</div>
</template>

<style module lang="scss">
.code {
	height: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 128px;
	gap: 5px 5px;
	grid-auto-flow: row;
	grid-template-areas:
		"code-mirror"
		"errors";
}

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
