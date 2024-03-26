<script setup lang="ts">
import {getCurrentInstance, onMounted} from "vue";
import ic10 from "../../core/ic10.ts";

const props = defineProps(['id','device']) as Readonly<{ id:string,device: Record<string, number> }>

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
	<InputGroup>
		<InputGroupAddon style="width:10em">id</InputGroupAddon>
		<InputNumber
			:disabled="true"
			:useGrouping="false"
			style="width:15em"
			:model-value="props.id"
			placeholder="Value"
		/>
		<Button :disabled="true" style="width:2em" size="small"	severity="secondary"/>
	</InputGroup>
	<InputGroup>
		<InputGroupAddon style="width:10em">PrefabHash</InputGroupAddon>
		<InputNumber
			:disabled="true"
			:useGrouping="false"
			style="width:15em"
			:model-value="props.device.PrefabHash"
			placeholder="Value"
		/>
		<Button :disabled="true" style="width:2em" size="small"	severity="secondary"/>
	</InputGroup>
	<template v-for="(_value, id) in props.device">
		<InputGroup v-if="id !== 'PrefabHash'">
			<InputGroupAddon style="width:10em">{{ id }}</InputGroupAddon>
			<InputNumber
				:useGrouping="false"
				style="width:15em"
				v-model="props.device[id]"
				placeholder="Value"
			/>
			<Button @click="()=>remove(id)" style="width:2em" size="small"
					severity="danger" icon="pi pi-minus-circle"/>
		</InputGroup>
	</template>
</template>

<style scoped lang="scss">

</style>
