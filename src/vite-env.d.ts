/// <reference types="vite/client" />
declare module "*.vue" {
	import type {DefineComponent} from "vue"
	const component: DefineComponent<{}, {}, any>
	export default component
}

declare module "vuex" {
	export * from "vuex/types/index.d.ts"
	export * from "vuex/types/helpers.d.ts"
	export * from "vuex/types/logger.d.ts"
	export * from "vuex/types/vue.d.ts"
}

declare const __package__: { dependencies: Record<string, { version: string; overridden: boolean }> }
declare const __buildTime__: number
