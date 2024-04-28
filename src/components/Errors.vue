<script setup lang="ts">
import {Codemirror} from "vue-codemirror"
import {monokai} from "@uiw/codemirror-theme-monokai"
import {onBeforeUnmount, onMounted, ref} from "vue"
import ic10 from "../core/ic10.ts"
import {useToast} from "primevue/usetoast"
import {Err} from "ic10"

import {EditorView} from "codemirror"
import {zeroLineNumbers} from "codemirror-lang-ic10"

const test = ref<string>("")
const toast = useToast()

async function error() {
	test.value = ic10
		.getEnv()
		.getErrors()
		.map((e) => e.format())
		.join("\n")
}

onMounted(() => {
	ic10.getEnv().on("update", error)
	ic10.getEnv().on("error", error)
	ic10.getEnv().on("error", (err: Err) => {
		toast.add({ severity: "error", summary: "Error", detail: err.format(), life: 3000 })
	})
	ic10.getEnv().on("info", (err: Err) => {
		toast.add({ severity: "info", summary: "Error", detail: err.format(), life: 3000 })
	})
})
onBeforeUnmount(() => {
	ic10.getEnv().off("update")
	ic10.getEnv().off("error")
})

const extensions = [monokai, EditorView.lineWrapping, zeroLineNumbers]
</script>

<template>
	<div class="errors">
		<Codemirror
			disabled
			:placeholder="$t('errors') + ' ...'"
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
