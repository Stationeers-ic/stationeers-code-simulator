import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

import Ic10 from "./pages/Ic10.vue"
import IcX from "./pages/IcX.vue"

type MyRouteRecordRaw = {
	icon?: string
} & RouteRecordRaw
export const routes: MyRouteRecordRaw[] = [
	{
		path: "/",
		icon: "pi pi-code",
		name: "Ic10",
		component: Ic10,
	},
]
if (import.meta.env.DEV) {
	routes.push({
		path: "/icx",
		icon: "pi pi-file",
		name: "Icx",
		component: () => IcX,
	})
}

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
