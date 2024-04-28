<script setup lang="ts">
import ic10 from "../core/ic10.ts"
import StackInput from "../ui/StackInput.vue"

const props = defineProps<{
	deviceId?: string
	lines?: number
}>()
const lines = props.lines || 2

let stack: number[] = []
const isDb = props.deviceId == undefined || ic10.getEnv().devicesAttached.get(props.deviceId) === 'db'
if (!isDb && props.deviceId) {
	if (ic10.getEnv().devicesStack.has(props.deviceId)) {
		stack = ic10.getEnv().devicesStack.get(props.deviceId) as number[]
	}else{
		stack = []
	}
} else {
	stack = ic10.getEnv().stack
}
</script>

<template>
	<div class="stack">
		<div :class="$style.stackContent">
			<div :class="$style.stackItem" v-for="(_, index) in stack">
				<StackInput :active="isDb && index === ic10.getEnv().get('r16')" :name="index" v-model="stack[index]"/>
			</div>
		</div>
	</div>
</template>

<style module lang="scss">
.stackContent {
	$lines: v-bind('lines');

	justify-content: flex-start;
	width: calc(100% - 5px);
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: flex-start;
	max-height: calc(32px * $lines + 30px);
	overflow-x: auto;
	overflow-y: hidden;

	.stackItem {
		max-width: 80px;
		height: 32px;
	}
}
</style>
