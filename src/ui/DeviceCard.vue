<script setup lang="ts">
import ic10 from "../core/ic10.ts";
import {onMounted, ref} from "vue";
import data, {Device, Devices} from "../core/Data.ts";

const props = defineProps(['id', 'device'])
const image = ref('')
const name = ref('')
const devicesData = ref<Devices>([])
const deviceData = ref<Device | undefined>(undefined)

onMounted(async () => {
	devicesData.value = await data.getDevices()
	deviceData.value = devicesData.value.find((d) => d.PrefabHash === props.device.PrefabHash)
	image.value = deviceData.value?.image || ''
	name.value = ic10.getEnv().deviceNames.get(props.id) || ''
})

function remove() {
	ic10.getEnv().removeDevice(props.id)
}

</script>

<template>
	<Card style="width: auto; overflow: hidden">
		<template #header>
			<img alt="user header" :src="image"/>
		</template>
		<template #title>{{ deviceData?.PrefabName }}</template>
		<template #subtitle>{{ name }}</template>
		<template #content>
			<div :class="$style.ports">
				<template v-for="port in ['db', 'd0','d1', 'd2', 'd3', 'd4', 'd5' ]">
					<span v-if="ic10.getEnv().devicesAttached.get(port) === props.id">{{ port }}</span>
				</template>
			</div>
			<Divider/>
			<div v-for="(value, id) in props.device" class="flex gap-1">
				<span>{{ id }}:</span>
				<span>{{ value }}</span>
			</div>
		</template>
		<template #footer>
			<div class="flex gap-3 mt-1">
				<Button label="remove" @click="remove" severity="danger" outlined class="w-full"/>
				<!--				<Button label="Save" class="w-full"/>-->
			</div>
		</template>
	</Card>
</template>

<style module scoped lang="scss">
.ports {
	display: flex;
	flex-direction: row;
	gap: 5px;
}
</style>
