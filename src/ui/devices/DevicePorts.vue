<script setup lang="ts">
import {getCurrentInstance, onMounted} from "vue";
import ic10 from "../../core/ic10.ts";

const props = defineProps(['id'])

const instance = getCurrentInstance();
onMounted(async () => {
	//@ts-ignore
	ic10.getEnv().on('update', () => {
		instance?.proxy?.$forceUpdate();
	})
})

</script>

<template>
	<div :class="$style.ports">
		<template v-for="port in ['db', 'd0','d1', 'd2', 'd3', 'd4', 'd5' ]">
			<span v-if="ic10.getEnv().devicesAttached.get(port) === props.id">{{ port }}</span>
		</template>
	</div>
</template>

<style module lang="scss">
.ports {
	display: flex;
	flex-direction: row;
	gap: 5px;
}
</style>
