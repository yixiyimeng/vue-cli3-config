<template>
	<a-modal title="主题" :width="800" :visible="visible" @cancel="handleCancel" :footer="false" :destroyOnClose="true" :maskClosable="false">
		<div>
			<div :style="{ marginBottom: '24px' }">
				<h3 class="setting-drawer-index-title">整体风格设置</h3>
				<div class="setting-drawer-index-blockChecbox">
					<a-tooltip>
						<template slot="title">
							暗色菜单风格
						</template>
						<div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
							<img src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" alt="dark">
							<div class="setting-drawer-index-selectIcon" v-if="navTheme === 'dark'">
								<a-icon type="check" />
							</div>
						</div>
					</a-tooltip>

					<a-tooltip>
						<template slot="title">
							亮色菜单风格
						</template>
						<div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
							<img src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" alt="light">
							<div class="setting-drawer-index-selectIcon" v-if="navTheme !== 'dark'">
								<a-icon type="check" />
							</div>
						</div>
					</a-tooltip>
				</div>
			</div>

			<div :style="{ marginBottom: '24px' }">
				<h3 class="setting-drawer-index-title">主题色</h3>

				<div style="height: 20px">
					<a-tooltip class="setting-drawer-theme-color-colorBlock" v-for="(item, index) in colorList" :key="index">
						<template slot="title">
							{{ item.key }}
						</template>
						<a-tag :color="item.color" @click="changeColor(item.color)">
							<a-icon type="check" v-if="item.color === primaryColor"></a-icon>
						</a-tag>
					</a-tooltip>

				</div>
			</div>
		</div>
	</a-modal>
</template>
<script>
	import {
		updateTheme,
		updateColorWeak,
		colorList
	} from './settingConfig'
	export default {
		data() {
			return {
				visible: false,
				colorList,
				navTheme: localStorage.getItem('navTheme') || 'dark',
				primaryColor: localStorage.getItem('primaryColor') || '#125fc9'
			}
		},
		watch: {

		},
		mounted() {
			const vm = this
			// setTimeout(() => {
			// 	vm.visible = true
			// }, 16)
			updateTheme(this.primaryColor);
		},
		methods: {
			showDrawer() {
				this.visible = true
			},
			onClose() {
				this.visible = false
			},
			toggle() {
				this.visible = !this.visible
			},

			changeColor(color) {
				if (this.primaryColor !== color) {
					// this.$store.dispatch('ToggleColor', color)
					this.primaryColor = color;
					updateTheme(color).then(da => {
						localStorage.setItem('primaryColor', this.primaryColor);
						this.$emit('sendChangeColor', color)
					})
				}
			},
			handleMenuTheme(navTheme) {
				this.navTheme = navTheme;
				localStorage.setItem('navTheme', this.navTheme);
				this.$emit('sendChangeTheme', navTheme)
			},
			show() {
				this.visible = true
			},
			handleCancel() {
				this.visible = false
			}
		}
	}
</script>

<style lang="less" scoped>
	.setting-drawer-index-blockChecbox {
		display: flex;

		.setting-drawer-index-item {
			margin-right: 16px;
			position: relative;
			border-radius: 4px;
			cursor: pointer;

			img {
				width: 48px;
			}

			.setting-drawer-index-selectIcon {
				position: absolute;
				top: 0;
				right: 0;
				width: 100%;
				padding-top: 15px;
				padding-left: 24px;
				height: 100%;
				color: #1890ff;
				font-size: 14px;
				font-weight: 700;
			}
		}
	}

	.setting-drawer-theme-color-colorBlock {
		width: 20px;
		height: 20px;
		border-radius: 2px;
		float: left;
		cursor: pointer;
		margin-right: 8px;
		padding-left: 0px;
		padding-right: 0px;
		text-align: center;
		color: #fff;
		font-weight: 700;

		i {
			font-size: 14px;
		}
	}
</style>
