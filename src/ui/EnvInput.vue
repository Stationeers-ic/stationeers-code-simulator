<script setup lang="ts">
import ic10 from "../core/ic10.ts"
import { onBeforeUnmount, onMounted, ref } from "vue"

const props = defineProps(["name", "readonly"])
const model = defineModel<number>()
const aliases = ic10.getEnv().reverseAlias(props.name)
const alias = ref(aliases.join(","))

function update() {
	const aliases = ic10.getEnv().reverseAlias(props.name)
	alias.value = aliases.join(",")
}

onMounted(() => {
	ic10.getEnv().on("update", update)
})
onBeforeUnmount(() => {
	ic10.getEnv().off("update", update)
})
</script>

<template>
	<InputGroup>
		<InputGroupAddon>{{ props.name }}</InputGroupAddon>
		<InputText :useGrouping="false" type="number" v-if="props.readonly === true" v-model="model" width="100%" placeholder="Value" readonly />
		<InputText :useGrouping="false" type="number" v-else :class="{ [$style.defaultValue]: Number(model) === 0 }" v-model="model" width="100%" placeholder="Value" />
		<InputGroupAddon v-if="alias">{{ alias }}</InputGroupAddon>
	</InputGroup>
</template>

<style module lang="scss">
.defaultValue {
	color: var(--text-color-secondary) !important;
}
</style>
