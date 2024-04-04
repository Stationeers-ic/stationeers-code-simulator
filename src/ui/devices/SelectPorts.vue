<script setup lang="ts">
import ic10 from "../../core/ic10.ts"

const model = defineModel()
const ports = [
	{ name: "DB", code: "db" },
	{ name: "D0", code: "d0" },
	{ name: "D1", code: "d1" },
	{ name: "D2", code: "d2" },
	{ name: "D3", code: "d3" },
	{ name: "D4", code: "d4" },
	{ name: "D5", code: "d5" },
]
</script>

<template>
	<FloatLabel>
		<MultiSelect id="devicePin" v-model="model" :options="ports" optionLabel="name" placeholder="No connected" display="chip" optionValue="code">
			<template #option="slotProps">
				<div class="flex align-items-center">
					<div style="padding-right: 5px">
						<i class="pi pi-circle-fill" style="font-size: 0.6em" v-if="ic10.getEnv().devicesAttached.has(slotProps.option.code)"></i>
						<i class="pi pi-circle" style="font-size: 0.6em" v-else></i>
					</div>
					<div>{{ slotProps.option.name }}</div>
				</div>
			</template>
		</MultiSelect>
		<label for="deviceName">IC Pin</label>
	</FloatLabel>
</template>

<style scoped lang="scss"></style>
