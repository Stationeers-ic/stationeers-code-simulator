<script setup lang="ts">
import ic10 from "../../core/ic10.ts"
import { getCurrentInstance, onBeforeUnmount, onMounted, ref } from "vue"
import data, { Device, Devices } from "../../core/Data.ts"
import DeviceProps from "./DeviceProps.vue"
import DevicePorts from "./DevicePorts.vue"
import DeviceSlots from "./Slots/DeviceSlots.vue"

const props = defineProps(["id", "device"])
const image = ref("")
const name = ref("")
const devicesData = ref<Devices>([])
const deviceData = ref<Device | undefined>(undefined)

const instance = getCurrentInstance()
onMounted(async () => {
	devicesData.value = await data.getDevices()
	deviceData.value = devicesData.value.find((d) => d.PrefabHash === props.device.PrefabHash)
	image.value = deviceData.value?.image || "https://placehold.co/128?text=Unknown"
	name.value = ic10.getEnv().deviceNames.get(props.id) || ""
	ic10.getEnv().on("update", () => {
		instance?.proxy?.$forceUpdate()
	})
})

onBeforeUnmount(() => {
	ic10.getEnv().off("update")
})

function remove() {
	ic10.getEnv().removeDevice(props.id)
}

const newKey = ref("")
const newVal = ref(0)

function add() {
	const d = ic10.getEnv().devices.get(props.id)
	if (d) {
		d[newKey.value] = newVal.value
	}
}
</script>

<template>
	<Card :class="[$style.card, 'device-card']" style="">
		<template #header>
			<div :class="$style.image">
				<Image loading="lazy" alt="user header" :src="image" />
			</div>
		</template>
		<template #title>
			<div :class="$style.break">{{ deviceData?.PrefabName }}</div>
		</template>
		<template #subtitle v-if="name">
			<span :class="$style.break">{{ name }}</span>
		</template>
		<template #content>
			<div class="device-ports">
				<DevicePorts :id="props.id" />
			</div>
			<div class="device-props">
				<DeviceProps :id="props.id" :device="props.device" />
			</div>
			<Divider />
			<div class="device-new-prop">
				<InputGroup class="prop">
					<Dropdown editable filter class="key" v-model="newKey" placeholder="Key" :options="deviceData?.logics" option-label="name" option-value="name">
						<template #option="slotProps">
							<div class="flex align-items-center gap-1">
								<i v-if="slotProps.option.permissions.includes('Write')" style="color: var(--primary-color)" class="pi pi-file-edit"></i>
								<i v-else class="pi pi-file" style="color: #fb923c"></i>
								<div :title="slotProps.option.name">{{ slotProps.option.name }}</div>
							</div>
						</template>
					</Dropdown>
					<InputNumber :minFractionDigits="0" :maxFractionDigits="20"  class="val" :useGrouping="false" v-model="newVal" placeholder="Value" />
					<Button class="btn" @click="add" size="small" icon="pi pi-plus-circle" />
				</InputGroup>
			</div>
			<Divider />
			<div class="device-slots">
				<DeviceSlots :id="props.id" :device="props.device" :deviceData="deviceData" />
			</div>
		</template>
		<template #footer>
			<div class="flex gap-3 mt-1">
				<Button :label="$t('remove')" icon="pi pi-ban" @click="remove" severity="danger" outlined class="w-full device-remove" />
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
	max-width: calc(100% / $count - (2px * ($count - 1)));
	min-width: 250px;
}

.break {
	word-break: break-all;
}

.small {
	color: var(--text-color-secondary);
}

.image {
	width: 100%;
	height: 128px;
	display: flex;
	justify-content: center;
}
</style>

<style>
.device-card {
	.p-card-body {
		height: 100%;
	}
}
</style>
