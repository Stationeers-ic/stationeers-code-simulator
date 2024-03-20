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
	<template v-for="(value, id) in props.device">
		<div class="flex gap-1">
			<span>{{ id }}:</span>
			<span>{{ value }}</span>
		</div>
	</template>
</template>

<style scoped lang="scss">

</style>
