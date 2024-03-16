<script setup lang="ts">
import {ref} from 'vue'
import ToggleButton from 'primevue/togglebutton'
import InputGroup from 'primevue/inputgroup'
import Button from 'primevue/button'

const checked = ref(false)
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
			<Button label="Step"/>
			<Button severity="warning" label="Reset"/>
		</InputGroup>
	</div>
</template>

<style scoped lang="scss">

</style>
