<script setup lang="ts">
import Footer from "./components/Footer.vue"
import Header from "./components/Header.vue"
import SocialButtons from "./components/SocialButtons.vue"
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
