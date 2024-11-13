import {nextTick} from "vue"
import {createI18n, I18n, I18nOptions} from "vue-i18n"
import {Data} from "./core/Data.ts"

export const supportedLanguage = (locale: unknown): locale is (typeof __languages__)[number] => {
	//@ts-ignore
	return __languages__.includes(locale)
}
export const setupI18n: typeof createI18n = (options: I18nOptions = { locale: "en" }) => {
	const i18n = createI18n(options)
	setI18nLanguage(i18n, options.locale)
	return i18n
}

export function setI18nLanguage(i18n: I18n, locale?: string) {
	if (!supportedLanguage(locale)) {
		return console.warn(`Locale ${locale} is not supported.`)
	}
	if (typeof i18n.global.locale === "string") {
		i18n.global.locale = locale
	} else {
		i18n.global.locale.value = locale
	}
	document.querySelector("html")?.setAttribute("lang", locale)
}

export async function loadLocaleMessages(i18n: I18n, locale?: string) {
	if (!supportedLanguage(locale)) {
		return console.warn(`Locale ${locale} is not supported.`)
	}
	// load locale messages with dynamic import
	const messages = await import(/* webpackChunkName: "locale-[request]" */ `./locales/${locale}/index.json`)
	console.log(messages)
	// set locale and locale message
	i18n.global.setLocaleMessage(locale, messages.default)

	return nextTick()
}
const loadedLocales: (typeof __languages__)[number][] = ["en"]

export async function setLocale(i18n: I18n, locale?: string) {
	if (!supportedLanguage(locale)) {
		return console.warn(`Locale ${locale} is not supported.`)
	}
	if (!loadedLocales.includes(locale)) {
		await loadLocaleMessages(i18n, locale)
		loadedLocales.push(locale)
	}
	setI18nLanguage(i18n, locale)
	window.userLang = locale
	Data.reset()
}
