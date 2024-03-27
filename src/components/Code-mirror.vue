<script setup lang="ts">
import {codeStore} from '../store'
import {Codemirror} from 'vue-codemirror'
// import {lineNumbers} from '@codemirror/gutter'
import {monokai} from '@uiw/codemirror-theme-monokai';
import {ic10, ic10HoverTooltip, ic10Snippets, zeroLineNumbers} from 'codemirror-lang-ic10';
import interpretator from '../core/ic10.ts';
import {onBeforeUnmount, onMounted, watch} from "vue";
import {EditorView} from "codemirror";


watch(() => codeStore.code, (newVal) => {
	interpretator.setCode(newVal)
})
onMounted(() => {
	codeStore.code = localStorage.getItem('code') || ''
	interpretator.getEnv().on('update_code', () => {
		codeStore.code = interpretator.code
	})
})
onBeforeUnmount(() => {
	interpretator.getEnv().off('update')
})

watch(() => interpretator.getEnv().line, (newVal) => {
	window.document.querySelector<HTMLDivElement>('div[data-language="ic10"]')?.querySelectorAll<HTMLDivElement>('div.cm-line').forEach((e, i) => {
		if (i === newVal - 1) {
			e.style.backgroundColor = 'rgb(0 0 0 / 40%)';
			// e.scrollIntoView({block: "end", inline: "nearest"});
		} else {
			e.style.backgroundColor = 'transparent'
		}
	})
})
const extensions = [monokai, EditorView.lineWrapping, ic10(), ic10Snippets(), ic10HoverTooltip(), zeroLineNumbers]

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
			:lineNumberFormatter="(line:number) => line - 1"
			:extensions="extensions"
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
