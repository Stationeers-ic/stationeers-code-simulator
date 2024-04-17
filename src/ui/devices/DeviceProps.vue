<script setup lang="ts">
import {getCurrentInstance, onMounted} from "vue"
import ic10 from "../../core/ic10.ts"

const props = defineProps(["id", "device"]) as Readonly<{ id: string; device: Record<string, number | object> }>

const instance = getCurrentInstance()
onMounted(async () => {
	ic10.getEnv().on("update", () => {
		instance?.proxy?.$forceUpdate()
	})
})

function remove(id: string) {
	delete props.device[id]
}

const blackList = new Set(["PrefabHash", "Slots", "Connections", 'ReferenceId'])
</script>

<template>
	<InputGroup class="prop">
		<InputGroupAddon class="key">ReferenceId</InputGroupAddon>
		<InputText class="val" :disabled="true" :useGrouping="false" v-model="props.id" placeholder="Value"/>
		<Button class="btn" :disabled="true" size="small" severity="secondary"/>
	</InputGroup>
	<InputGroup class="prop">
		<InputGroupAddon class="key">PrefabHash</InputGroupAddon>
		<InputNumber :minFractionDigits="0" :maxFractionDigits="20" class="val" :disabled="true" :useGrouping="false" v-model="props.device.PrefabHash as number" placeholder="Value"/>
		<Button class="btn" :disabled="true" size="small" severity="secondary"/>
	</InputGroup>
	<template v-for="(value, id) in props.device">
		<InputGroup v-if="!blackList.has(id) && typeof value === 'number'" class="prop">
			<InputGroupAddon class="key">{{ id }}</InputGroupAddon>
			<InputNumber :minFractionDigits="0" :maxFractionDigits="20" class="val" :useGrouping="false" v-model="props.device[id] as number" placeholder="Value"/>
			<Button class="btn" @click="() => remove(id)" size="small" severity="danger" icon="pi pi-minus-circle"/>
		</InputGroup>
	</template>
</template>

<style scoped lang="scss"></style>
