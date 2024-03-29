<script setup lang="ts">
import data, {Item, Slot} from "../../../core/Data.ts";
import {z} from "zod";
import {onMounted, ref, watch} from "vue";
import ic10 from "../../../core/ic10.ts";
import ItemSelect from "./ItemSelect.vue";
import Button from "primevue/button";

const props = defineProps(['data', 'deviceId']) as Readonly<{ data: z.infer<typeof Slot>, deviceId: string }>
console.log(props)
const image = ref('')
const itemCount = ref(0)
const item = ref<Item | null>(null)
onMounted(async () => {
	image.value = (await data.getimages())?.["SlotType." + props.data.SlotType];
	const slotIndex = props.data.SlotIndex.toString();
	const itemHash = ic10.getEnv().getDeviceProp(props.deviceId, `Slots.${slotIndex}.OccupantHash`)
	item.value = (await data.getItems()).find((e => e.PrefabHash === itemHash)) ?? null
})
const visible = ref(false)

watch(item, async (newVal) => {
	const slotIndex = props.data.SlotIndex.toString();
	if (newVal) {
		ic10.getEnv().setDeviceProp(props.deviceId, `Slots.${slotIndex}.OccupantHash`, newVal.PrefabHash)
		ic10.getEnv().setDeviceProp(props.deviceId, `Slots.${slotIndex}.Occupied`, 1)
	} else {
		ic10.getEnv().setDeviceProp(props.deviceId, `Slots.${slotIndex}.OccupantHash`, 0)
		ic10.getEnv().setDeviceProp(props.deviceId, `Slots.${slotIndex}.Occupied`, 0)
	}
})

watch(itemCount, async (newVal) => {
	const slotIndex = props.data.SlotIndex.toString();
	if (newVal) {
		ic10.getEnv().setDeviceProp(props.deviceId, `Slots.${slotIndex}.Quantity`, newVal)
	} else {
		ic10.getEnv().setDeviceProp(props.deviceId, `Slots.${slotIndex}.Quantity`, 0)
	}
})

</script>

<template>
	<div class="slot" @click="visible = true">
		<img loading="lazy" class="item" v-if="item?.image" :src="item.image" :alt="item.PrefabName"/>
		<img loading="lazy" class="back" v-else-if="image" :src="image" :alt="props.data.SlotType"/>
		<span class="id">{{ props.data.SlotIndex }}</span>
		<span class="count">{{ itemCount }}</span>
	</div>
	<Dialog v-model:visible="visible" modal :header="`Edit slot ${props.data.SlotIndex}` " :style="{ width: '25rem' }">
		<div class="flex flex-column gap-2">
			<InputGroup>
				<ItemSelect v-model="item"/>
				<Button severity="danger" icon="pi pi-minus-circle" @click="item = null"/>
			</InputGroup>
		</div>
		<div class="flex flex-column gap-2">
			<InputNumber v-model="itemCount"/>
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
