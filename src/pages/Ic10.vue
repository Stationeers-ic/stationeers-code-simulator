<script setup lang="ts">
import CodeMirror from "../components/Code-mirror.vue"
import Errors from "../components/Errors.vue"
import Control from "../components/Control.vue"
import Register from "../components/Register.vue"
import Stack from "../components/Stack.vue"
import Raw from "../components/Raw.vue"
import Devises from "../components/Devises.vue"
import { onBeforeUnmount, onMounted, ref } from "vue"
import isHotkey from "is-hotkey"
import { useToast } from "primevue/usetoast"

import delay from "delay"
import SaveDialog from "../ui/SaveDialog.vue"
import { saveToBrowser, startupLoad } from "../core/Save.ts"
import SettingBar from "../components/SettingBar.vue"
import { off, on } from "../core/Events.ts"

const isSaveHotkey = isHotkey("mod+s")
const isSaveAsHotkey = isHotkey("mod+shift+s")
const isOpenHotkey = isHotkey("mod+o")
const saveDialogOpen = ref(false)
const openDialogOpen = ref(false)
const toast = useToast()
const tt = () => (saveDialogOpen.value = true)
const HotKeyHandler = async (e: any) => {
	if (isSaveHotkey(e)) {
		e.preventDefault()
		await delay(200)
		console.log("save")
		try {
			saveToBrowser()
			toast.add({ severity: "success", summary: "Saved!", detail: "Saved to clipboard", life: 3000 })
		} catch (e: any) {
			toast.add({ severity: "error", summary: "Error", detail: e?.message, life: 3000 })
		}
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
	on("saveDialogOpen", tt)
})
onBeforeUnmount(() => {
	window.document.removeEventListener("keydown", HotKeyHandler)
	off("saveDialogOpen", tt)
})
startupLoad()
	.then((from) => {
		if (from) {
			toast.add({ severity: "success", summary: "Loaded", detail: `load data ${from}`, life: 3000 })
		}
	})
	.catch((e) => {
		toast.add({ severity: "error", summary: "Error", detail: e.message, life: 3000 })
	})
</script>

<template>
	<Toast />
	<SettingBar />
	<SaveDialog v-model="saveDialogOpen"></SaveDialog>
	<div class="app-container">
		<div class="code">
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
		<div class="bottom">
			<Raw></Raw>
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
