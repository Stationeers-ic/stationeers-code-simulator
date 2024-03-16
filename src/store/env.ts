// store.js
import { reactive } from 'vue'
import {DevEnv} from "ic10";

const env = new DevEnv()
export const envStore = reactive(env)
