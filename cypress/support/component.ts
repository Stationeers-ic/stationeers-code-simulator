// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
// import "primevue/resources/themes/aura-light-green/theme.css"
import PrimeVue from "primevue/config"
import Avatar from "primevue/avatar"
import Badge from "primevue/badge"
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
import Image from "primevue/image"
import InputGroup from "primevue/inputgroup"
import InputGroupAddon from "primevue/inputgroupaddon"
import InputNumber from "primevue/inputnumber"
import InputText from "primevue/inputtext"
import Menubar from "primevue/menubar"
import OverlayPanel from "primevue/overlaypanel"
import Sidebar from "primevue/sidebar"
import Splitter from "primevue/splitter"
import SplitterPanel from "primevue/splitterpanel"
import Toast from "primevue/toast"
import ToastService from "primevue/toastservice"
import TabView from "primevue/tabview"
import TabPanel from "primevue/tabpanel"
import ToggleButton from "primevue/togglebutton"
import VirtualScroller from "primevue/virtualscroller"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import VueCodemirror from "vue-codemirror"
import DynamicDialog from "primevue/dynamicdialog"
import Listbox from "primevue/listbox"
import TieredMenu from "primevue/tieredmenu"
import MultiSelect from "primevue/multiselect";
// Alternatively you can use CommonJS syntax:
// require('./commands')
import {mount} from 'cypress/vue'
import router from "../../src/router";
import {setupI18n} from "../../src/i18n";


// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}
const i18n = setupI18n({
	legacy: false,
	locale: "en", // set locale
	fallbackLocale: "en", // set fallback locale
})
dayjs.extend(relativeTime)
Cypress.Commands.add('mount', (component, options = {}) => {
	// Setup options object
	options.global = options.global || {}
	options.global.plugins = options.global.plugins || []
	// Add router plugin
	options.global.plugins.push({
		install(app) {
			// @ts-ignore
			window.dayjs = dayjs

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
// app.component("ButtonGroup", ButtonGroup)
// app.component("Calendar", Calendar)
			app.component("Card", Card)
// app.component("Carousel", Carousel)
// app.component("CascadeSelect", CascadeSelect)
// app.component("Checkbox", Checkbox)
			app.component("Chip", Chip)
// app.component("Chips", Chips)
// app.component("ColorPicker", ColorPicker)
// app.component("Column", Column)
// app.component("ColumnGroup", ColumnGroup)
// app.component("ConfirmDialog", ConfirmDialog)
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
// app.component("Menu", Menu)
			app.component("Menubar", Menubar)
// app.component("Message", Message)
// app.component("MeterGroup", MeterGroup)
			app.component("MultiSelect", MultiSelect)
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
// app.component("Tag", Tag)
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
		},
	})

	return mount(component, options)
})
// Example use:
// cy.mount(MyComponent)
