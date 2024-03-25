<script setup lang="ts">
import {getCurrentInstance, onMounted} from "vue";
import ic10 from "../../core/ic10.ts";

const props = defineProps(['device']) as Readonly<{ device: Record<string, number> }>

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
	<template v-for="(_value, id) in props.device">
		<InputGroup>
			<InputGroupAddon style="width:10em">{{ id }}</InputGroupAddon>
			<InputNumber
				:disabled="id === 'PrefabHash'"
				:useGrouping="false"
				style="width:15em"
				v-model="props.device[id]"
				placeholder="Value"
			/>
			<Button :disabled="id === 'PrefabHash'" @click="()=>remove(id)" style="width:2em" size="small"
					severity="danger" icon="pi pi-minus-circle"/>
		</InputGroup>
	</template>
</template>

<style scoped lang="scss">

</style>
