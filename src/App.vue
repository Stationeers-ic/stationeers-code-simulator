<script setup lang="ts">
import Footer from "./components/Footer.vue"
import Header from "./components/Header.vue"
import SocialButtons from "./components/SocialButtons.vue"
import { startupLoad } from "./core/Save.ts"
import { useToast } from "primevue/usetoast"
import { onBeforeUnmount, onMounted } from "vue"

const toast = useToast()
onMounted(() => {
	setTimeout(() => {
		startupLoad()
			.then((from) => {
				if (from) {
					toast.add({ severity: "success", summary: "Loaded", detail: `load data ${from}`, life: 3000 })
				}
			})
			.catch((e) => {
				toast.add({ severity: "error", summary: "Error", detail: e.message, life: 3000 })
			})
	}, 500)
})
onBeforeUnmount(() => {})
</script>

<template>
	<Header />
	<main>
		<RouterView />
	</main>
	<SocialButtons />
	<Footer />
</template>

<style module lang="scss">
.footer {
	width: 50%;
	opacity: 0.5;

	a {
		color: unset;
	}
}

.build {
	width: auto;
	opacity: 0.5;
}
</style>
