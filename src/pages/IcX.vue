<script setup lang="ts">
import { Codemirror } from "vue-codemirror"
import { onMounted, watch } from "vue"
import { icX } from "icx-compiler/index"
import CodeMirror from "../components/CodeMirror.vue"
import { codeStore } from "../store"
import { monokai } from "@uiw/codemirror-theme-monokai"
import { EditorView } from "codemirror"
import { zeroLineNumbers } from "codemirror-lang-ic10"

onMounted(update)

function update() {
	const ic = new icX(codeStore.icx)
	codeStore.code = ic.getCompiled()
}

watch(() => codeStore.icx, update)

const extensions = [monokai, EditorView.lineWrapping, zeroLineNumbers]
</script>

<template>
	<Splitter>
		<SplitterPanel :size="50" :min-size="10">
			<codemirror placeholder="ICX Code goes here..." v-model="codeStore.icx" style="min-height: 500px" :extensions="extensions" />
		</SplitterPanel>
		<SplitterPanel :size="50" :min-size="10">
			<CodeMirror style="min-height: 500px" />
		</SplitterPanel>
	</Splitter>
</template>

<style scoped lang="scss"></style>
