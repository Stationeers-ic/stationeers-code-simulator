<script setup lang="ts">
import {onMounted, ref, watch} from "vue"
import {setLocale} from "../i18n.ts"
import {useI18n} from "vue-i18n"

const props = defineProps<{ short?: boolean }>()

const i18n = useI18n()
const lang = ref<languages | undefined>()
const loading = ref<boolean>(false)
const languages = ref(__LanguageSelector__)

watch(lang, (newVal) => {
	loading.value = true
	setTimeout(() => {
		switchLang(newVal).then(async () => {
			loading.value = false
		})
	}, 200)
})

async function switchLang(newVal: languages | undefined) {
	if (newVal) {
		await setLocale(window.i18n, newVal.code)
		window.localStorage.setItem("language", newVal.code)
	}
}

onMounted(() => {
	lang.value = languages.value.find((i) => {
		return i.code === i18n.locale.value
	})
})
</script>

<template>
	<Dropdown :class="{ short: !props.short }" v-model="lang" :loading="loading" :options="languages" optionLabel="code" filter placeholder="Select a language">
		<template #value="slotProps">
			<div v-if="slotProps.value" class="flex align-items-center">
				<img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 ${slotProps.value.flag}`" style="width: 18px" />
				<div v-if="!props.short">{{ slotProps.value.name }}</div>
			</div>
			<span v-else>{{ slotProps.placeholder }}</span>
		</template>
		<template #option="slotProps">
			<div class="flex align-items-center">
				<img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 ${slotProps.option.flag}`" style="width: 18px" />
				<div v-if="!props.short">{{ slotProps.option.name }}</div>
				<span class="lang" v-if="!props.short && slotProps.option.translated_percent < 95">{{ slotProps.option.translated_percent }}%</span>
			</div>
		</template>
	</Dropdown>
</template>

<style scoped lang="scss">
.short {
	width: 100% !important;
}

.lang {
	right: 0;
	position: absolute;
	color: var(--text-color-secondary) !important;
}
</style>
