<script setup lang="ts">
const visible = defineModel()
</script>

<template>
	<div class="settingButton" @click="visible = true" />
	<div class="card flex justify-content-center">
		<Sidebar v-model:visible="visible" header="Sidebar">
			<p></p>
		</Sidebar>
	</div>
</template>

<style scoped lang="scss">
.settingButton {
	position: fixed;
	width: 10px;
	height: 200px;
	color: #020617;
	background: #34d399;
	border: 1px solid #34d399;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
	border-radius: 0 20px 20px 0;

	&:before {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		content: ">";
	}

	&:hover {
		background: #6ee7b7;
		color: #020617;
		border-color: #6ee7b7;
	}
}
</style>
