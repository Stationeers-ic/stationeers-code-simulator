<script setup lang="ts">
import {getCurrentInstance, onMounted} from "vue";
import ic10 from "../../core/ic10.ts";

const props = defineProps(['device'])

const instance = getCurrentInstance();
onMounted(async () => {
	//@ts-ignore
	ic10.getEnv().on('update', () => {
		instance?.proxy?.$forceUpdate();
	})
})

</script>

<template>
	<template v-for="(_value, id) in props.device">
		<InputGroup>
			<InputGroupAddon style="width:10em">{{ id }}</InputGroupAddon>
			<InputNumber style="width:15em" v-model="props.device[id]"  placeholder="Value"/>
		</InputGroup>
	</template>
</template>

<style scoped lang="scss">

</style>
