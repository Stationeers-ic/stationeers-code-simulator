<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"
import { getActiveSaveSlot, getScriptNames, removeFromBrowser, setActiveSaveSlot } from "../core/Save.ts"
import { off, on } from "../core/Events.ts"

const visible = defineModel<boolean>()
const saves = ref<Array<{ name: string }>>([])
const active = ref<string | null>(null)
const update = () => {
	saves.value = Array.from(getScriptNames()).map((name) => {
		return { name: name }
	})
	active.value = getActiveSaveSlot()
}

onMounted(() => {
	update()
	on("saveUpdate", update)
})
onBeforeUnmount(() => {
	off("saveUpdate", update)
})

const setActive = async () => {
	if (active.value) {
		await setActiveSaveSlot(active.value)
	}
}

const remove = (event: any, name: string) => {
	event.preventDefault()
	removeFromBrowser(name)
}
</script>

<template>
	<div class="settingButton" @click="visible = true" />
	<div class="card flex justify-content-center">
		<Sidebar v-model:visible="visible" header="Saves">
			<Listbox v-model="active" :options="saves" @change="setActive" filter optionLabel="name" optionValue="name" empty-message="No saves" empty-filter-message="Saves not found" filter-placeholder="Search save">
				<template #option="slotProps">
					<div class="saveItem">
						<div>{{ slotProps.option.name }}</div>
						<Button icon="pi pi-minus-circle" severity="danger" @click="remove($event, slotProps.option.name)" />
					</div>
				</template>
			</Listbox>
		</Sidebar>
	</div>
</template>

<style scoped lang="scss">
.settingButton {
	position: fixed;
	width: 10px;
	height: 200px;
	color: #020617;
	background: #34d399;
	border: 1px solid #34d399;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
	border-radius: 0 20px 20px 0;

	&:before {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		content: ">";
	}

	&:hover {
		background: #6ee7b7;
		color: #020617;
		border-color: #6ee7b7;
	}
}
.saveItem {
	display: flex;
	justify-content: space-between;
	.pi-minus-circle {
		color: #f87171;
	}
}
</style>
