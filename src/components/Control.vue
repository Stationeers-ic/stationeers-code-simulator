<script setup lang="ts">
import { ref, watch } from "vue"
import ToggleButton from "primevue/togglebutton"
import InputGroup from "primevue/inputgroup"
import Button from "primevue/button"
import ic10 from "../core/ic10.ts"
import { str as hash } from "crc-32"
import { settingStore } from "../store"
import AddDevice from "../ui/AddDevice.vue"
import clipboard from "web-clipboard"
import { emit } from "../core/Events.ts"
import { MenuItem } from "primevue/menuitem"
import { getShareLink } from "../core/Save.ts"
import { useToast } from "primevue/usetoast"
import { start } from "../core/Tour.ts"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const checked = ref(false)
const hashText = ref("")
const op = ref()
const toast = useToast()

watch(checked, (newVal) => {
	if (newVal) {
		console.log("Run")
		ic10.run()
			.then((e) => {
				console.log("Run finished", e, ic10.getEnv().getPosition())
				checked.value = false
			})
			.catch((e) => {
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
	if (t === false || t === "EOF") {
		// ic10.getEnv().emit('update')
	}
	if (t === "ERR") {
		// ic10.getEnv().emit('update')
	}
}
const copy = () => {
	clipboard.write(getShareLink())
	toast.add({ severity: "success", summary: "Share", detail: "Copied to clipboard", life: 3000 })
}
const goto = () => {
	ic10.getEnv().yieldMode = true
	ic10.getEnv().once("before_yield", () => {
		ic10.getEnv().yieldMode = false
		checked.value = false
	})
	checked.value = true
}
const speerOptions = [t("control.slow"), t("control.normal"), t("control.fast")]

const toggle = (event: any) => {
	op.value.toggle(event)
}
const FileMenu = ref<MenuItem[]>([
	{
		label: t("control.save"),
		icon: "pi pi-save",
		command: () => {
			emit("save")
			op.value.hide()
		},
		shortcut: "⌘+S",
		title: "Ctrl+S",
	},
	{
		label: t("control.saveAs"),
		icon: "pi pi-file-export",
		command: () => {
			emit("saveDialogOpen")
			op.value.hide()
		},
		shortcut: "⌘+⇧+S",
		title: "Ctrl+Shift+S",
	},
	{
		label: t("control.open"),
		icon: "pi pi-file",
		command: () => {
			emit("openDialogOpen")
			op.value.hide()
		},
		shortcut: "⌘+O",
		title: "Ctrl+O",
	},
	{
		label: t("control.load"),
		icon: "pi pi-list",
		command: () => {
			emit("openSetting")
			op.value.hide()
		},
	},
	{
		separator: true,
	},
	{
		label: t("control.share"),
		icon: "pi pi-share-alt",
		command: () => {
			copy()
			op.value.hide()
		},
	},
])

function startTour() {
	start()
}
</script>

<template>
	<header :class="[$style.control, 'control']" id="tour-headers">
		<InputGroup style="width: auto">
			<Button id="tour-File" icon="pi pi-save" :label="$t('control.file')" @click="toggle" severity="secondary" />
			<OverlayPanel ref="op">
				<TieredMenu :model="FileMenu" id="FileMenu">
					<template #item="{ item, props, hasSubmenu }">
						<a v-ripple class="flex align-items-center" v-bind="props.action" :title="item?.title ?? ''">
							<span :class="item.icon" />
							<span class="ml-2">{{ item.label }}</span>
							<Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
							<span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
							<i v-if="hasSubmenu" class="pi pi-angle-right ml-auto"></i>
						</a>
					</template>
				</TieredMenu>
			</OverlayPanel>
			<ToggleButton id="tour-run" v-model="checked"
						  :style="{width: `${Math.max($t('control.stop').length,$t('control.run').length) +1}em`}"
						  :onLabel="$t('control.stop')" :offLabel="$t('control.run')" onIcon="pi pi-stop"
						  offIcon="pi pi-play" />
			<Button id="tour-step" icon="pi pi-step-forward" @click="step" :label="$t('control.step')" />
			<Button id="tour-goto" icon="pi pi-step-forward" @click="goto" severity="help" :label="$t('control.toYield')" />
			<Button id="tour-reset" icon="pi pi-refresh" @click="reset" severity="warning" :label="$t('control.reset')" />
			<AddDevice id="AddDevice" />
			<Button id="tour-help" icon="pi pi-question-circle" severity="secondary" @click="startTour" />
		</InputGroup>
		<div :class="$style.slider" id="speedControl">
			<SelectButton v-model="settingStore.delay" :options="speerOptions" aria-labelledby="basic" />
		</div>
		<div id="hashConverter">
			<InputGroup style="width: auto; height: 40px">
				<Button icon="pi pi-hashtag" @click="convert" :label="$t('control.convert')" />
				<InputText
					:placeholder="$t('control.stringToHash')"
					@focus="($event.target as any).select()"
					id="hashText" v-model="hashText" style="max-width: 200px" />
			</InputGroup>
		</div>
	</header>
</template>

<style module lang="scss">
.control {
	z-index: 999;
	background-color: var(--surface-ground);
	top: 0;
	position: sticky;
	flex-wrap: wrap;
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	gap: 5px;

	* {
		max-height: 40px;
	}
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
