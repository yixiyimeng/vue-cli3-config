<template>
	<div id="app">
		<router-view></router-view>
	</div>

</template>
<script>
	import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
	import {
		GetQueryString
	} from '@/utils/base'
	import store from './store/index'
	import router from './router'
	// import {
	// 	getlistLevelOtherMenu
	// } from '@/api'
	import {
		updateTheme
	} from '@/components/SettingDrawer/settingConfig'
	export default {
		name: 'app',

		computed: {},
		data() {
			return {
				locale: zhCN
			};
		},
		computed: {},
		created() {
			updateTheme(localStorage.getItem('primaryColor') || '#125fc9');
			let menulist = [{
				"id": "6",
				"text": "用户管理",
				"state": null,
				"type": 1,
				"perms": "sys:user:user",
				"component": "views/Home.vue",
				"redirect": null,
				"isCacheRoute": 1,
				"orderNum": null,
				"checked": true,
				"attributes": {
					"icon": "face",
					"url": "/accountlist"
				}
			},{
				"id": "6",
				"text": "角色管理",
				"state": null,
				"type": 1,
				"perms": "sys:user:user",
				"component": "views/About.vue",
				"redirect": null,
				"isCacheRoute": 0,
				"orderNum": null,
				"checked": true,
				"attributes": {
					"icon": "face",
					"url": "/rolelist"
				}
			}]
			store.dispatch('GenerateRoutes', {
				menulist
			}).then(() => {
				// router.addRoutes(store.getters.addRouters)
			})
			
		}
	};
</script>
<style lang="scss">
	@import '../../assets/base.scss';
	@import '../../assets/font.css';

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100%;
	}
</style>
