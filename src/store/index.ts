// store.js
import {reactive} from "vue"

export const codeStore = reactive({
	code: "",
})

export const settingStore = reactive({
	delay: "normal",
})
