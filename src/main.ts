import { createApp } from 'vue'
import 'primevue/resources/themes/aura-dark-blue/theme.css'
import './style.scss'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'


createApp(App)
	.use(PrimeVue, { ripple: true })
	.mount('#app')
