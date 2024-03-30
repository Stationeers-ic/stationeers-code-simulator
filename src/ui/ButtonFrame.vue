<script setup lang="ts">

import Button from "primevue/button";
import {HintedString} from "primevue/ts-helpers";
import {ref} from "vue";

const porps = defineProps(['class', 'icon', 'severity', 'click']) as Readonly<{
	click: (event: any) => void,
	class?: any,
	icon?: string | undefined,
	severity?: HintedString<'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger' | 'contrast'> | undefined;
}>
const op = ref();
let toggle = (event: any) => {
	op.value.toggle(event);
}
if (porps.click) {
	toggle = porps.click;
}
</script>

<template>
	<Button
		@click="toggle"
		:class="porps.class"
		:icon="porps.icon"
		:severity="porps.severity"
		size="large"
		raised
		rounded
		aria-label="Cancel"
	/>

	<OverlayPanel ref="op">
		<slot></slot>
	</OverlayPanel>
</template>

<style scoped lang="scss">

</style>
