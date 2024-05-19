import "primeflex/primeflex.css"
// import "primevue/resources/themes/aura-light-green/theme.css"
import "primevue/resources/themes/aura-dark-green/theme.css"

import "primevue/resources/primevue.min.css" /* Deprecated */
import "primeicons/primeicons.css"
import "./style.scss"

import { createApp } from "vue"
import App from "./App.vue"
import PrimeVue from "primevue/config"
import AnimateOnScroll from "primevue/animateonscroll"
import Avatar from "primevue/avatar"
import Badge from "primevue/badge"
import BadgeDirective from "primevue/badgedirective"
import Button from "primevue/button"
import Card from "primevue/card"
import Chip from "primevue/chip"
import ConfirmPopup from "primevue/confirmpopup"
import ConfirmationService from "primevue/confirmationservice"
import Dialog from "primevue/dialog"
import DialogService from "primevue/dialogservice"
import Divider from "primevue/divider"
import Dropdown from "primevue/dropdown"
import FileUpload from "primevue/fileupload"
import FloatLabel from "primevue/floatlabel"
import FocusTrap from "primevue/focustrap"
import Image from "primevue/image"
import InputGroup from "primevue/inputgroup"
import InputGroupAddon from "primevue/inputgroupaddon"
import InputNumber from "primevue/inputnumber"
import InputText from "primevue/inputtext"
import Menubar from "primevue/menubar"
import OverlayPanel from "primevue/overlaypanel"
import Ripple from "primevue/ripple"
import Sidebar from "primevue/sidebar"
import Splitter from "primevue/splitter"
import SplitterPanel from "primevue/splitterpanel"
import StyleClass from "primevue/styleclass"
import Toast from "primevue/toast"
import ToastService from "primevue/toastservice"
import TabView from "primevue/tabview"
import TabPanel from "primevue/tabpanel"
import ToggleButton from "primevue/togglebutton"
import Tooltip from "primevue/tooltip"
import VirtualScroller from "primevue/virtualscroller"
import "./core/Share.ts"
import router from "./router.ts"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import VueCodemirror from "vue-codemirror"
import "driver.js/dist/driver.css"
import en from "./locales/en/index.json"
import { setLocale, setupI18n } from "./i18n.ts"
import type { I18n } from "vue-i18n"
import DynamicDialog from "primevue/dynamicdialog"
import Listbox from "primevue/listbox"
import TieredMenu from "primevue/tieredmenu"
import MultiSelect from "primevue/multiselect"

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
