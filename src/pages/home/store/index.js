import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import permission from "./modules/permission"
import getters from './getters'
export default new Vuex.Store({
	// 通过modules属性引入login 模块。
	modules: {
		permission
	},
	state: {
		cachedViews: []
	},
	mutations: {
		ADD_CACHED_VIEW: (state, view) => {
			if (state.cachedViews.includes(view.name)) return
			if (view.meta.keepAlive) {
				state.cachedViews.push(view.name)
			}
		},
		DEL_CACHED_VIEW: (state, view) => {
			const index = state.cachedViews.indexOf(view.name)
			index > -1 && state.cachedViews.splice(index, 1)
		},
	},
	actions: {
		delCachedView({
			commit,
			state
		}, view) {
			return new Promise(resolve => {
				commit('DEL_CACHED_VIEW', view)
				resolve([...state.cachedViews])
			})
		},
	},
	getters
})
