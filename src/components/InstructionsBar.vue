<script setup lang="ts">
import Listbox from 'primevue/listbox';
import {onMounted, onUnmounted, ref} from 'vue';
import {useI18n} from "vue-i18n"
import Data from '../core/Data';
import {off, on} from "../core/Events.ts";

const { t } = useI18n()
const visible = defineModel<boolean>();
const position = "right";
const items = {};
const i18n = useI18n();
const lang = i18n.locale.value.toUpperCase();
const data = Object.values(await Data.getInstructions());
const selectedOption = ref<Array<number>>();
selectedOption.value = [];

const open = () => {
	visible.value = true;
}
const close = () => {
	visible.value = false;
	// Reset selected options
	selectedOption.value = [];
}

onMounted(() => {
	on("openInstructions", open);
	on("closeInstructions", close);
});

onUnmounted(() => {
	off("openInstructions", open);
	off("closeInstructions", close);
});

function onOptionSelect(instructionProps: { index: number, option: any }) {
	if (selectedOption.value?.includes(instructionProps.index)) {
		selectedOption.value.splice(selectedOption.value.indexOf(instructionProps.index), 1);
	} else {
		selectedOption.value?.push(instructionProps.index);
	}
}
</script>

<template>
	<div class="instructions-button" id="tour-instructions-open" @click="open"></div>
	<div class="card flex justify-content-center"  >
		<Sidebar v-model:visible="visible" :modal="false" header="" v-model:position="position" id="tour-instructions-body">
			<div>
				<Divider>{{ t("ic10") }}</Divider>
			</div>
			<Listbox :options="data" filter :filter-fields="['name', 'description', 'example ']">
				<template #option="instructionProps">
					<div @click="onOptionSelect(instructionProps)" class="tour-instructions-row-open">
						<div>{{ instructionProps.option.name }} <span class="instruction-example">{{ instructionProps.option.example }}</span></div>
						<p v-show="selectedOption?.includes(instructionProps.index)" class="instruction-description">{{ instructionProps.option.description }}</p>
					</div>
				</template>
			</Listbox>
		</Sidebar>
	</div>
</template>

<style scoped lang="scss">
.instructions-button {
	position: fixed;
	width: 10px;
	height: 200px;
	color: #020617;
	background: #2a54ff;
	border: 1px solid #2a54ff;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
	border-radius: 20px 0px 0px 20px;

	&:before {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		content: "<";
	}

	&:hover {
		background: #4368ff;
		color: #020617;
		border-color: #4368ff;
	}
}

.instruction-description {
	font-size: 12px;
	color: gray;
}

.instruction-example {
	font-size: 12px;
	font-style: italic;
	color: gray;
}
</style>
