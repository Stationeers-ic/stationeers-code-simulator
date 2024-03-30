<script setup lang="ts">
const visible = defineModel()
</script>

<template>
	<Dialog
		v-model:visible="visible"
		header="Edit Profile"
		:style="{ width: '50rem' }"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
	>
		<span class="p-text-secondary block mb-5">Update your information.</span>
		<div class="flex align-items-center gap-3 mb-3">
			<label for="username" class="font-semibold w-6rem">Username</label>
			<InputText id="username" class="flex-auto" autocomplete="off" />
		</div>
		<div class="flex align-items-center gap-3 mb-5">
			<label for="email" class="font-semibold w-6rem">Email</label>
			<InputText id="email" class="flex-auto" autocomplete="off" />
		</div>
		<div class="flex justify-content-end gap-2">
			<Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
			<Button type="button" icon="pi pi-file-edit" label="Save as file" @click="visible = false"></Button>
			<Button type="button" icon="pi pi-file" label="Save" @click="visible = false"></Button>
			<Button type="button" icon="pi pi-" label="Save" @click="visible = false"></Button>
		</div>
	</Dialog>
</template>

<style scoped lang="scss"></style>
