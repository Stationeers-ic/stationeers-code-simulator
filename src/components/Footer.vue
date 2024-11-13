<script setup lang="ts">
import {onMounted, ref} from "vue"

const buildTime = ref("")
const ic10 = __package__.dependencies?.ic10?.version
const codemirrorLangIc10 = __package__.dependencies?.["codemirror-lang-ic10"]?.version
onMounted(() => {
	setTimeout(() => {
		buildTime.value = window.dayjs(__buildTime__).fromNow()
	})
})
setInterval(() => {
	buildTime.value = window.dayjs(__buildTime__).fromNow()
}, 60 * 1000)
</script>

<template>
	<footer :class="$style.tagFooter">
		<div class="flex flex-row gap-1" :class="$style.footer">
			<div><a href="https://www.npmjs.com/package/ic10">ic10</a>: {{ ic10 }}</div>
			<span>|</span>
			<div>
				<a href="https://www.npmjs.com/package/codemirror-lang-ic10">codemirror-lang-ic10</a>:
				{{ codemirrorLangIc10 }}
			</div>
			<!--			<span>|</span>-->
		</div>
		<div :class="$style.build">Build: {{ buildTime }}</div>
	</footer>
</template>

<style module lang="scss">
.tagFooter {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
}

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
