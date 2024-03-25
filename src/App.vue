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
import {useRoute, useRouter} from 'vue-router'
import {dump, load} from "./core/Share.ts";

const router = useRouter()
const route = useRoute()
const isSaveHotkey = isHotkey('mod+s')
const lastDump = ref('')

onMounted(() => {
	window.document.addEventListener('keydown', (e) => {
		if (isSaveHotkey(e)) {
			e.preventDefault()
			console.log("save")
			lastDump.value = dump()
			router.push({ name: 'withData', params: { data: lastDump.value } })
		}
	})
})
watch(() => route.params, (newVal) => {
	if (lastDump.value !== newVal.data) {
		load(newVal.data)
	}
})
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
</style>
