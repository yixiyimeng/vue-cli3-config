/* 路由拦截 */
import Vue from 'vue';
import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({
	showSpinner: false
})
router.beforeEach((to, from, next) => {
	NProgress.start() // start progress bar
	/* 判断 token 校验用户信息， */
	if (Vue.ls.get('userInfo')) {
		next()
	} else {
		location.href = 'login.html'
	}


})

router.afterEach((to) => {
	NProgress.done() // finish progress bar
})
