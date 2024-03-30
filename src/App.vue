<script setup lang="ts">
import CodeMirror from "./components/Code-mirror.vue"
import Errors from "./components/Errors.vue"
import Control from "./components/Control.vue"
import Register from "./components/Register.vue"
import Stack from "./components/Stack.vue"
import Raw from "./components/Raw.vue"
import Devises from "./components/Devises.vue"
import {onMounted, ref, watch} from "vue"
import isHotkey from "is-hotkey"
import {dump, load} from "./core/Share.ts"
import {useToast} from "primevue/usetoast"
import {MenuItem} from "primevue/menuitem"
import ButtonFrame from "./ui/ButtonFrame.vue"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)
const isSaveHotkey = isHotkey("mod+s")
const lastDump = ref("")
const toast = useToast()

onMounted(() => {
	window.document.addEventListener("keydown", (e) => {
		if (isSaveHotkey(e)) {
			e.preventDefault()
			console.log("save")
			try {
				lastDump.value = dump()
				document.location.hash = lastDump.value
			} catch (e: any) {
				toast.add({ severity: "error", summary: "Error", detail: e?.message, life: 3000 })
			}
		}
	})
})
watch(
	() => document.location.hash,
	() => {
		if (lastDump.value !== document.location.hash) {
			load(document.location.hash.slice(1)).catch((e) => {
				toast.add({ severity: "error", summary: "Error", detail: e.message, life: 3000 })
			})
		}
	},
)
if (document.location.hash.slice(1).length > 0) {
	load(document.location.hash.slice(1)).catch((e) => {
		toast.add({ severity: "error", summary: "Error", detail: e.message, life: 3000 })
	})
}

const social = ref<MenuItem[]>([
	{
		label: "Github",
		icon: "pi pi-github",
		command() {
			window.open("https://github.com/Stationeers-ic/stationeers-code-simulator", "_blank")
		},
	},
	{
		label: "Plausible",
		icon: "pi pi-plausible",
		command() {
			window.open("https://thor.traineratwot.site/ic10.dev", "_blank")
		},
	},
])
const ic10 = __package__.dependencies?.ic10?.version
const codemirrorLangIc10 = __package__.dependencies?.["codemirror-lang-ic10"]?.version
const buildTime = dayjs(__buildTime__).fromNow()
</script>

<template>
	<Toast />
	<div class="app-container">
		<div class="code">
			<Splitter style="height: 100%">
				<SplitterPanel :size="70" :min-size="10">
					<Splitter layout="vertical">
						<SplitterPanel :size="90" :min-size="10">
							<CodeMirror></CodeMirror>
						</SplitterPanel>
						<SplitterPanel :size="10" :min-size="10">
							<Errors></Errors>
						</SplitterPanel>
					</Splitter>
				</SplitterPanel>
				<SplitterPanel :size="30" :min-size="10">
					<Register></Register>
				</SplitterPanel>
			</Splitter>
		</div>
		<Control></Control>
		<Stack></Stack>
		<div class="bottom">
			<Raw></Raw>
			<Devises></Devises>
		</div>
	</div>

	<!--	<SpeedDial :model="social" :radius="120" show-icon="pi pi-external-link"-->
	<!--			   :tooltip-options="{event:'hover',position:'right'}" :transitionDelay="80" direction="up"-->
	<!--			   :class="$style.social"/>-->
	<div :class="$style.rightButtons">
		<template v-for="item in social">
			<ButtonFrame :label="item.label" :icon="item.icon" size="large" :click="item.command" severity="info" />
		</template>
		<ButtonFrame icon="pi pi-discord" severity="info">
			<iframe
				loading="lazy"
				src="https://discord.com/widget?id=848153816263295006&theme=dark"
				width="350"
				height="500"
				allowtransparency="true"
				frameborder="0"
				sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
			></iframe>
		</ButtonFrame>

		<ButtonFrame icon="pi pi-kofi" severity="info">
			<iframe
				id="kofiframe"
				src="https://ko-fi.com/aidan647/?hidefeed=true&widget=true&embed=true&preview=true"
				style="border: none; width: 100%; padding: 4px; background: #f9f9f9"
				height="712"
				title="aidan647"
			>
			</iframe>
		</ButtonFrame>
	</div>
	<footer>
		<div class="flex flex-row gap-1" :class="$style.footer">
			<div><a href="https://www.npmjs.com/package/ic10">ic10</a>: {{ ic10 }}</div>
			<span>|</span>
			<div>
				<a href="https://www.npmjs.com/package/codemirror-lang-ic10">codemirror-lang-ic10</a>:
				{{ codemirrorLangIc10 }}
			</div>
			<!--			<span>|</span>-->
		</div>
		<div :class="$style.build">Build: {{ buildTime }}</div>
	</footer>
</template>
<style scoped>
footer {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
}
</style>
<style module lang="scss">
.footer {
	width: 50%;
	opacity: 0.5;

	a {
		color: unset;
	}
}
.build {
	width: auto;
	opacity: 0.5;
}

.code {
	height: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 128px;
	gap: 5px 5px;
	grid-auto-flow: row;
	grid-template-areas:
		"code-mirror"
		"errors";
}

.rightButtons {
	position: fixed;
	bottom: 20px;
	right: 20px;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	flex-wrap: nowrap;
	align-items: center;
}

.social {
	position: fixed;
	bottom: 20px;
	left: 20px;

	a {
		text-decoration: none;
	}
}
</style>
