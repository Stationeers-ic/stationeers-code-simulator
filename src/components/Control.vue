<script setup lang="ts">
import {ref, watch} from 'vue'
import ToggleButton from 'primevue/togglebutton'
import InputGroup from 'primevue/inputgroup'
import Button from 'primevue/button'
import ic10 from "../core/ic10.ts";
import {str as hash} from "crc-32";
import {settingStore} from "../store";
import AddDevice from "../ui/AddDevice.vue";
import {dump} from "../core/Share.ts";
import clipboard from "web-clipboard";

const checked = ref(false)
const hashText = ref("")

watch(checked, (newVal) => {
	if (newVal) {
		console.log("Run")
		ic10.run().then((e) => {
			console.log("Run finished", e, ic10.getEnv().getPosition())
			checked.value = false
		}).catch((e) => {
			console.error("Run error", e)
			checked.value = false
		})
	} else {
		console.log("Run stopped")
		ic10.stop()
	}
})
const convert = () => {
	hashText.value = hash(hashText.value).toString()
	const el = document.getElementById("hashText") as HTMLInputElement
	if (el) {
		el.focus()
	}
}
const reset = () => {
	ic10.getEnv().yieldMode = false
	ic10.getEnv().reset()
	ic10.getEnv().setPosition(0)
	ic10.reset()
}
const step = async () => {
	ic10.getEnv().yieldMode = false
	const t = await ic10.step()
	if (t === false || t === 'EOF') {

		// ic10.getEnv().emit('update')
	}
	if (t === 'ERR') {

		// ic10.getEnv().emit('update')
	}
}
const op = ref();
const data = ref('');
const share = (event: any) => {
	document.location.hash = dump()
	data.value = document.location.href
	op.value.toggle(event);
}
const copy = () => {
	console.log('copy')
	clipboard.write(data.value)
}
const goto = () => {
	ic10.getEnv().yieldMode = true
	ic10.getEnv().once('before_yield', () => {
		ic10.getEnv().yieldMode = false
		checked.value = false
	})
	checked.value = true
}

const speerOptions = ['slow', 'normal', 'fast']

</script>

<template>
	<header :class="[$style.control, 'control']">
		<InputGroup style="width:auto">
			<ToggleButton
				v-model="checked"
				style="width: 6em"
				onLabel="Stop"
				offLabel="Run "
				onIcon="pi pi-stop"
				offIcon="pi pi-play"
			/>
			<Button icon="pi pi-step-forward" @click="step" label="Step"/>
			<Button icon="pi pi-step-forward" @click="goto" severity="help" label="To Yield"/>
			<Button icon="pi pi-refresh" @click="reset" severity="warning" label="Reset"/>
			<AddDevice id="AddDevice"/>
			<Button icon="pi pi-share-alt" @click="share" severity="secondary"/>
			<OverlayPanel ref="op">
				<div class="flex flex-column gap-3 w-25rem">
					<div>
						<span class="font-medium text-900 block mb-2">Share</span>
						<InputGroup>
							<InputText :value="data" readonly
									   class="w-25rem"></InputText>
							<Button icon="pi pi-copy" @click="copy"/>
						</InputGroup>
					</div>
				</div>
			</OverlayPanel>
		</InputGroup>

		<div :class="$style.slider">
			<SelectButton v-model="settingStore.delay" :options="speerOptions" aria-labelledby="basic"/>
		</div>
		<InputGroup style="width:auto">
			<Button icon="pi pi-hashtag" @click="convert" label="Convert"/>
			<InputText placeholder="String to Hash" @focus="($event.target as any).select()" id="hashText"
					   v-model="hashText" style="max-width: 200px"/>
		</InputGroup>
	</header>
</template>

<style module lang="scss">
.control {
	z-index:999;
	background-color: #121212;
	top: 0;
	position: sticky;
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	gap: 5px;
}

.slider {
	height: 100%;
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	flex-direction: row;
	justify-content: center;
}

.dial {
	position: fixed;
	bottom: 15px;
	left: 15px;

	a {
		text-decoration: none;
	}
}
</style>
