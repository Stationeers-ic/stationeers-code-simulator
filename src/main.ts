import { createApp } from 'vue'
import 'primevue/resources/themes/aura-light-green/theme.css'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';

createApp(App)
	.use(PrimeVue)
	.mount('#app')
