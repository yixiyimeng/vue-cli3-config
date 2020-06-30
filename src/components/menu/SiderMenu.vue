<template>
	<a-layout-sider collapsible width="200px" class="layoutSilder" :class="{light:theme=='light'}" v-model="collapsed">
		<div class="userinfo flex flex-align-center" :class="{'hide-userinfo':collapsed}">
			<div class="thumb" @click="setuploadInfo">
				<img alt="" :src="userInfo.avatar" v-if="userInfo.avatar" />
				<img alt="" src="/img/thumb.png" v-if="!userInfo.avatar" />
			</div>
			<div class="flex-1">
				<p class="name">{{userInfo.name}}</p>
				<div>
					<a href="javascript:;" class="online">
						<i class="material-icons icon iconfont ">radio_button_checked</i>
						<span>在线</span>
					</a>
					<a href="javascript:;" class="exit ml10">
						<i class="material-icons icon iconfont ">exit_to_app</i>
						<span>注销</span></a>
				</div>
			</div>

		</div>
		<s-menu :collapsed="collapsed" :menu="menus" :theme="theme" @select="onSelect" :mode="mode"></s-menu>
	</a-layout-sider>
</template>

<script>
	import ALayoutSider from 'ant-design-vue/es/layout/Sider';
	import SMenu from './index';
	export default {
		name: 'SiderMenu',
		components: {
			ALayoutSider,
			SMenu
		},
		props: {
			mode: {
				type: String,
				required: false,
				default: 'inline'
			},
			collapsible: {
				type: Boolean,
				required: false,
				default: false
			},

			menus: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				collapsed: false,
				userInfo: {},
				theme: localStorage.getItem('navTheme') || 'dark',
			}
		},
		created() {
			this.getUserInfo();
		},
		mounted() {
			const $me = this;

		},
		computed: {

		},
		methods: {
			onSelect(obj) {
				this.$emit('menuSelect', obj);
			},
			getUserInfo() {
				try {
					this.userInfo = this.$ls.get('userInfo');
				} catch (e) {

				}
			},

		}
	};
</script>
<style lang="scss" scoped="scoped">
	.logo h1 {
		color: #fff;
	}

	.userinfo {
		margin: 24px 13px 10px;
		color: #f0f2f5;

		.thumb {
			width: 45px;
			height: 45px;
			border-radius: 100%;
			cursor: pointer;
			overflow: hidden;

			img {
				display: block;
				width: 100%;
				height: 100%;
				position: relative;

				&::after {
					content: "";
					display: inline-block;
					position: absolute;
					z-index: 2;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					// background-image: url(../../assets/img/thumb.png);
					background-size: cover;
					background-color: none;
				}
			}
		}

		.flex-1 {
			margin-left: 17px;
			text-align: left;
			transition: all .3s;
			overflow: hidden;
			white-space: nowrap;
		}

		&.hide-userinfo .flex-1 {
			height: 0;
			margin-left: 0;
		}

		.name {
			font-size: 16px;
			font-weight: bold;
			margin-bottom: 0;
			cursor: pointer;
		}

		a {
			color: #f0f2f5;
			font-size: 12px;

			i,
			span {
				display: inline-block;
				vertical-align: middle;
				font-size: 12px;
			}

			&.online i {
				color: #00baad;
				margin-right: 2px;
			}

			&.exit i {
				color: #960101;
				margin-right: 2px;
			}
		}
	}

	>>>.iconfont {
		font-size: 14px;
		margin-right: 5px;
	}

	>>>.ant-menu-inline-collapsed>.ant-menu-item .iconfont+span,
	>>>.ant-menu-inline-collapsed>.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-item .iconfont+span,
	>>>.ant-menu-inline-collapsed>.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-submenu>.ant-menu-submenu-title .iconfont+span,
	>>>.ant-menu-inline-collapsed>.ant-menu-submenu>.ant-menu-submenu-title .iconfont+span {
		display: inline-block;
		max-width: 0;
		opacity: 0;
	}

	/* .ant-layout-sider-trigger{
		bottom:25px;
		} */
	.layoutSilder {
		overflow: auto;
		height: 100%;
	}

	.light.layoutSilder {
		background: #e8ebef;
	}

	.light.layoutSilder .userinfo {
		color: #333;

		a {
			color: #333;
		}
	}


	.ant-menu {
		height: calc(100% - 55px);
		overflow-y: auto;
	}
</style>
