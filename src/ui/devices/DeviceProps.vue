<script setup lang="ts">
import {getCurrentInstance, onMounted} from "vue";
import ic10 from "../../core/ic10.ts";

const props = defineProps(['id', 'device']) as Readonly<{ id: string, device: Record<string, number> }>

const instance = getCurrentInstance();
onMounted(async () => {

	ic10.getEnv().on('update', () => {
		instance?.proxy?.$forceUpdate();
	})
})

function remove(id: string) {
	delete props.device[id]
}

</script>

<template>
	<InputGroup class="prop">
		<InputGroupAddon class="key">id</InputGroupAddon>
		<InputText
			class="val"
			:disabled="true"
			:useGrouping="false"
			v-model="props.id"
			placeholder="Value"
		/>
		<Button class="btn" :disabled="true" size="small" severity="secondary"/>
	</InputGroup>
	<InputGroup class="prop">
		<InputGroupAddon class="key">PrefabHash</InputGroupAddon>
		<InputNumber
			class="val"
			:disabled="true"
			:useGrouping="false"
			v-model="props.device.PrefabHash"
			placeholder="Value"
		/>
		<Button class="btn" :disabled="true" size="small" severity="secondary"/>
	</InputGroup>
	<template v-for="(_value, id) in props.device">
		<InputGroup v-if="id !== 'PrefabHash'" class="prop">
			<InputGroupAddon class="key">{{ id }}</InputGroupAddon>
			<InputNumber
				class="val"
				:useGrouping="false"
				v-model="props.device[id]"
				placeholder="Value"
			/>
			<Button class="btn" @click="()=>remove(id)" size="small"
					severity="danger" icon="pi pi-minus-circle"/>
		</InputGroup>
	</template>
</template>

<style scoped lang="scss">

</style>
