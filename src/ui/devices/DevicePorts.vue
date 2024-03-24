<script setup lang="ts">
import {getCurrentInstance, onMounted, ref} from "vue";
import ic10 from "../../core/ic10.ts";

const props = defineProps(['id'])
const ports = ref<string[]>([])

const instance = getCurrentInstance();
onMounted(async () => {
	ic10.getEnv().on('update', () => {
		instance?.proxy?.$forceUpdate();
	})

})
ports.value = [];
['db', 'd0', 'd1', 'd2', 'd3', 'd4', 'd5'].forEach((port) => {
	if (ic10.getEnv().devicesAttached.get(port) === props.id) {
		ports.value.push(port)
		ic10.getEnv().reverseAlias(port).forEach((p) => {
			ports.value.push(p)
		})
	}
})

</script>

<template>
	<div :class="$style.ports">
		<template v-for="port in ports">
			<Chip severity="secondary" :label="port"/>
		</template>
	</div>
</template>

<style module lang="scss">
.ports {
	display: flex;
	flex-direction: row;
	gap: 5px;
	margin-bottom: 5px;
}
</style>
