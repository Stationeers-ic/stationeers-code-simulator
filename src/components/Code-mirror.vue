<script setup lang="ts">
import {codeStore} from '../store'
import {Codemirror} from 'vue-codemirror'
// import {lineNumbers} from '@codemirror/gutter'
import {monokai} from '@uiw/codemirror-theme-monokai';
import {ic10, ic10HoverTooltip, ic10Snippets} from 'codemirror-lang-ic10';
import interpretator from '../core/ic10.ts';
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {EditorView} from "codemirror";

const editor = ref<{
	view: import("@codemirror/view").EditorView;
	state: import("@codemirror/state").EditorState;
	container: HTMLDivElement;
} | null>(null)

watch(() => codeStore.code, (newVal) => {
	localStorage.setItem('code', newVal)
	interpretator.setCode(newVal)
})
onMounted(() => {
	codeStore.code = localStorage.getItem('code') || ''

})
onBeforeUnmount(() => {
	interpretator.getEnv().off('update')
})

watch(() => interpretator.getEnv().line, (newVal) => {
	//@ts-ignore
	window.document.querySelector('div[data-language="ic10"]').querySelectorAll('div').forEach((e, i) => {
		if (i == newVal) {
			e.style.backgroundColor = 'rgb(0 0 0 / 40%)';
			e.scrollIntoView({block: "end", inline: "nearest"});
		} else {
			e.style.backgroundColor = 'transparent'
		}
	})
})

const extensions = [monokai, EditorView.lineWrapping, ic10(), ic10Snippets(), ic10HoverTooltip()]

function handleReady(_editor: {
	view: import("@codemirror/view").EditorView;
	state: import("@codemirror/state").EditorState;
	container: HTMLDivElement;
}) {
	editor.value = _editor
}

</script>

<template>
	<div class="code-mirror">
		<Codemirror
			ref=""
			v-model="codeStore.code"
			placeholder="Code goes here..."
			:style="{ height: '100%' }"
			:autofocus="true"
			:indent-with-tab="true"
			:tab-size="2"
			:extensions="extensions"
			@ready="handleReady"
		/>
	</div>
</template>

<style scoped lang="scss">
.code-mirror {
	height: 100%;
	overflow: auto;
	grid-area: code-mirror;
}
</style>
