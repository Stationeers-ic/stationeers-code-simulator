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
		<div class="side">
			<Control></Control>
			<Register></Register>
		</div>
		<div class="bottom">
			<Raw></Raw>
			<Devises></Devises>
		</div>
		<Stack></Stack>
	</div>
</template>

<style scoped lang="scss">
</style>
