<script setup lang="ts">
import CodeMirror from "./components/Code-mirror.vue";
import Errors from "./components/Errors.vue";
import Control from "./components/Control.vue";
import Register from "./components/Register.vue";
import Stack from "./components/Stack.vue";
</script>

<template>
	<div class="container">
		<div class="code">
			<Errors></Errors>
			<CodeMirror></CodeMirror>
		</div>
		<div class="side">
			<Control></Control>
			<Register></Register>
			<Stack></Stack>
		</div>
		<div class="bottom">
			<div class="raw"></div>
			<div class="devises"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
</style>
