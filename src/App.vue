<script setup lang="ts">
import CodeMirror from "./components/Code-mirror.vue";
import Errors from "./components/Errors.vue";
import Control from "./components/Control.vue";
import Register from "./components/Register.vue";
import Stack from "./components/Stack.vue";
import Raw from "./components/Raw.vue";
import Devises from "./components/Devises.vue";
import {onMounted, ref, watch} from "vue";
import isHotkey from "is-hotkey";
import {dump, load} from "./core/Share.ts";
import {useToast} from "primevue/usetoast";
import Button from "primevue/button";

const isSaveHotkey = isHotkey('mod+s')
const lastDump = ref('')
const toast = useToast();
const op = ref();

onMounted(() => {
	window.document.addEventListener('keydown', (e) => {
		if (isSaveHotkey(e)) {
			e.preventDefault()
			console.log("save")
			try {
				lastDump.value = dump()
				document.location.hash = lastDump.value
			} catch (e: any) {
				toast.add({severity: 'error', summary: 'Error', detail: e?.message, life: 3000})

			}
		}
	})
})
watch(() => document.location.hash, () => {
	if (lastDump.value !== document.location.hash) {
		load(document.location.hash.slice(1)).catch((e) => {
			toast.add({severity: 'error', summary: 'Error', detail: e.message, life: 3000})
		})
	}
})
if (document.location.hash.slice(1).length > 0) {
	load(document.location.hash.slice(1)).catch((e) => {
		toast.add({severity: 'error', summary: 'Error', detail: e.message, life: 3000})
	})
}

const discord = (event: any) => {
	op.value.toggle(event);
}
</script>

<template>
	<Toast/>
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

	<Button :class="$style.discord" @click="discord" icon="pi pi-discord" severity="info" size="large" raised rounded aria-label="Cancel"/>
	<OverlayPanel ref="op">
		<iframe loading="lazy" src="https://discord.com/widget?id=848153816263295006&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
	</OverlayPanel>
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

.discord {
	position: fixed;
	bottom: 20px;
	right: 20px;
}
</style>
