<script setup lang="ts">
import { useToast } from "primevue/usetoast"
import { FileUploadBeforeUploadEvent } from "primevue/fileupload"

const toast = useToast()

const onAdvancedUpload = (event: FileUploadBeforeUploadEvent) => {
	console.log(event)
	toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 })
	return false
}

const formatSize = (bytes: number) => {
	const k = 1024
	const dm = 3
	const sizes = ["byte", "Kb", "Mb"]

	if (bytes === 0) {
		return `0 ${sizes[0]}`
	}

	const i = Math.floor(Math.log(bytes) / Math.log(k))
	const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

	return `${formattedSize} ${sizes[i]}`
}
</script>

<template>
	<FileUpload name="loadFile" :customUpload="true" @beforeUpload="onAdvancedUpload" :auto="true" chooseLabel="Browse">
		<template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
			<div v-if="files.length > 0">
				<div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="upload-file">
					<span class="font-semibold">{{ file.name }}</span>
					<div>{{ formatSize(file.size) }}</div>
					<Button icon="pi pi-times" @click="() => removeFileCallback(index)" outlined rounded severity="danger" />
				</div>
			</div>
			<div v-if="uploadedFiles.length > 0">
				<div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="upload-file">
					<span class="font-semibold">{{ file.name }}</span>
					<div>{{ formatSize(file.size) }}</div>
					<Button icon="pi pi-times" @click="() => removeUploadedFileCallback(index)" outlined rounded severity="danger" />
				</div>
			</div>
		</template>
		<template #empty>
			<p>Drag and drop file to here to upload.</p>
		</template>
	</FileUpload>
</template>

<style scoped lang="scss">
.upload-file {
	display: flex;
	justify-content: space-between;
	align-items: center;
	align-content: center;
	flex-wrap: nowrap;
	flex-direction: row;
}
</style>
