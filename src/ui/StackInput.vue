<script setup lang="ts">
const props = defineProps(["name"])
const model = defineModel<number>()
</script>

<template>
	<InputGroup :class="$style.StackInput">
		<InputGroupAddon>{{ props.name }}</InputGroupAddon>
		<InputText :useGrouping="false" type="number"  :class="{ [$style.defaultValue]: model == 0 }" v-model="model" width="100%" placeholder="Value" />
	</InputGroup>
</template>

<style module lang="scss">
.StackInput {
	.defaultValue {
		color: var(--text-color-secondary) !important;
	}

	* {
		font-size: 12px;
	}

	input {
		padding: 4px !important;
	}
}
</style>
