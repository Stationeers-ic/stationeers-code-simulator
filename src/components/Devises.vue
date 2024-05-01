<script setup lang="ts">
import ic10 from "../core/ic10.ts"
import { defineAsyncComponent, getCurrentInstance, onBeforeUnmount, onMounted, ref } from "vue"
import DeviceCard from "../ui/devices/DeviceCard.vue"
import { useDialog } from "primevue/usedialog"
import DeviceCardPin from "../ui/devices/DeviceCardPin.vue"

const devices = ref<Map<string, any>>(ic10.getEnv().getDevices())

const instance = getCurrentInstance()
onMounted(async () => {
	ic10.getEnv().on("update", () => {
		devices.value = ic10.getEnv().getDevices()
		instance?.proxy?.$forceUpdate()
	})
})

onBeforeUnmount(() => {
	ic10.getEnv().off("update")
})

const dialog = useDialog()

function pin(id: string, width: number) {
	dialog.open(DeviceCardPin, {
		props: {
			contentClass: "pin-device-dialog",
			header: " ",
			style: {
				width: width + "px",
			},
		},
		data: {
			id: id,
			device: devices.value.get(id),
		},
	})
}
</script>

<template>
	<div :class="$style.container">
		<DeviceCard v-for="[id, device] in devices" :key="id" :id="id" :device="device" @pin="pin" />
	</div>
</template>

<style module lang="scss">
.container {
	display: flex;
	max-width: 100%;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: flex-start;
	align-content: flex-start;
	align-items: stretch;
	gap: 5px;
}
</style>
