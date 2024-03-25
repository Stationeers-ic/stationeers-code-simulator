<script setup lang="ts">
import ic10 from "../../core/ic10.ts";
import {getCurrentInstance, onBeforeUnmount, onMounted, ref} from "vue";
import data, {Device, Devices} from "../../core/Data.ts";
import DeviceProps from "./DeviceProps.vue";
import DevicePorts from "./DevicePorts.vue";

const props = defineProps(['id', 'device'])
const image = ref('')
const name = ref('')
const devicesData = ref<Devices>([])
const deviceData = ref<Device | undefined>(undefined)


const instance = getCurrentInstance();
onMounted(async () => {
	devicesData.value = await data.getDevices()
	deviceData.value = devicesData.value.find((d) => d.PrefabHash === props.device.PrefabHash)
	image.value = deviceData.value?.image || 'https://placehold.co/128?text=Unknown'
	name.value = ic10.getEnv().deviceNames.get(props.id) || ''

	ic10.getEnv().on('update', () => {
		instance?.proxy?.$forceUpdate();
	})
})

onBeforeUnmount(() => {

	ic10.getEnv().off('update')
});

function remove() {
	ic10.getEnv().removeDevice(props.id)
}

const newKey = ref('')
const newVal = ref(0)

function add() {
	const d = ic10.getEnv().devices.get(props.id)
	if (d) {
		d[newKey.value] = newVal.value
	}
}
</script>

<template>
	<Card :class="$style.card" style="">
		<template #header>
			<div :class="$style.image">
				<Image loading="lazy" alt="user header" :src="image"/>
			</div>
		</template>
		<template #title>
			<span :class="$style.break">{{ deviceData?.PrefabName }}</span>
		</template>
		<template #subtitle v-if="name">
			<span :class="$style.break">{{ name }}</span>
		</template>
		<template #content>
			<DevicePorts :id="props.id"/>
			<DeviceProps :device="props.device"/>
			<Divider/>
			<InputGroup>
				<InputText style="width:7em" v-model="newKey" placeholder="Key"/>
				<InputNumber :useGrouping="false" style="width:15em" v-model="newVal" placeholder="Value"/>
				<Button style="width:2em" @click="add" size="small" icon="pi pi-plus-circle"/>
			</InputGroup>
		</template>
		<template #footer>
			<div class="flex gap-3 mt-1">
				<Button label="Remove" icon="pi pi-ban" @click="remove" severity="danger" outlined class="w-full"/>
				<!--				<Button label="Save" class="w-full"/>-->
			</div>
		</template>
	</Card>
</template>

<style module scoped lang="scss">

.card {
	$count: 3;
	width: auto;
	overflow: hidden;
	max-width: calc(100% / $count - (5px * ($count - 1)));
}

.break {
	word-break: break-all;
}

.image {
	width: 100%;
	height: 128px;
	display: flex;
	justify-content: center;
}
</style>
