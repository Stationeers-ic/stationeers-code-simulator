<script setup lang="ts">
import {onMounted, ref} from "vue";
import data, {Devices} from "../core/Data.ts";

const loading = ref(true);

const devices = ref<{ name: string, code: number }[]>([]);
const model = defineModel()

onMounted(async () => {
	data.getDevices().then((res: Devices) => {
		res.forEach((d) => {
			devices.value.push({
				name: d.PrefabName,
				code: d.PrefabHash
			})
		})
	}).then(() => {
		loading.value = false
	})
})
</script>

<template>
	<Dropdown style="width: 100%;" editable filter v-model="model" :options="devices" :loading="loading" optionLabel="name" optionValue="code"
			  placeholder="Select a device"
			  class="w-full md:w-14rem"/>
</template>

<style scoped lang="scss">

</style>
