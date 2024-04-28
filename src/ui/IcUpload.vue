<script setup lang="ts">
import {FileUploadBeforeSendEvent} from "primevue/fileupload"

const content = defineModel()
const filename = defineModel("filename")
const uploadHandler = async (event: FileUploadBeforeSendEvent) => {
	const file = event.formData.get("loadFile") as File
	filename.value = file.name
	content.value = await readFileContent(file)
}

function readFileContent(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onload = (event) => resolve(event?.target?.result as string)

		reader.onerror = (error) => reject(error)

		reader.readAsText(file)
	})
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
	<div class="FileUpload">
		<FileUpload name="loadFile" :fileLimit="1" :showUploadButton="false" :showCancelButton="false" @beforeSend="uploadHandler" :auto="true" chooseLabel="Browse">
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
						<Button icon="pi pi-times" @click="() => removeUploadedFileCallback(index)" outlined rounded severity="danger" />
						<span class="font-semibold">{{ file.name }}</span>
						<div>{{ formatSize(file.size) }}</div>
					</div>
				</div>
			</template>
			<template #empty>
				<p>Drag and drop file to here to upload.</p>
			</template>
		</FileUpload>
	</div>
</template>
<style></style>
<style scoped lang="scss">
.FileUpload {
	width: 100%;
}

.upload-file {
	display: flex;
	gap: 50px;
	//justify-content: space-between;
	align-items: center;
	align-content: center;
	flex-wrap: nowrap;
	flex-direction: row;
}
</style>
