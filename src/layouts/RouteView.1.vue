<template>
	<transition name="page-toggle">
		<div style="height: 100%; text-align: left;" class="flex flex-v">
			<contextmenu :itemList="menuItemList" :visible.sync="menuVisible" style="z-index: 9999;" @select="onMenuSelect" />
			<a-tabs :active-key="activePage" class="tab-layout-tabs" :hide-add="true" type="editable-card" @change="changePage"
			 @tabClick="tabCallBack" @edit="editPage" @contextmenu.native="e => onContextmenu(e)">
				<a-tab-pane :id="page.fullPath" :key="page.fullPath" v-for="page in pageList">
					<span slot="tab" :pagekey="page.fullPath">{{ page.meta.title }}</span>
				</a-tab-pane>
			</a-tabs>
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</div>
	</transition>
</template>

<script>
	import Contextmenu from '@/components/menu/Contextmenu'
	export default {
		name: "RouteView",
		data() {
			return {
				breadList: [],
				activePage: '',
				pageList: [],
				linkList: [],
				menuVisible: false,
				menuItemList: [{
						key: '4',
						icon: 'reload',
						text: '刷 新'
					},
					{
						key: '1',
						icon: 'arrow-left',
						text: '关闭左侧'
					},
					{
						key: '2',
						icon: 'arrow-right',
						text: '关闭右侧'
					},
					{
						key: '3',
						icon: 'close',
						text: '关闭其它'
					}
				],
				reloadFlag: true,
				multipage: true,
			};
		},
		computed: {
			getTitle() {
				return this.$route.meta.title;
			}
		},
		components: {
			Contextmenu
		},
		created() {
			this.pageList.push(this.$route)
			this.linkList.push(this.$route.fullPath)
			this.activePage = this.$route.fullPath
		},
		watch: {
			$route(newRoute) {
				console.log("新的路由", newRoute)
				if (newRoute.name === 'redirect') {
					return false
				}
				this.activePage = newRoute.fullPath
				if (this.linkList.indexOf(newRoute.fullPath) < 0) {
					this.linkList.push(newRoute.fullPath)
					this.pageList.push(Object.assign({}, newRoute))
					// if (newRoute.meta.keepAlive) {
					// 	this.routeReload()
					// }
				} else if (this.linkList.indexOf(newRoute.fullPath) >= 0) {
					let oldIndex = this.linkList.indexOf(newRoute.fullPath)
					let oldPositionRoute = this.pageList[oldIndex]
					this.pageList.splice(oldIndex, 1, Object.assign({}, newRoute, {
						meta: oldPositionRoute.meta
					}))
				}
			},
			'activePage': function(key) {
				let index = this.linkList.lastIndexOf(key)
				let waitRouter = this.pageList[index];
				this.$router.push(Object.assign({}, waitRouter));
				// this.changeTitle(waitRouter.meta.title)
			},
		},
		methods: {
			changePage(key) {
				this.activePage = key
			},
			tabCallBack() {
				this.$nextTick(() => {
					// triggerWindowResizeEvent()
				})
			},
			editPage(key, action) {
				this[action](key)
			},
			remove(key) {
				if (this.pageList.length === 1) {
					this.$message.warning('这是最后一页，不能再关闭了啦')
					return
				}
				this.pageList = this.pageList.filter(item => item.fullPath !== key)
				let index = this.linkList.indexOf(key)
				this.linkList = this.linkList.filter(item => item !== key)
				index = index >= this.linkList.length ? this.linkList.length - 1 : index
				this.activePage = this.linkList[index]
			},
			onContextmenu(e) {
				console.log(122)
				const pagekey = this.getPageKey(e.target)
				if (pagekey !== null) {
					e.preventDefault()
					this.menuVisible = true
				}
			},
			getPageKey(target, depth) {
				depth = depth || 0
				if (depth > 2) {
					return null
				}
				let pageKey = target.getAttribute('pagekey')
				pageKey = pageKey || (target.previousElementSibling ? target.previousElementSibling.getAttribute('pagekey') : null)
				return pageKey || (target.firstElementChild ? this.getPageKey(target.firstElementChild, ++depth) : null)
			},
			onMenuSelect(key, target) {
				let pageKey = this.getPageKey(target)
				switch (key) {
					case '1':
						this.closeLeft(pageKey)
						break
					case '2':
						this.closeRight(pageKey)
						break
					case '3':
						this.closeOthers(pageKey)
						break
					case '4':
						this.routeReload()
						break
					default:
						break
				}
			},
			closeCurrent() {
				this.remove(this.activePage);
			},
			/* update_end author:wuxianquan date:20190828 for: 关闭当前tab页，供子页面调用->望菜单能配置外链，直接弹出新页面而不是嵌入iframe #428 */
			closeOthers(pageKey) {
				let index = this.linkList.indexOf(pageKey)
				this.linkList = this.linkList.slice(index, index + 1)
				this.pageList = this.pageList.slice(index, index + 1)
				this.activePage = this.linkList[0]
			},
			closeLeft(pageKey) {
				let tempList = [...this.pageList]
				let index = this.linkList.indexOf(pageKey)
				this.linkList = this.linkList.slice(index)
				this.pageList = this.pageList.slice(index)
				if (this.linkList.indexOf(this.activePage) < 0) {
					this.activePage = this.linkList[0]
				}
			},
			closeRight(pageKey) {
				let index = this.linkList.indexOf(pageKey)
				this.linkList = this.linkList.slice(0, index + 1)
				this.pageList = this.pageList.slice(0, index + 1)
				if (this.linkList.indexOf(this.activePage < 0)) {
					this.activePage = this.linkList[this.linkList.length - 1]
				}
			},
			//update-begin-author:taoyan date:20190430 for:动态路由title显示配置的菜单title而不是其对应路由的title
			dynamicRouterShow(key, title) {
				let keyIndex = this.linkList.indexOf(key)
				if (keyIndex >= 0) {
					let currRouter = this.pageList[keyIndex]
					let meta = Object.assign({}, currRouter.meta, {
						title: title
					})
					this.pageList.splice(keyIndex, 1, Object.assign({}, currRouter, {
						meta: meta
					}))
					if (key === this.activePage) {
						this.changeTitle(title)
					}
				}
			},
			// routeReload() {
			// 	console.log('开始刷新了')
			// 	this.reloadFlag = false
			// 	this.$nextTick(() => {
			// 		this.reloadFlag = true
			// 	})
			// }
			routeReload() {
				this.$nextTick(() => {
					// params 默认会解析成为path字段,如果使用参数的形式 / 会来解析成为%
					this.$router.replace({
						path: '/redirect' + this.$route.fullPath,
					})
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	/deep/ .ant-tabs-bar {
		margin-bottom: 0;
	}
</style>
