<script setup lang="ts">
import ic10 from "../core/ic10.ts"
import StackInput from "../ui/StackInput.vue"
</script>

<template>
	<div class="stack">
		<h3>{{ $t("stack.stack") }}</h3>
		<div :class="$style.stackContent">
			<div :class="$style.stackItem" v-for="(_, index) in ic10.getEnv().stack">
				<StackInput :name="index" v-model="ic10.getEnv().stack[index]" />
			</div>
		</div>
	</div>
</template>

<style module lang="scss">
.stackContent {
	justify-content: flex-start;
	width: calc(100% - 5px);
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: flex-start;
	max-height: calc(32px * 2 + 30px);
	overflow-x: auto;
	overflow-y: hidden;

	.stackItem {
		max-width: 80px;
		height: 32px;
	}
}
</style>
