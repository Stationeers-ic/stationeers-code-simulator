<script setup lang="ts">
import {ref, watch} from 'vue'
import ToggleButton from 'primevue/togglebutton'
import InputGroup from 'primevue/inputgroup'
import Button from 'primevue/button'
import ic10 from "../core/ic10.ts";
import {str as hash} from "crc-32";
import AddDevice from "../ui/AddDevice.vue";

const checked = ref(false)
const hashText = ref("")

watch(checked, (newVal) => {
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
const convert = () => {
	hashText.value = hash(hashText.value).toString()
	const el = document.getElementById("hashText") as HTMLInputElement
	if (el) {
		el.focus()
	}
}
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
			<InputGroupAddon>
				#
			</InputGroupAddon>
			<Button @click="convert" label="convert"/>
			<AddDevice/>
			<InputText placeholder="String to Hash" @focus="($event.target as any).select()" id="hashText" v-model="hashText" style="max-width: 200px"/>
		</InputGroup>


	</div>
</template>

<style scoped lang="scss">

</style>
