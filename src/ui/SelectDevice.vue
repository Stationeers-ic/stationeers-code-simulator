<script setup lang="ts">
import {onMounted, ref} from "vue"
import data, {Devices} from "../core/Data.ts"

const loading = ref(true)
const devices = ref<{ name: string; image: string | null; code: number }[]>([])
const model = defineModel()

onMounted(async () => {
	data.getDevices()
		.then((res: Devices) => {
			res.forEach((d) => {
				let name = d.Title + " [" + d.PrefabName + "]"
				if (window.userLang === "en") {
					name = d.Title
				}
				devices.value.push({
					name: name,
					image: d.image,
					code: d.PrefabHash,
				})
			})
		})
		.then(() => {
			loading.value = false
		})
})
</script>

<template>
	<Dropdown
		style="width: 100%"
		editable
		filter
		v-model="model"
		:options="devices"
		:loading="loading"
		optionLabel="name"
		optionValue="code"
		:placeholder="$t('addDevice.selectDevice')"
		class="w-full md:w-14rem"
	>
		<template #option="slotProps">
			<div class="flex align-items-center gap-1">
				<img
					loading="lazy"
					:alt="slotProps.option.name"
					:src="slotProps.option.image ? slotProps.option.image : 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'"
					style="width: 18px"
				/>
				<div :title="slotProps.option.code">{{ slotProps.option.name }}</div>
			</div>
		</template>
	</Dropdown>
</template>

<style scoped lang="scss"></style>
