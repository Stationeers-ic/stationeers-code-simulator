// store.js
import {reactive} from 'vue'
import Env from "../core/Env.ts";

const env = new Env()
// @ts-ignore
window.env = env
export const envStore = reactive(env)
