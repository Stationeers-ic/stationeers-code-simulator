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

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/vue'
import router from "../../src/router";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";
import VueCodemirror from "vue-codemirror";
import {setupI18n} from "../../src/i18n";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";


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
		},
	})

	return mount(component, options)
})
// Example use:
// cy.mount(MyComponent)
