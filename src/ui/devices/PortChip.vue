<script setup lang="ts">
const { port } = defineProps<{ port: string }>()
const emit = defineEmits(["remove"])

function detach() {
	emit("remove", port)
}
</script>
}

<template>
	<Chip v-if="['db', 'd0', 'd1', 'd2', 'd3', 'd4', 'd5'].includes(port)" :label="port" removable @remove="() => detach()" />
	<Chip v-else :label="port" />
</template>

<style scoped lang="scss"></style>
