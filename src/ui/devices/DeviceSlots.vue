<script setup lang="ts">
import {Device} from "../../core/Data.ts";
// import {ref} from "vue";

const props = defineProps(['id', 'device', 'deviceData']) as Readonly<{
	id: string,
	device: Record<string, number>,
	deviceData: Device
}>
</script>

<template>
	<div class="slots">
		<template v-for="(value, id) in props.deviceData?.slots || []">
			<div class="slot"></div>
		</template>
	</div>
</template>

<style scoped lang="scss">
.slots {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.slot {
	width: 50px;
	height: 50px;
	box-shadow: 1px 1px 3px 3px black;
}
</style>
