<script setup lang="ts">
import { onMounted, ref } from "vue"
import ic10 from "../../core/ic10.ts"
import SelectPorts from "./SelectPorts.vue"

const props = defineProps(["id"])
const ports = ref<string[]>([])
const addPort = ref([])
const visible = ref(false)

onMounted(async () => {
	ic10.getEnv().on("update", () => {
		updatePorts()
	})
	updatePorts()
})

function updatePorts() {
	ports.value = []
	;["db", "d0", "d1", "d2", "d3", "d4", "d5"].forEach((port) => {
		if (ic10.getEnv().devicesAttached.get(port) === props.id) {
			ports.value.push(port)
			ic10.getEnv().preAlias.forEach((value, key) => {
				if (value === port) {
					ports.value.push(key)
				}
			})
		}
	})
}

function detach(port: string) {
	ic10.getEnv().detachDevice(props.id, port)
}

function attach() {
	addPort.value.forEach((p) => {
		ic10.getEnv().attachDevice(props.id, p)
	})
	addPort.value = []
	visible.value = false
}
</script>

<template>
	<Dialog v-model:visible="visible" header="Connect to ...">
		<InputGroup>
			<SelectPorts v-model="addPort" />
			<Button icon="pi pi-plus" @click="attach" />
		</InputGroup>
	</Dialog>
	<div :class="$style.ports" class="device-ports">
		<template v-for="port in ports">
			<Chip v-if="['db', 'd0', 'd1', 'd2', 'd3', 'd4', 'd5'].includes(port)" :label="port" removable @remove="() => detach(port)" />
			<Chip v-else :label="port" />
		</template>
		<Button icon="pi pi-plus" rounded @click="visible = true" />
	</div>
</template>

<style module lang="scss">
.ports {
	display: flex;
	flex-direction: row;
	gap: 5px;
	margin-bottom: 5px;
}
</style>
