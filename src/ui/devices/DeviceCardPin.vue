<script setup lang="ts">
import { inject } from "vue"
import DeviceCard from "./DeviceCard.vue"

const dialogRef = inject<any>("dialogRef")
const props = dialogRef.value.data
console.log(props)
</script>
<template>
	<div class="pinned-device">
		<DeviceCard :id="props.id" :device="props.device" :isPin="true" />
	</div>
</template>
<style scoped lang="scss">
.pinned-device {
	.device-card {
		width: 100% !important;
		padding: 0 !important;
		margin: 0 !important;
	}
}
</style>
