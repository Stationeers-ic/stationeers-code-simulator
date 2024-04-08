import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import Ic10 from "./pages/Ic10.vue"
import IcX from "./pages/IcX.vue"
import { loadLocaleMessages, setI18nLanguage, supportedLanguage } from "./i18n"
import type { I18n } from "vue-i18n"

type MyRouteRecordRaw = {
	icon?: string
} & RouteRecordRaw
export const routes: MyRouteRecordRaw[] = [
	{
		path: "/",
		icon: "pi pi-code",
		name: "Ic10",
		component: Ic10,
	},
]
if (import.meta.env.DEV) {
	routes.push({
		path: "/icx",
		icon: "pi pi-file",
		name: "Icx",
		component: () => IcX,
	})
}

const router = createRouter({
	history: createWebHistory(),
	routes,
})
router.beforeEach(async (to, from, next) => {
	const paramsLocale = window.userLang

	// use locale if paramsLocale is not in __languages__
	if (!supportedLanguage(paramsLocale)) {
		return next()
	}
	console.log("object :>> ", window.i18n.global.availableLocales)
	// load locale messages
	if (!window.i18n.global.availableLocales.includes(paramsLocale)) {
		await loadLocaleMessages(window.i18n as I18n, paramsLocale)
		console.log("loaded")
	}
	console.log("set")
	// set i18n language
	setI18nLanguage(window.i18n as I18n, paramsLocale)

	return next()
})
export default router
