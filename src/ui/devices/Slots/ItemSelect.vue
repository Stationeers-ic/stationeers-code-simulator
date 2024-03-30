<script setup lang="ts">
import {onMounted, ref} from "vue"
import data, {Item, Items} from "../../../core/Data.ts"

const model = defineModel<Item | null>()
const loading = ref(true)
const items = ref<{ name: string; image: string | null; value: Item }[]>([])

onMounted(async () => {
	data.getItems()
		.then((res: Items) => {
			res.forEach((d) => {
				items.value.push({
					name: d.PrefabName,
					image: d.image,
					value: d,
				})
			})
		})
		.then(() => {
			loading.value = false
		})
})
</script>

<template>
	<InputGroup>
		<InputGroupAddon>
			<img loading="lazy" v-if="model?.image" :src="model.image" alt="" width="16" />
		</InputGroupAddon>
		<Dropdown
			style="width: 100%"
			editable
			filter
			v-model="model"
			:options="items"
			:loading="loading"
			optionLabel="name"
			optionValue="value"
			placeholder="Select a device"
			class="w-full md:w-14rem"
		>
			<template #option="slotProps">
				<div class="flex align-items-center gap-1">
					<img
						loading="lazy"
						:alt="slotProps.option.name"
						:src="
							slotProps.option.image
								? slotProps.option.image
								: 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
						"
						style="width: 18px"
					/>
					<div :title="slotProps.option.code">{{ slotProps.option.name }}</div>
				</div>
			</template>
		</Dropdown>
	</InputGroup>
</template>

<style scoped lang="scss"></style>
