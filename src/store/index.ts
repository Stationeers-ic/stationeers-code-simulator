// store.js
import { reactive } from "vue"

export const codeStore = reactive({
	code: "",
	icx: "",
})

export const settingStore = reactive({
	delay: "normal",
})
