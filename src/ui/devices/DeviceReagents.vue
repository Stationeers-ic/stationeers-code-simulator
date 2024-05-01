<script setup lang="ts">
// import {ref} from "vue";

import { onMounted, ref } from "vue"
import data, { Reagents } from "../../core/Data.ts"

const props = defineProps(["id", "device"]) as Readonly<{
	id: string
	device: {
		Reagents: Record<any, number>
	}
}>
const loading = ref(true)
const reagents = ref<Reagents>([])
const items = ref<{ name: string; image: string | null; value: number }[]>([])

onMounted(async () => {
	reagents.value = await data.getReagents()
	reagents.value.forEach((d) => {
		if (typeof props.device.Reagents === "undefined") {
			props.device.Reagents = {}
		} else if (typeof props.device.Reagents[d.hash] === "undefined") {
			props.device.Reagents[d.hash] ?? 0
		}
		props.device.Reagents[d.hash] = props.device.Reagents[d.hash] ?? 0
		items.value.push({
			name: d.name,
			image: d.items[0].image,
			value: d.hash,
		})
	})
	loading.value = false
})
</script>

<template>
	<div class="reagents">
		<template v-for="value in items">
			<div class="reagent">
				<InputGroup class="prop">
					<InputGroupAddon>
						<img
							loading="lazy"
							:alt="value.name"
							:src="value.image ? value.image : 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'"
							style="width: 18px"
						/>
					</InputGroupAddon>
					<InputGroupAddon class="key">{{ value.name }}</InputGroupAddon>
					<InputNumber
						:minFractionDigits="0"
						:maxFractionDigits="20"
						class="val"
						:useGrouping="false"
						v-model="props.device.Reagents[value.value.toString()]"
						placeholder="Value"
					/>
				</InputGroup>
			</div>
		</template>
	</div>
</template>
<style scoped lang="scss">
.reagents {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	padding-right: 5px;
	max-height: 300px;
	overflow: auto;
}
</style>
