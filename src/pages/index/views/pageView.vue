<template>
	<div>
		<a-layout>
			<a-layout-header class="header flex flex-align-center">
				<div class="logo">
					<router-link :to="{ name: 'Home' }">
						<!-- <img src="../../../assets/img/cslogo1.png" alt="" style="width: 40px;"> -->
						<!-- <a-icon type="global" /> -->
						<span class="ml5">智慧教育云平台</span>
					</router-link>
				</div>
				<div class="flex-1">
					<tags-view :views-list="list" ref="tagsView"></tags-view>
				</div>
				<!-- <notice-icon class="action" /> -->
				<div class="avatar" @click="setuserInfo=true">
					<img alt="" :src="userInfo.avatar"  v-if="userInfo.avatar"/>
				</div>
				<div class="theme" @click="showSet()">
					<i class="material-icons icon iconfont">settings</i>
					<span>主题</span>
				</div>
				<a href="javascript:;" class="exit" @click="handleLogout"><i class="material-icons icon iconfont">exit_to_app</i></a>
			</a-layout-header>
		</a-layout>

		<div class="iframebox">
			<div v-for="(item, index) in visitedViews" :key="item.url" v-show="activeView == item.url">
				<a-spin tip="正在加载..." :spinning="item.spinning" style="height: 100%;" size="large">
					<iframe v-once :src="item.url+'?menuId='+item.menuId" class="iframe" frameborder="0" scrolling="none" :ref="'iframe'+index"></iframe>
				</a-spin>
			</div>
		</div>

		<!-- 个人设置-->
		<a-modal title="个人设置" v-model="setuserInfo" @ok="handleOk" :width="680" cancelText="取消" okText="保存" :maskClosable="false"
		 :mask="false">
			<a-tabs v-model="tabkey">
				<a-tab-pane tab="基础资料" key="1" class="tab-pane">
					<baseInfo ref="baseInfo" @save="sendMessage"></baseInfo>
				</a-tab-pane>
				<a-tab-pane tab="修改密码" key="2" forceRender class="tab-pane">
					<change-pwd ref="changePwd"></change-pwd>
				</a-tab-pane>
				<!-- forceRender 被隐藏时候是否渲染dom结构 -->
			</a-tabs>
		</a-modal>
		<setting-drawer ref="setting" @sendChangeColor="sendChangeColor" @sendChangeTheme="sendChangeTheme"></setting-drawer>
	</div>
</template>
<script>
	import TagsView from '@/pages/index/components/TagsView';
	import baseInfo from '@/pages/index/views/baseInfo';
	import changePwd from '@/pages/index/views/changePwd';
	import SettingDrawer from '@/components/SettingDrawer';
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				setuserInfo: false,
				userInfo: {},
				tabkey: '1',
				list: []
			};
		},
		components: {
			TagsView,
			baseInfo,
			changePwd,
			SettingDrawer
		},
		computed: {
			...mapGetters(['visitedViews', 'activeView'])
		},
		created() {
			try {
				this.userInfo = this.$ls.get('userInfo');
			} catch (e) {
				//TODO handle the exception
			}
		},
		watch: {
			visitedViews: {
				handler: function(val, oldval) {
					const self = this
					this.$nextTick(() => {
						for (let i = 0; i < self.visitedViews.length; i++) {
							try {
								let iframe = self.$refs['iframe' + i][0];
								if (iframe) {
									if (iframe.attachEvent) {
										iframe.attachEvent("onload", function() {
											self.visitedViews[i].spinning = false;
										});
									} else {
										iframe.onload = function() {
											console.log(self.visitedViews)
											self.visitedViews[i].spinning = false;
										};
									}
								}
							} catch (e) {
								//TODO handle the exception
							}

						}
					})
				},
				deep: true, //对象内部的属性监听，也叫深度监听
				immediate: true
			},
		},
		mounted() {
			const $me = this;
			this.getlistLevelOneMenu();
			/* 接受iframe通讯 */
			window.addEventListener('message', function(event) {
				const data = event.data;
				console.log(data);
				if (data && data.cmd) {
					switch (data.cmd) {
						case 'exitApp':
							{
								$me.handleLogout();
								break;
							}
						case 'uploadInfo':
							{
								$me.setuserInfo = true;
								break
							}

					}
				}
			});
			/* 
			  
		*/
		},
		
		methods: {
			handleLogout() {
				/* 退出登录 */
				let $me = this;
				this.$confirm({
					title: '你确定要退出吗？',
					content: '',
					okText: '确定',
					cancelText: '取消',
					class: 'confirmbox',
					okType: 'danger',
					onOk() {
						/* 退出 */
						$me.logout();
					},
					onCancel() {
						console.log('Cancel');
					},
				});
			},
			handleOk() {
				/* 确认设置成功 */
				if (this.tabkey == '2') {
					this.$refs.changePwd.resetPwd()
				} else {
					this.$refs.baseInfo.updatePeronal()
				}
			},
			getlistLevelOneMenu() {
				let list = [{
					name: '首页',
					key: 'index',
					url: './home.html',
					icon: 'home',
					menuId: ''
				}];
				this.list = list;
				this.$refs.tagsView.initTags();
				// this.$postAction(api.getlistLevelOneMenu).then(da => {
				// 	if (da.code == 0) {
				// 		console.log(da.data);
				// 		// let list = [{
				// 		// 	name: '首页',
				// 		// 	key: 'index',
				// 		// 	url: './home.html',
				// 		// 	icon: 'home',
				// 		// 	menuId: ''
				// 		// }];
				// 		let list = [];
				// 		this.list = list.concat(da.data);
				// 		this.$refs.tagsView.initTags();
				// 	} else {
				// 		// this.$message.error(da.msg ? da.msg : '发生错误了！');
				// 	}
				// })
			},
			logout() {
				logout().then(da => {
					let loginparam = localStorage.getItem('loginInfo')
					localStorage.clear();
					localStorage.setItem('loginInfo', loginparam);
					top.location.href = 'login.html'
				})
			},
			sendMessage() {
				try {
					this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
				} catch (e) {
					//TODO handle the exception
				}
				for (var i = 0; i < this.visitedViews.length; i++) {
					let iframeWin = this.$refs['iframe' + i][0].contentWindow;
					if (iframeWin) {
						iframeWin.postMessage({
							cmd: 'uploadUserInfo',
							params: {}
						}, '*');
					}
				}

			},
			sendChangeColor(color) {
				for (var i = 0; i < this.visitedViews.length; i++) {
					let iframeWin = this.$refs['iframe' + i][0].contentWindow;
					if (iframeWin) {
						iframeWin.postMessage({
							cmd: 'uploadColor',
							params: {
								color: color
							}
						}, '*');
					}
				}
			},
			sendChangeTheme(navTheme) {
				for (var i = 0; i < this.visitedViews.length; i++) {
					let iframeWin = this.$refs['iframe' + i][0].contentWindow;
					if (iframeWin) {
						iframeWin.postMessage({
							cmd: 'uploadTheme',
							params: {
								theme: navTheme
							}
						}, '*');
					}
				}
			},
			showSet() {
				this.$refs.setting.show();
			}

		}
	};
</script>

<style scoped lang="less">
	.ant-layout-header {
		background: #125fc9;
		padding: 0;
		color: #fff;
		padding-right: 20px;
		height: 50px;
		line-height: 50px;

		.logo {
			width: 200px;
			font-size: 16px;

			a {
				color: #fff;
				text-decoration: none;
				display: block;
				margin: 0 auto;
				text-align: center;
			}

			img {
				width: 60px;
			}
		}

		.flex-1 {
			height: 50px;
		}

		.avatar {
			width: 22px;
			height: 22px;
			overflow: hidden;
			border-radius: 100%;
			margin-left: 20px;
			cursor: pointer;

			img {
				height: 100%;
				width: 100%;
				display: block;
				position: relative;

				&:after {
					content: "";
					display: inline-block;
					position: absolute;
					z-index: 2;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					// background-image: url(../../../assets/img/thumb.png);
					background-size: cover;
					background-color: none;
				}
			}
		}

		.exit,
		.theme {
			margin-left: 20px;
			cursor: pointer;
		}

		.exit i,
		.theme i {
			font-size: 22px;
			color: #fff;
		}

		.exit i {
			display: block;
		}

		.theme i {
			margin-right: 3px;
			vertical-align: middle;
		}

		.theme span {
			font-weight: bold;
			vertical-align: middle;
		}
	}

	.iframebox {
		position: absolute;
		top: 50px;
		left: 0;
		right: 0;
		bottom: 0;
		box-sizing: border-box;
	}

	.iframebox>div {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	.iframebox>div iframe {
		border: none;
		height: 100%;
		width: 100%;
		overflow: auto;
	}

	.tab-pane {
		padding: 50px 0 20px
	}

	/deep/ .ant-spin-container {
		height: 100%;
	}
</style>
