import "primeflex/primeflex.css"
// import "primevue/resources/themes/aura-light-green/theme.css"
import "primevue/resources/themes/aura-dark-green/theme.css"

import "primevue/resources/primevue.min.css" /* Deprecated */
import "primeicons/primeicons.css"
import "./style.scss"

import {createApp} from "vue"
import App from "./App.vue"
import PrimeVue from "primevue/config"
import AnimateOnScroll from "primevue/animateonscroll"
import BadgeDirective from "primevue/badgedirective"
import ConfirmationService from "primevue/confirmationservice"
import DialogService from "primevue/dialogservice"
import FocusTrap from "primevue/focustrap"
import Ripple from "primevue/ripple"
import StyleClass from "primevue/styleclass"
import ToastService from "primevue/toastservice"
import Tooltip from "primevue/tooltip"
import "./core/Share.ts"
import router from "./router.ts"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import VueCodemirror from "vue-codemirror"
import "driver.js/dist/driver.css"
import en from "./locales/en/index.json"
import {setLocale, setupI18n} from "./i18n.ts"
import type {I18n} from "vue-i18n"

window.userLang = localStorage.getItem("language") ?? navigator.languages.find((x) => __languages__.includes(x)) ?? "en"
const app = createApp(App)
const i18n = setupI18n<[typeof en], (typeof __languages__)[number]>({
	legacy: false,
	locale: window.userLang, // set locale
	fallbackLocale: "en", // set fallback locale
})
i18n.global.setLocaleMessage("en", en)

dayjs.extend(relativeTime)
window.dayjs = dayjs
window.i18n = i18n
declare global {
	interface Window {
		dayjs: typeof dayjs
		i18n: typeof i18n
		userLang: string
	}
}
if (window.userLang !== "en") setLocale(i18n as I18n, window.userLang)

app.use(i18n)
app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ConfirmationService)
app.use(ToastService)
app.use(DialogService)
app.use(VueCodemirror, {
	// optional default global options
	autofocus: true,
	disabled: false,
	indentWithTab: true,
	tabSize: 2,
	// ...
})
app.directive("tooltip", Tooltip)
app.directive("badge", BadgeDirective)
app.directive("ripple", Ripple)
app.directive("styleclass", StyleClass)
app.directive("focustrap", FocusTrap)
app.directive("animateonscroll", AnimateOnScroll)
//my components
app.mount("#app")
