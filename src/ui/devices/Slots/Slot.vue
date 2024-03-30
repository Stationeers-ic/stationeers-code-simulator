<script setup lang="ts">
import data, { Item, Slot } from "../../../core/Data.ts"
import { z } from "zod"
import { onMounted, ref, watch } from "vue"
import ic10 from "../../../core/ic10.ts"
import ItemSelect from "./ItemSelect.vue"
import Button from "primevue/button"

const props = defineProps(["data", "deviceId"]) as Readonly<{ data: z.infer<typeof Slot>; deviceId: string }>
const image = ref("")
const itemCount = ref(0)
const Quantity = ref(0)
const item = ref<Item | null>(null)
const deviceName = ref("")
onMounted(async () => {
	image.value = (await data.getimages())?.["SlotType." + props.data.SlotType]
	const slotIndex = props.data.SlotIndex.toString()
	const itemHash = ic10.getEnv().getDeviceProp(props.deviceId, `Slots.${slotIndex}.OccupantHash`) // восстановление предмета
	item.value = (await data.getItems()).find((e) => e.PrefabHash === itemHash) ?? null
	itemCount.value = ic10.getEnv().getDeviceProp(props.deviceId, `Slots.${slotIndex}.Quantity`) // восстановление количества
	deviceName.value =
		ic10.getEnv().devicesAttached.get(props.deviceId) ??
		ic10.getEnv().deviceNames.get(props.deviceId)?.toString() ??
		(await getPrefabName())
})

async function getPrefabName() {
	const devicesData = await data.getDevices()
	const PrefabHash = ic10.getEnv().devices.get(props.deviceId)?.PrefabHash
	const deviceData = devicesData.find((d) => d.PrefabHash === PrefabHash) ?? null
	return deviceData?.PrefabName?.toString() ?? ""
}

const visible = ref(false)

const sync = async () => {
	const slotIndex = props.data.SlotIndex.toString()
	if (item.value) {
		Quantity.value = itemCount.value
		if (Quantity.value) {
			ic10.getEnv().setDeviceProp(props.deviceId, `Slots.${slotIndex}.Quantity`, Quantity.value)
		} else {
			ic10.getEnv().setDeviceProp(props.deviceId, `Slots.${slotIndex}.Quantity`, 0)
		}
		ic10.getEnv().setDeviceProp(props.deviceId, `Slots.${slotIndex}.OccupantHash`, item.value.PrefabHash)
		ic10.getEnv().setDeviceProp(props.deviceId, `Slots.${slotIndex}.Occupied`, 1)
	} else {
		Quantity.value = 0
		ic10.getEnv().setDeviceProp(props.deviceId, `Slots.${slotIndex}.OccupantHash`, 0)
		ic10.getEnv().setDeviceProp(props.deviceId, `Slots.${slotIndex}.Occupied`, 0)
	}
	ic10.getEnv().setDeviceProp(props.deviceId, `Slots.${slotIndex}.Quantity`, Quantity.value)
}
const clear = () => {
	itemCount.value = 0
	item.value = null
}
watch(item, sync)
watch(itemCount, sync)
</script>

<template>
	<div class="slot" @click="visible = true">
		<img loading="lazy" class="item" v-if="item?.image" :src="item.image" :alt="item.PrefabName" />
		<img loading="lazy" class="back" v-else-if="image" :src="image" :alt="props.data.SlotType" />
		<span class="id">{{ props.data.SlotIndex }}</span>
		<span class="count">{{ Quantity }}</span>
	</div>

	<Dialog
		v-model:visible="visible"
		:header="`Edit slot #${props.data.SlotIndex} in device '${deviceName}'`"
		:style="{ width: '25rem' }"
	>
		<div class="flex flex-column gap-2">
			<InputGroup>
				<ItemSelect v-model="item" />
				<Button severity="danger" icon="pi pi-minus-circle" @click="clear" />
			</InputGroup>
		</div>
		<div class="flex flex-column gap-2">
			<InputGroup>
				<InputGroupAddon> Count</InputGroupAddon>
				<InputNumber showButtons buttonLayout="horizontal" :min="1" :step="1" v-model="itemCount">
					<template #incrementbuttonicon>
						<span class="pi pi-plus" />
					</template>
					<template #decrementbuttonicon>
						<span class="pi pi-minus" />
					</template>
				</InputNumber>
			</InputGroup>
		</div>

		<div class="flex justify-content-end gap-2">
			<Button type="button" label="Close" severity="secondary" @click="visible = false"></Button>
		</div>
	</Dialog>
</template>
<style scoped lang="scss">
.slot {
	width: 50px;
	height: 50px;
	box-shadow: 1px 1px 3px 3px black;
	position: relative;
	z-index: 1;
	cursor: pointer;

	img {
		position: absolute;
		top: 0;
		left: 0;

		margin: 5%;
		width: 90%;
		height: 90%;

		&.back {
			opacity: 0.3;
		}
	}

	.count {
		pointer-events: none;
		//color:red;
		font-weight: bold;
		font-size: calc(1em - 3px);
		position: absolute;
		bottom: 2px;
		right: 3px;

		&:empty {
			display: none;
		}
	}

	.id {
		opacity: 0.6;
		pointer-events: none;
		font-weight: bold;
		font-size: calc(1em - 5px);
		position: absolute;
		top: 2px;
		left: 3px;
	}
}
</style>
