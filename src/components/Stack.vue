<script setup lang="ts">
import ic10 from "../core/ic10.ts";
import StackInput from "../ui/StackInput.vue";
</script>

<template>
	<div class="stack">
		<h3>Stack</h3>
		<div :class="$style.stackContent">
			<div :class="$style.stackItem" v-for="(_, index) in ic10.getEnv().stack">
				<StackInput :name="index" v-model="ic10.getEnv().stack[index]"/>
			</div>
		</div>
	</div>
</template>

<style module lang="scss">
.stackContent {
	justify-content: flex-start;
	width: calc(100% - 5px);
	margin-left: 5px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;


	.stackItem {
		max-width: 85px;
	}
}
</style>
