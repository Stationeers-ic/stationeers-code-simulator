<script setup lang="ts">
import ic10 from "../core/ic10.ts"
import EnvInput from "../ui/EnvInput.vue"
import { Register } from "ic10/zodTypes"
import { z } from "zod"
</script>

<template>
	<div class="register">
		<h3>Registers</h3>
		<div :class="$style.registerContent">
			<template v-for="(_, index) in ic10.getEnv().data">
				<EnvInput :name="index" v-model="ic10.getEnv().data[index]" v-if="Register.safeParse(index).success" />
			</template>
		</div>
		<h3>Constant and Labels</h3>
		<div :class="$style.registerContent">
			<template v-for="[index, value] in ic10.getEnv().aliases.entries()">
				<EnvInput :readonly="true" :name="index" :model-value="value" v-if="z.number().or(z.nan()).safeParse(value).success" />
			</template>
		</div>
	</div>
</template>

<style module lang="scss">
.registerContent {
	margin-left: 5px;
	display: flex;
	flex-direction: column;
}
</style>
