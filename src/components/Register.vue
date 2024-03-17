<script setup lang="ts">
import ic10 from "../core/ic10.ts";
//@ts-ignore
ic10.getEnv().on("after_alias", () => {
	console.log("after_alias", ic10.getEnv().aliases);
});
</script>

<template>
	<div class="register">
		<h3>Registers</h3>
		<div :class="$style.registerContent">
			<InputGroup v-for="(_, index) in ic10.getEnv().data">
				<InputGroupAddon>{{ index }}</InputGroupAddon>
				<InputNumber v-model="ic10.getEnv().data[index]" width="100%" placeholder="Value"/>
				<!-- FIXME -->
				<InputGroupAddon v-if="ic10.getEnv().reverseAlias(index as string).length > 0">
					{{ ic10.getEnv().reverseAlias(index as string).join(',') }}
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
