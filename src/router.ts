import { createMemoryHistory, createRouter, RouteRecordRaw } from "vue-router"

import Ic10 from "./pages/Ic10.vue"

type MyRouteRecordRaw = {
	icon?: string
} & RouteRecordRaw
export const routes: MyRouteRecordRaw[] = [
	{
		path: "/",
		icon: "pi pi-star",
		name: "Ic10",
		component: Ic10,
	},
	// {
	// 	path: "/icx",
	// 	icon: "pi pi-star",
	// 	name: "Soon",
	// 	component: () => NotFound,
	// },
	// {
	// 	path: "/icx2",
	// 	icon: "pi pi-star",
	// 	name: "Soon2",
	// 	component: () => NotFound,
	// },
	// {
	// 	path: "/icx3",
	// 	icon: "pi pi-star",
	// 	name: "Soon3",
	// 	component: () => NotFound,
	// },
]

const router = createRouter({
	history: createMemoryHistory(),
	routes,
})

export default router
