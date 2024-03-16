<script setup lang="ts">
import {Codemirror} from "vue-codemirror";
import {monokai} from '@uiw/codemirror-theme-monokai';

const extensions = [monokai]

</script>

<template>
	<div class="errors">
		<Codemirror
			placeholder="Errors ..."
			disabled
			:style="{ height: '100%' }"
			:autofocus="true"
			:indent-with-tab="true"
			:tab-size="2"
			:extensions="extensions"
		/>
	</div>
</template>

<style scoped lang="scss">

</style>
