<template>
	<div class="tags-view-container">
		<scroll-pane class="tags-view-wrapper" ref="scrollPane">
			<router-link ref="tag" class="tags-view-item" :class="isActive(tag)?'active':''" :to="tag" @contextmenu.prevent.native="openMenu(tag,$event)" v-for="tag in Array.from(visitedViews)" :key="tag.path">
				{{tag.title}}
				<span class="ant-select-clear-icon anticon anticon-close" @click.prevent.stop='closeSelectedTag(tag)'><a-icon type="close-circle" /></span>
			</router-link>
		</scroll-pane>
		<ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
			<li @click="refreshSelectedTag(selectedTag)">刷新</li>
			<li @click="closeSelectedTag(selectedTag)">关闭</li>
			<li @click="closeOthersTags">关闭其他</li>
			<li @click="closeAllTags">关闭所有</li>
		</ul>
	</div>
</template>

<script>
	import ScrollPane from './ScrollPane'
	export default {
		name: "tags-view",
		components: {
			ScrollPane
		},
		data() {
			return {
				visible: false,
				top: 0,
				left: 0,
				selectedTag: {}
			}
		},
		computed: {
			visitedViews() {
				return this.$store.state.tagsView.visitedViews
			}
		},
		watch: {
			$route() {
				this.addViewTags()
				this.moveToCurrentTag()
			},
			visible(value) {
				if(value) {
					document.body.addEventListener('click', this.closeMenu)
				} else {
					document.body.removeEventListener('click', this.closeMenu)
				}
			}
		},
		mounted() {
			this.addViewTags()
		},
		methods: {
			isActive(route) {
				return route.path === this.$route.path
			},
			addViewTags() {
				const {
					name
				} = this.$route
				if(name) {
					this.$store.dispatch('addView', this.$route)
				}
				return false
			},
			moveToCurrentTag() {
				const tags = this.$refs.tag
				this.$nextTick(() => {
					for(const tag of tags) {
						if(tag.to === this.$route.fullPath) {
							this.$refs.scrollPane.moveToTarget(tag)

							// when query is different then update
							if(tag.to.fullPath !== this.$route.fullPath) {
								this.$store.dispatch('updateVisitedView', this.$route)
							}

							break
						}
					}
				})
			},
			refreshSelectedTag(view) {
				this.$store.dispatch('delCachedView', view).then(() => {
					const {
						fullPath
					} = view
					this.$nextTick(() => {
						this.$router.replace({
							path: '/redirect' + fullPath
						})
					})
				})
			},
			closeSelectedTag(view) {
				this.$store.dispatch('delView', view).then(({
					visitedViews
				}) => {
					if(this.isActive(view)) {
						const latestView = visitedViews.slice(-1)[0]
						if(latestView) {
							this.$router.push(latestView)
						} else {
							this.$router.push('/')
						}
					}
				})
			},
			closeOthersTags() {
				this.$router.push(this.selectedTag)
				this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
					this.moveToCurrentTag()
				})
			},
			closeAllTags() {
				this.$store.dispatch('delAllViews')
				this.$router.push('/')
			},
			openMenu(tag, e) {
				this.visible = true
				this.selectedTag = tag
				const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
					//console.log(offsetLeft)
					//      this.left = e.clientX - offsetLeft + 15 // 15: margin right
				this.left = e.clientX + 15 // 15: margin right
				this.top = e.clientY
			},
			closeMenu() {
				this.visible = false
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.tags-view-container {
		position: relative;
		.tags-view-wrapper {
			background: #fff;
			height: 34px;
			border-bottom: 1px solid #d8dce5;
			box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
			.tags-view-item {
				display: inline-block;
				position: relative;
				height: 26px;
				line-height: 25px;
				border: 1px solid #d8dce5;
				color: #495060;
				background: #fff;
				padding: 0 8px;
				font-size: 12px;
				margin-left: 5px;
				margin-top: 4px;
				text-decoration: none;
				&:first-of-type {
					margin-left: 15px;
				}
				&.active {
					background-color: #42b983;
					color: #fff;
					border-color: #42b983;
					text-decoration: none;
				}
				.el-icon-close {
					width: 16px;
					height: 16px;
					vertical-align: 2px;
					border-radius: 50%;
					text-align: center;
					transition: all .3s cubic-bezier(.645, .045, .355, 1);
					transform-origin: 100% 50%;
					background: #fff;
					color: rgba(0,0,0,0.25);
					box-sizing: border-box;
					&:before {
						transform: scale(.6);
						display: inline-block;
						vertical-align: -3px;
					}
					&:hover {
						/*background-color: #b4bccc;*/
						/*color: #fff;*/
						transform: scale(1.2);
					}
				}
			}
		}
		.contextmenu {
			margin: 0;
			background: #fff;
			z-index: 100;
			position: fixed;
			list-style-type: none;
			padding: 5px 0;
			border-radius: 4px;
			font-size: 12px;
			font-weight: 400;
			color: #333;
			box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
			li {
				margin: 0;
				padding: 7px 16px;
				cursor: pointer;
				&:hover {
					background: #eee;
				}
			}
		}
	}
	
	.tags-view-wrapper {
		.tags-view-item {}
	}
</style>