<script setup lang="ts">
import Button from "primevue/button"
import SelectDevice from "../ui/SelectDevice.vue"
import { ref } from "vue"
import ic10 from "../core/ic10.ts"
import { str as Hash } from "crc-32"
import { useToast } from "primevue/usetoast"
import SelectPorts from "./devices/SelectPorts.vue"

const props = defineProps(["id"])

const visible = ref(false)
const devicePort = ref<string[]>([])
const deviceHash = ref<string | number>("")
const deviceName = ref<string>("")
const deviceId = ref<number | undefined>(undefined)
const toast = useToast()
function add() {
	visible.value = false
	let hash: number
	let name: number | undefined = undefined

	if (typeof deviceHash.value === "string") {
		if (!isNaN(+deviceHash.value)) {
			hash = +deviceHash.value
		} else {
			hash = Hash(deviceHash.value)
		}
	} else {
		hash = deviceHash.value
	}
	if (deviceName.value.length > 0) {
		name = Hash(deviceName.value)
	}
	const id = ic10.getEnv().appendDevice(hash, name, deviceId.value)
	devicePort.value.forEach((p) => {
		ic10.getEnv().attachDevice(id, p)
	})
	if (name) {
		ic10.getEnv().deviceNames.set(id, deviceName.value)
		ic10.getEnv().deviceNames.set(deviceName.value, id)
	}
	if (ic10.getEnv().devices.has(id)) {
		toast.add({ severity: "success", summary: "Device added", detail: `Device ${id} added`, life: 3000 })
	}

	devicePort.value = []
	deviceHash.value = ""
	deviceName.value = ""
	deviceId.value = undefined
}
</script>

<template>
	<Button :id="props.id" icon="pi pi-plus" severity="info" @click="visible = true" label="Add device" />

	<Dialog v-model:visible="visible" header="Add Device" style="width: 50vw">
		<span class="p-text-secondary block mb-5"> Add new device to environment </span>
		<div class="flex align-items-center gap-3 mb-3">
			<div class="flex flex-column gap-2">
				<FloatLabel>
					<SelectDevice id="deviceHash" v-model="deviceHash" />
					<label for="deviceHash">Device hash</label>
				</FloatLabel>
				<small id="username-help">Enter or select your device PrefabHash or PrefabName.</small>
			</div>
			<div class="flex flex-column gap-2">
				<InputGroup style="width: auto">
					<InputGroupAddon>
						<img
							loading="lazy"
							src="https://aws.traineratwot.site/icx/wiki_images/main/ItemLabeller.png"
							style="width: 18px"
							alt="Labeller"
							title="Labeller"
						/>
					</InputGroupAddon>
					<FloatLabel>
						<InputText id="deviceName" v-model="deviceName" />
						<label for="deviceName">Device Name</label>
					</FloatLabel>
				</InputGroup>
				<small id="username-help">Enter the device name as you would do with <i>Labeller</i></small>
			</div>

			<div class="flex flex-column gap-2">
				<SelectPorts v-model="devicePort" />
				<small id="username-help"
					>Select the pin to which the device is assigned on the IC or leave empty</small
				>
			</div>
		</div>
		<div class="flex align-items-center gap-3 mb-3">
			<div class="flex flex-column gap-2">
				<FloatLabel>
					<InputNumber :useGrouping="false" id="deviceHash" v-model="deviceId" />
					<label for="deviceHash">Device id</label>
				</FloatLabel>
				<small id="username-help">Enter device id or leave it empty.</small>
			</div>
		</div>
		<div class="flex justify-content-end gap-2">
			<Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
			<Button type="button" label="Add" @click="add"></Button>
		</div>
	</Dialog>
</template>

<style scoped lang="scss"></style>
