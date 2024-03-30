<script setup lang="ts">
import {Device} from "../../../core/Data.ts";
import Slot from "./Slot.vue";
// import {ref} from "vue";

const props = defineProps(['id', 'device', 'deviceData']) as Readonly<{
	id: string,
	device: Record<string, number>,
	deviceData: Device
}>
</script>

<template>
	<div class="slots">
		<template v-for="(value,_id) in props.deviceData?.slots || []">
			<Slot :deviceId="id" :data="value" />
		</template>
	</div>
</template>
<style scoped lang="scss">
.slots {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

</style>
