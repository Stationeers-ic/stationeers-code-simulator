<script setup lang="ts">
import {Codemirror} from "vue-codemirror";
import {monokai} from '@uiw/codemirror-theme-monokai';
import {onBeforeUnmount, onMounted, ref} from "vue";
import ic10 from "../core/ic10.ts";
import {useToast} from "primevue/usetoast";
import {Err} from "ic10";

const extensions = [monokai]

const test = ref<string>("")
const toast = useToast();
async function error() {
	test.value = ic10.getEnv().getErrors().map(e => e.format(1)).join("\n")
}
onMounted(() => {
	ic10.getEnv().on('update', error)
	ic10.getEnv().on('error', error)
	ic10.getEnv().on('error', (err:Err)=>{
		toast.add({severity: 'error', summary: 'Error', detail: err.format(), life: 3000})
	})
})
onBeforeUnmount(() => {
	ic10.getEnv().off('update')
	ic10.getEnv().off('error')
})
</script>

<template>
	<div class="errors">
		<Codemirror
			placeholder="Errors ..."
			disabled
			:style="{ height: '100%' }"
			:autofocus="true"
			:indent-with-tab="true"
			:tab-size="2"
			:extensions="extensions"
			v-model="test"
		/>
	</div>
</template>

<style scoped lang="scss">

.errors {
	height: 100%;
	grid-area: errors;
}
</style>
