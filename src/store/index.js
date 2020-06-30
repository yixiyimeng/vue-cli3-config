import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 引入login 模块
import login from "./login"
import permission from "./modules/permission"

export default new Vuex.Store({
	// 通过modules属性引入login 模块。
	modules: {
		login: login,
		permission
	},
	state: {
		abc: "12333"
	}
})
