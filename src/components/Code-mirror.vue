<script setup lang="ts">
import {codeStore} from '../store/code.js'
import {Codemirror} from 'vue-codemirror'
import {monokai} from '@uiw/codemirror-theme-monokai';
import {ic10} from 'codemirror-lang-ic10';
import interpritator from '../core/ic10.ts';
import {onMounted, onUnmounted, ref, watch} from "vue";

const extensions = [monokai, ic10()]

onMounted(() => {
	codeStore.code = localStorage.getItem('code') || ''
})

watch(() => codeStore.code, (newVal) => {
	localStorage.setItem('code', newVal)
	interpritator.setCode(newVal)
})
const line = ref(0)
onMounted(() => {
	//@ts-ignore
	interpritator.getEnv().on('update', (l) => {
		line.value = interpritator.getEnv().line
	})
})
onUnmounted(() => {
	//@ts-ignore
	interpritator.getEnv().off('update')
})

watch(line, (newVal) => {
	window.document.querySelector('div[data-language="ic10"]').querySelectorAll('div').forEach((e, i) =>{
		if(i == newVal) {
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
