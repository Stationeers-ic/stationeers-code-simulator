<script setup lang="ts">
import ic10 from "../core/ic10.ts"
import StackInput from "../ui/StackInput.vue"
import { onMounted, ref } from "vue"

const props = defineProps<{
	deviceId?: string
	lines?: number
}>()
const lines = props.lines || 2

const stack = ref<number[]>([])
const isDb = props.deviceId == undefined || ic10.getEnv().devicesAttached.get(props.deviceId) === "db"
onMounted(() => {
	if (!isDb && props.deviceId) {
		if (ic10.getEnv().devicesStack.has(props.deviceId)) {
			stack.value = ic10.getEnv().devicesStack.get(props.deviceId) as number[]
		} else {
			stack.value = []
		}
	} else {
		stack.value = ic10.getEnv().stack
	}
})
</script>

<template>
	<div class="stack">
		<VirtualScroller :items="stack" :itemSize="32" :delay="10" class="border-1 surface-border border-round" style="width: 100%; height: 300px">
			<template v-slot:item="{ item, options }">
				<div style="height: 32px">
					<StackInput :active="isDb && options.index === ic10.getEnv().get('r16')" :name="options.index" v-model="stack[options.index]" />
				</div>
			</template>
		</VirtualScroller>
	</div>
</template>
