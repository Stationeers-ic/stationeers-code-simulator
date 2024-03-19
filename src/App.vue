<script setup lang="ts">
import CodeMirror from "./components/Code-mirror.vue";
import Errors from "./components/Errors.vue";
import Control from "./components/Control.vue";
import Register from "./components/Register.vue";
import Stack from "./components/Stack.vue";
import Raw from "./components/Raw.vue";
import Devises from "./components/Devises.vue";
</script>

<template>
	<div class="app-container">
		<div class="code">
			<Errors></Errors>
			<CodeMirror></CodeMirror>
		</div>
		<Control></Control>
		<Register></Register>
		<Stack></Stack>

		<div class="bottom">
			<Raw></Raw>
			<Devises></Devises>
		</div>
	</div>
</template>

<style scoped lang="scss">
</style>
