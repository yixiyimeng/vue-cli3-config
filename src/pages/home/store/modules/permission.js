import {
	asyncRouterMap,
	constantRouterMap
} from "../../router"

function filterAsyncRouter(routerMap) {
	/* type 0  目录 1,菜单, 2 按钮 */
	const accessedRouters = routerMap.filter(route => {
		if (route && route.type == 1) {
			if (route.children && route.children.length > 0) {
				route.children = [...filterAsyncRouter(route.children)];
			}
			return true
		}
		return false

	})
	return accessedRouters
}

function setAsyncRouter(routerMap) {
	// console.log('routerMap', routerMap)
	const accessedRouters = routerMap.map(route => {
		let path = route.attributes.url;
		let component = '';
		if (route.component && (route.component.indexOf('http') > -1||route.component.indexOf('https') > -1)) {
			component = 'components/Myiframe/index.vue';
			path = route.component;
			// console.log(path);
		} else {
			component = route.component || 'components/404/index.vue';
		}
		if (route && route.type == 1) {
			let newroute = {
				path: route.attributes.url,
				name: route.attributes.url.replace(/\//, ''),
				redirect: route.redirect,
				component: resolve => require(['../../' + component], resolve),
				meta: {
					title: route.text,
					icon: route.attributes.icon,
					url: path,
					permissionList: route.perms,
					keepAlive: route.isCacheRoute == 1
				}
			}
			if (route.children && route.children.length > 0) {
				newroute.children = [...setAsyncRouter(route.children)];
			}
			return newroute
		}
	})
	return accessedRouters
}

function setredirect(routerMap) {
	console.log('routerMap', routerMap)
	routerMap.forEach(route => {
		if (route.redirect == 'redirect') {

			if (route.children && route.children.length > 0) {
				route.redirect = route.children[0].path;
				route.children = setredirect(route.children)
			}
			// return true
		}
		// return false
	})
	return routerMap
}
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
		SET_PERMSLIST: (state, permslist) => {
			state.permslist = permslist;
			sessionStorage.setItem('buttenpremissions[' + state.menuId + ']', JSON.stringify(permslist))
		},
		SET_menuId: (state, menuId) => {
			state.menuId = menuId;
		}
	},
	actions: {
		GenerateRoutes({
			commit
		}, data) {
			return new Promise(resolve => {
				const {
					menulist
				} = data;
				/* 获取权限列表 */
				console.log(JSON.stringify(menulist));
				let permslist = JSON.stringify(menulist).match(/(?=\"perms\":")([^\,]*)(?=\,)/g).join(',').replace(/"perms":/g,
					'').replace(/\"/g, '').split(',');
				const accessedRouters = setAsyncRouter(filterAsyncRouter(menulist));
				asyncRouterMap[0].children = [...accessedRouters];
				const router = setredirect(asyncRouterMap);
				console.log(router)
				commit('SET_ROUTERS', router)
				commit('SET_PERMSLIST', permslist)
				resolve()
			})
		}
	}
}

export default permission
