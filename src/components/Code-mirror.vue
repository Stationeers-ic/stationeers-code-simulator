<script setup lang="ts">
import {codeStore} from '../store/code.js'
import {Codemirror} from 'vue-codemirror'
// import {lineNumbers} from '@codemirror/gutter'
import {monokai} from '@uiw/codemirror-theme-monokai';
import {ic10, snippets} from 'codemirror-lang-ic10';
import interpretator from '../core/ic10.ts';
import {onBeforeUnmount, onMounted, watch} from "vue";

const extensions = [monokai, ic10(), snippets]

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
			e.style.backgroundColor = 'rgb(0 0 0 / 40%)'
		} else {
			e.style.backgroundColor = 'transparent'
		}
	})
})

</script>

<template>
	<div class="code-mirror">
		<Codemirror
			v-model="codeStore.code"
			placeholder="Code goes here..."
			:style="{ height: '100%' }"
			:autofocus="true"
			:indent-with-tab="true"
			:tab-size="2"
			:extensions="extensions"
		/>
	</div>
</template>

<style scoped lang="scss">

</style>
