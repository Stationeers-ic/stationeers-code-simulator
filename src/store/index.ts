// store.js
import { reactive, watch } from "vue"
import { tmpSave } from "../core/Save.ts"

export const codeStore = reactive({
	code: "",
	icx: "",
})
watch(codeStore, tmpSave)

export const settingStore = reactive({
	delay: "normal",
})
