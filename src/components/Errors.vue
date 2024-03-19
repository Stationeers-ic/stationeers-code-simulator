<script setup lang="ts">
import {Codemirror} from "vue-codemirror";
import {monokai} from '@uiw/codemirror-theme-monokai';
import {onBeforeUnmount, onMounted, ref} from "vue";
import ic10 from "../core/ic10.ts";

const extensions = [monokai]

const test = ref<string>("")

async function error() {
	test.value = ic10.getEnv().getErrors().map(e => e.format(1)).join("\n")
}
onMounted(() => {
	// @ts-ignore
	ic10.getEnv().on('update', error)
})
onBeforeUnmount(() => {
	// @ts-ignore
	ic10.getEnv().off('update', error)
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
