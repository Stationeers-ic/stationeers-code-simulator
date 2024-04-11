<script setup lang="ts">
const props = defineProps(["name", "active"])
const model = defineModel<number>()
</script>

<template>
	<InputGroup :class="$style.StackInput">
		<InputGroupAddon :class="{active:props.active === true}">{{ props.name }}</InputGroupAddon>
		<InputNumber :useGrouping="false" :class="{ [$style.defaultValue]: model == 0 }" v-model="model" width="100%" placeholder="Value" />
	</InputGroup>
</template>

<style module lang="scss">
.StackInput {


	.defaultValue {
		input {
			color: var(--text-color-secondary) !important;
		}
	}

	* {
		font-size: 12px;
	}

	input {
		padding: 4px !important;
	}
}
</style>

<style scoped>
.active {
	background-color: var(--primary-color) !important;
	color: var(--primary-color-text) !important;
}
</style>
