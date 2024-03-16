<script setup lang="ts">
import { codeStore } from '../store/code.js'
import { Codemirror } from 'vue-codemirror'
import { monokai } from '@uiw/codemirror-theme-monokai';
import { ic10 } from 'codemirror-lang-ic10';
import {onMounted, watch} from "vue";
const extensions = [monokai,ic10()]

onMounted(() => {
	codeStore.code = localStorage.getItem('code') || ''
})

watch(() => codeStore.code, (newVal) => {
	localStorage.setItem('code', newVal)
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
