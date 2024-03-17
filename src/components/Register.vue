<script setup lang="ts">
import ic10 from "../core/ic10.ts";
import EnvInput from "../ui/EnvInput.vue";
//@ts-ignore
ic10.getEnv().on("after_alias", () => {
	console.log("after_alias", ic10.getEnv().aliases);
});
</script>

<template>
	<div class="register">
		<h3>Registers</h3>
		<div :class="$style.registerContent">
			<EnvInput v-for="(_, index) in ic10.getEnv().data" :name="index" v-model="ic10.getEnv().data[index]"/>
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
