<script setup lang="ts">
import { codeStore } from "../store"
import { Codemirror } from "vue-codemirror"
import { hoverOptions, ic10, ic10HoverTooltip, ic10Snippets } from "codemirror-lang-ic10"
import interpretator from "../core/ic10.ts"
import { Device, Register } from "ic10/zodTypes"
import { onBeforeUnmount, onMounted, watch } from "vue"

onMounted(() => {
	codeStore.code = interpretator.code
	interpretator.getEnv().on("update_code", () => {
		codeStore.code = interpretator.code
	})
})
onBeforeUnmount(() => {
	interpretator.getEnv().off("update")
})

watch(
	() => codeStore.code,
	(newVal) => interpretator.setCode(newVal),
)

watch(
	() => interpretator.getEnv().line,
	(newVal) => {
		window.document
			.querySelector<HTMLDivElement>('div[data-language="ic10"]')
			?.querySelectorAll<HTMLDivElement>("div.cm-line")
			.forEach((e, i) => {
				if (i === newVal) {
					e.style.backgroundColor = "rgb(0 0 0 / 40%)"
					// e.scrollIntoView({block: "end", inline: "nearest"});
				} else {
					e.style.backgroundColor = "transparent"
				}
			})
	},
)

const opt: hoverOptions = {
	startLine: 0,
	callback: (word: string, text: string | null, line): string | null => {
		const env = interpretator.getEnv()
		let new_text = null
		const unAlias = env.getAlias(word, true)
		if (Device.safeParse(unAlias).success) {
			new_text = env.isPortConnected(unAlias) ? "🟢 connected" : "🔴 disconnected"
		} else if (Register.safeParse(unAlias).success) {
			new_text = env.get(unAlias)
		} else {
			const l = env.getLine(line - 1)
			if (l) {
				let label: string | undefined = undefined
				let deviceId: string | undefined = undefined
				let prop: string | undefined = undefined
				let unAlias: string | undefined = undefined
				switch (l.fn) {
					case "s":
						label = l.args[0].toString()
						unAlias = env.getAlias(label, true)
						deviceId = env.devicesAttached.get(unAlias)
						prop = l.args[1].toString()
						break
					case "l":
						label = l.args[1].toString()
						unAlias = env.getAlias(label, true)
						deviceId = env.devicesAttached.get(unAlias)
						prop = l.args[2].toString()
						break
					case "sd":
						label = l.args[0].toString()
						deviceId = label
						prop = l.args[1].toString()
						break
					case "ld":
						label = l.args[1].toString()
						deviceId = label
						prop = l.args[2].toString()
						break
				}
				if (deviceId && prop) {
					new_text = `${label}[${prop}] = ` + env.getDeviceProp(deviceId, prop)
				}
			}
		}
		if (new_text) {
			if (!text) {
				return new_text.toString()
			} else {
				return text + "\n" + new_text.toString()
			}
		}
		return text
	},
}

const extensions = [ic10(), ic10Snippets(), ic10HoverTooltip(opt)]
</script>

<template>
	<Codemirror ref="" v-model="codeStore.code" :style="{ height: '100%' }" :autofocus="true" :indent-with-tab="true" :tab-size="2" :lineNumberFormatter="(line: number) => line - 1" :extensions="extensions" />
</template>

<style scoped lang="scss">
.code-mirror {
	height: 100%;
	overflow: auto;
	grid-area: code-mirror;
}
</style>
