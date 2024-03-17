<script setup lang="ts">
import {Codemirror} from "vue-codemirror";
import {monokai} from '@uiw/codemirror-theme-monokai';
import {onMounted, onUnmounted, ref, watch} from "vue";
import ic10 from "../core/ic10.ts";

const extensions = [monokai]

const test = ref<string>("")

async function error() {
	test.value = ic10.getEnv().getErrors().map(e => e.toString()).join("\n")
}

watch( ic10.getEnv().errors, error)

onMounted(() => {
	// @ts-ignore
	ic10.getEnv().on('error', error)
})
onUnmounted(() => {
	ic10.getEnv().off('error', error)
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

</style>
