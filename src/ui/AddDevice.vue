<script setup lang="ts">
import Button from "primevue/button";
import SelectDevice from "../ui/SelectDevice.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import ic10 from "../core/ic10.ts";
import interpretator from "../core/ic10.ts";
import {str as Hash} from "crc-32";

const ports = ref<{ name: string, code: string }[]>([]);
const visible = ref(false);
const devicePort = ref<string[]>([]);
const deviceHash = ref<string | number>('');
const deviceName = ref<string>('');

function portList() {
	for (let i = 0; i < 6; i++) {
		ports.value.push({name: `D${i}`, code: `d${i}`})
	}
}

onMounted(() => {
	portList()
	//@ts-ignore
	interpretator.getEnv().on('update', (l) => {
		portList()
	})
})

onBeforeUnmount(() => {
	//@ts-ignore
	interpretator.getEnv().off('update')
})


function add() {
	visible.value = false
	let hash = 0
	let name: number | undefined = undefined

	if (typeof deviceHash.value === "string") {
		hash = Hash(deviceHash.value)
	} else {
		hash = deviceHash.value
	}
	if (deviceName.value.length > 0) {
		name = Hash(deviceName.value)
	}
	const id = ic10.getEnv().appendDevice(hash, name)
	devicePort.value.forEach((p) => {
		ic10.getEnv().attachDevice(id, p)
	})
}

</script>

<template>
	<Button severity="info" @click="visible = true">Add</Button>

	<Dialog v-model:visible="visible" modal header="Add Device" style="width: 50vw">
		<span class="p-text-secondary block mb-5">Update your information.</span>
		<div class="flex align-items-center gap-3 mb-3">
			<SelectDevice v-model="deviceHash"/>
			<InputText placeholder="Device Name" v-model="deviceName"/>
			<MultiSelect v-model="devicePort" :options="ports" optionLabel="name" display="chip" optionValue="code">
				<template #option="slotProps">
					<div class="flex align-items-center">
						<div style="padding-right: 5px;">
							<i class="pi pi-circle-fill" style="font-size: 0.6em"
							   v-if="ic10.getEnv().devicesAttached.has(slotProps.option.code)"></i>
							<i class="pi pi-circle" style="font-size: 0.6em" v-else></i>
						</div>
						<div>{{ slotProps.option.name }}</div>
					</div>
				</template>
			</MultiSelect>
		</div>
		<div class="flex justify-content-end gap-2">
			<Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
			<Button type="button" label="Add" @click="add"></Button>
		</div>
	</Dialog>
</template>

<style scoped lang="scss">

</style>
