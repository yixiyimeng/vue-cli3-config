import {
	constantRouterMap
} from "@/router"
const permission = {
	state: {
		routers: constantRouterMap,
		addRouters: [],
		buttenpremissions: [],
		menuId: ''
	},
	mutations: {
		SET_ROUTERS: (state, routers) => {
			state.addRouters = routers;
			state.routers = constantRouterMap.concat(routers)
		},
		SET_menuId: (state, menuId) => {
			state.menuId = menuId;
		}
	},
	actions: {
		
	}
}

export default permission
