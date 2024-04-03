<script setup lang="ts">
import Footer from "./components/Footer.vue"
import Header from "./components/Header.vue"
import SocialButtons from "./components/SocialButtons.vue"
import { startupLoad, tmpSave } from "./core/Save.ts"
import { useToast } from "primevue/usetoast"
import { onBeforeUnmount, onMounted } from "vue"
import ic10 from "./core/ic10.ts"

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
	ic10.getEnv().on("update", tmpSave)
})
onBeforeUnmount(() => {
	ic10.getEnv().off("update", tmpSave)
})
</script>

<template>
	<ConfirmPopup />
	<Toast />
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
