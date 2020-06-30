import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const constantRouterMap = [{
		path: '/',
		component: () => import( /* webpackChunkName: "PageView" */ '@/layouts/PageView.vue'),
		redirect: '/home',
		name: 'home',
		hidden: true,
		meta: {
			title: '首页',
			icon: 'home'
		},
		children: [{
				path: '/home',
				name: 'home',
				component: Home,
				meta: {
					keepAlive: true,
					title: 'Home',
					icon: 'home'
				}

			},
			{
				path: '/about',
				name: 'about',
				component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
				meta: {
					keepAlive: false,
					icon: 'home',
					title: 'about'
				}
			}
		],
	}, {
		path: '/redirect',
		name: 'redirect',
		component: () => import( /* webpackChunkName: "PageView" */ '@/layouts/PageView.vue'),
		hidden: true,
		children: [{
			name: 'redirect',
			path: '/redirect/:path*',
			component: () =>
				import('@/views/redirect/index')
		}]
	}

]
export const asyncRouterMap = [{
	path: '/',
	component: () => import( /* webpackChunkName: "PageView" */ '@/layouts/PageView.vue'),
	redirect: 'redirect',
	name: 'home',
	hidden: true,
	meta: {
		title: '基础管理',
		icon: 'home',
		permission: ['home']
	}
}];
// export const constantRouterMap = [{
// 	path: '/redirect',
// 	name: 'redirect',
// 	component: () => import( /* webpackChunkName: "PageView" */ '@/layouts/PageView.vue'),
// 	hidden: true,
// 	children: [{
// 		name: 'redirect',
// 		path: '/redirect/:path*',
// 		component: () =>
// 			import('@/views/redirect/index')
// 	}]
// }];
const originalPush = VueRouter.prototype.push

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes: constantRouterMap
})
/* 处理重复点击的问题 */
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
export default router
