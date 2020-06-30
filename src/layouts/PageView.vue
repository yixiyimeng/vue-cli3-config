<template>
	<div class="main flex" style="height: 100%;">
		<sider-menu :collapsed="collapsed" :menus="subMenu" :theme="menuTheme"></sider-menu>
		<div class="flex-1">
			<keep-alive>
				<route-view></route-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	import SiderMenu from '@/components/menu/SiderMenu';
	import RouteView from '@/layouts/RouteView';
	import {
		mapGetters,
		mapActions,
		mapState
	} from 'vuex';
	export default {
		name: 'PageView',
		components: {
			SiderMenu,
			RouteView
		},
		computed: {
			key() {
				// return this.$route.path+Math.random()
				return this.$route.path;
			}
		},
		data() {
			return {
				theme: 'light',
				title: '',
				selectkey: [],
				menuTheme: 'dark',
				menuMode: 'inline',
				collapsed: this.collapsed,
				subMenu: []
			};
		},
		computed: {
			...mapState({
				// 动态主路由
				mainMenu: state => {
					return state.permission.routers
				}
			}),
			useName: function() {
				return this.$store.state.login.useName
			},

		},
		created() {
			/* 获取路由 */
			this.subMenu = this.mainMenu.find(item => item.path === '/').children;
		}
	};
</script>

<style scoped="scoped" lang="scss">
	/deep/ .ant-menu .ant-menu-item {
		text-align: left;
	}

	/deep/ .ant-menu .ant-menu-item .iconfont {
		font-size: 16px;
		margin-right: 5px;
	}

	/deep/ .ant-menu-inline-collapsed>.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-item .iconfont+span,
	/deep/ .ant-menu-inline-collapsed>.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-submenu>.ant-menu-submenu-title .iconfont+span,
	/deep/ .ant-menu-inline-collapsed>.ant-menu-item .iconfont+span,
	/deep/ .ant-menu-inline-collapsed>.ant-menu-submenu>.ant-menu-submenu-title .iconfont+span {
		display: inline-block;
		max-width: 0;
		opacity: 0
	}
</style>
