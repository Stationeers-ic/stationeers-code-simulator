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
import Avatar from "primevue/avatar"
import Badge from "primevue/badge"
import BadgeDirective from "primevue/badgedirective"
import Button from "primevue/button"
import ButtonGroup from "primevue/buttongroup"
import Card from "primevue/card"
import Chip from "primevue/chip"
import Chips from "primevue/chips"
import Column from "primevue/column"
import ConfirmDialog from "primevue/confirmdialog"
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
import Menu from "primevue/menu"
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
import Tag from "primevue/tag"
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
import {setLocale, setupI18n} from "./i18n.ts"
import type {I18n} from "vue-i18n"
import DynamicDialog from "primevue/dynamicdialog";
import Listbox from "primevue/listbox";
import TieredMenu from "primevue/tieredmenu";

window.userLang = localStorage.getItem("language") ?? navigator.language
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

//Prime components
// app.component("Accordion", Accordion)
// app.component("AccordionTab", AccordionTab)
// app.component("AutoComplete", AutoComplete)
app.component("Avatar", Avatar)
// app.component("AvatarGroup", AvatarGroup)
app.component("Badge", Badge)
// app.component("BlockUI", BlockUI)
// app.component("Breadcrumb", Breadcrumb)
app.component("Button", Button)
app.component("ButtonGroup", ButtonGroup)
// app.component("Calendar", Calendar)
app.component("Card", Card)
// app.component("Carousel", Carousel)
// app.component("CascadeSelect", CascadeSelect)
// app.component("Checkbox", Checkbox)
app.component("Chip", Chip)
app.component("Chips", Chips)
// app.component("ColorPicker", ColorPicker)
app.component("Column", Column)
// app.component("ColumnGroup", ColumnGroup)
app.component("ConfirmDialog", ConfirmDialog)
app.component("ConfirmPopup", ConfirmPopup)
// app.component("ContextMenu", ContextMenu)
// app.component("DataTable", DataTable)
// app.component("DataView", DataView)
// app.component("DataViewLayoutOptions", DataViewLayoutOptions)
// app.component("DeferredContent", DeferredContent)
app.component("Dialog", Dialog)
app.component("Divider", Divider)
// app.component("Dock", Dock)
app.component("Dropdown", Dropdown)
app.component("DynamicDialog", DynamicDialog)
// app.component("Fieldset", Fieldset)
app.component("FileUpload", FileUpload)
app.component("FloatLabel", FloatLabel)
// app.component("Galleria", Galleria)
// app.component("IconField", IconField)
app.component("Image", Image)
// app.component("InlineMessage", InlineMessage)
// app.component("Inplace", Inplace)
app.component("InputGroup", InputGroup)
app.component("InputGroupAddon", InputGroupAddon)
// app.component("InputIcon", InputIcon)
// app.component("InputMask", InputMask)
app.component("InputNumber", InputNumber)
// app.component("InputOtp", InputOtp)
// app.component("InputSwitch", InputSwitch)
app.component("InputText", InputText)
// app.component("Knob", Knob)
app.component("Listbox", Listbox)
// app.component("MegaMenu", MegaMenu)
app.component("Menu", Menu)
app.component("Menubar", Menubar)
// app.component("Message", Message)
// app.component("MeterGroup", MeterGroup)
// app.component("MultiSelect", MultiSelect)
// app.component("OrderList", OrderList)
// app.component("OrganizationChart", OrganizationChart)
app.component("OverlayPanel", OverlayPanel)
// app.component("Paginator", Paginator)
// app.component("Panel", Panel)
// app.component("PanelMenu", PanelMenu)
// app.component("Password", Password)
// app.component("PickList", PickList)
// app.component("ProgressBar", ProgressBar)
// app.component("ProgressSpinner", ProgressSpinner)
// app.component("RadioButton", RadioButton)
// app.component("Rating", Rating)
// app.component("Row", Row)
// app.component("SelectButton", SelectButton)
// app.component("ScrollPanel", ScrollPanel)
// app.component("ScrollTop", ScrollTop)
// app.component("Slider", Slider)
app.component("Sidebar", Sidebar)
// app.component("Skeleton", Skeleton)
// app.component("SpeedDial", SpeedDial)
// app.component("SplitButton", SplitButton)
app.component("Splitter", Splitter)
app.component("SplitterPanel", SplitterPanel)
// app.component("Stepper", Stepper)
// app.component("StepperPanel", StepperPanel)
// app.component("Steps", Steps)
// app.component("TabMenu", TabMenu)
app.component("TabView", TabView)
app.component("TabPanel", TabPanel)
app.component("Tag", Tag)
// app.component("Textarea", Textarea)
// app.component("Terminal", Terminal)
app.component("TieredMenu", TieredMenu)
// app.component("Timeline", Timeline)
app.component("Toast", Toast)
// app.component("Toolbar", Toolbar)
app.component("ToggleButton", ToggleButton)
// app.component("Tree", Tree)
// app.component("TreeSelect", TreeSelect)
// app.component("TreeTable", TreeTable)
// app.component("TriStateCheckbox", TriStateCheckbox)
app.component("VirtualScroller", VirtualScroller)

app.mount("#app")
