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
	<Button :id="props.id" icon="pi pi-plus" severity="info" @click="visible = true" :label="$t('control.addDevice')" />

	<Dialog v-model:visible="visible" :header="$t('addDevice.header')" style="width: 50vw">
		<span class="p-text-secondary block mb-5"> {{ $t("addDevice.description") }}</span>
		<div class="flex align-items-center gap-3 mb-3">
			<div class="flex flex-column gap-2">
				<FloatLabel>
					<SelectDevice id="deviceHash" v-model="deviceHash" />
					<label for="deviceHash">{{ $t("addDevice.deviceHash") }}</label>
				</FloatLabel>
				<small id="deviceHash-help">{{ $t("addDevice.deviceHashHelp") }}</small>
			</div>
			<div class="flex flex-column gap-2">
				<InputGroup style="width: auto">
					<InputGroupAddon>
						<img loading="lazy" src="/public/icons/ItemLabeller.png" style="width: 18px" alt="Labeller" title="Labeller" />
					</InputGroupAddon>
					<FloatLabel>
						<InputText id="deviceName" v-model="deviceName" />
						<label for="deviceName">{{ $t("addDevice.deviceName") }}</label>
					</FloatLabel>
				</InputGroup>
				<small id="deviceName-help">{{ $t("addDevice.deviceNameHelp") }}</small>
			</div>
			<div class="flex flex-column gap-2">
				<SelectPorts v-model="devicePort" />
				<small id="devicePort-help">{{ $t("addDevice.devicePortHelp") }}</small>
			</div>
		</div>
		<div class="flex align-items-center gap-3 mt-5">
			<div class="flex flex-column gap-2">
				<FloatLabel>
					<InputNumber :useGrouping="false" id="deviceId" v-model="deviceId" />
					<label for="deviceId">{{ $t("addDevice.deviceId") }}</label>
				</FloatLabel>
				<small id="deviceId-help">{{ $t("addDevice.deviceIdHelp") }}</small>
			</div>
		</div>
		<div class="flex justify-content-end gap-2">
			<Button id="tourAddDeviceCancel" type="button" :label="$t('cancel')" severity="secondary" @click="visible = false"></Button>
			<Button id="tourAddDeviceAdd" type="button" :label="$t('add')" @click="add"></Button>
		</div>
	</Dialog>
</template>

<style scoped lang="scss"></style>
