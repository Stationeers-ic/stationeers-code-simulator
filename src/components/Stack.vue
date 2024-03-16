<script setup lang="ts">

import {envStore} from "../store/env.ts";
</script>

<template>
	<div class="stack">
		<h3>Stack</h3>
		<div :class="$style.stackContent">
			<div :class="$style.stackItem" v-for="(value, index) in envStore.stack">
				<InputGroup>
					<InputGroupAddon>{{ index }}</InputGroupAddon>
					<InputNumber v-model="envStore.stack[index]" width="100%" placeholder="Value"/>
				</InputGroup>
			</div>
		</div>
	</div>
</template>

<style module lang="scss">
.stackContent {
	justify-content: flex-start;
	width: 100%;
	margin-left: 5px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;


	.stackItem {
		max-width: 89px;

		* {
			font-size: 12px;
		}

		input {
			padding: 4px !important;
		}
	}
}
</style>
