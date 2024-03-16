<script setup lang="ts">
import {envStore} from "../store/env.ts";
</script>

<template>
	<div class="register">
		<h3>Registers</h3>
		<div :class="$style.registerContent">
			<InputGroup v-for="(value, index) in envStore.data">
				<InputGroupAddon>{{ index }}</InputGroupAddon>
				<InputNumber v-model="envStore.data[index]" width="100%" placeholder="Value"/>
				<!-- FIXME -->
				<InputGroupAddon v-if="envStore.reverseAlias(index as string).length > 0">
					{{ envStore.reverseAlias(index as string).join(',') }}
				</InputGroupAddon>
			</InputGroup>
		</div>
	</div>
</template>

<style module lang="scss">
.registerContent {
	margin-left: 5px;
	display: flex;
	flex-direction: column;
}
</style>
