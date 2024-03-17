<script setup lang="ts">
import {ref, watch} from 'vue'
import ToggleButton from 'primevue/togglebutton'
import InputGroup from 'primevue/inputgroup'
import Button from 'primevue/button'
import ic10 from "../core/ic10.ts";


const checked = ref(false)

watch(checked, (newVal, oldVal) => {
	if (newVal) {
		console.log("Run")
		ic10.run().then(() => {
			console.log("Run finished")
			checked.value = false
		}).catch(() => {
			console.log("Run error")
			checked.value = false
		})
	} else {
		console.log("Run stopped")
		ic10.stop()

	}
})

const reset = () => {
	ic10.reset()
}
const step = () => {
	ic10.step()
}
</script>

<template>
	<div class="control">
		<InputGroup>
			<ToggleButton
				v-model="checked"
				style="width: 6em"
				onLabel="Stop"
				offLabel="Run "
				onIcon="pi pi-stop"
				offIcon="pi pi-play"
			/>
			<Button @click="step" label="Step"/>
			<Button @click="reset" severity="warning" label="Reset"/>
		</InputGroup>
	</div>
</template>

<style scoped lang="scss">

</style>
