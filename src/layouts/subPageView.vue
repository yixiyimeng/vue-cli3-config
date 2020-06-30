<template>
	<a-layout-content class="wrapper flex-1">
		<div class="pagehd flex flex-align-center">
			<a-breadcrumb class="breadcrumb flex-1">
				<a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
					<router-link v-if="item.name != name" :to="{ path: item.path }">{{ item.meta.title }}</router-link>
					<span v-else>{{ item.meta.title }}</span>
				</a-breadcrumb-item>
			</a-breadcrumb>
			<slot name="hd-button"></slot>
			<slot name="hd-right"></slot>
		</div>
		<a-card :bordered="false" class="cardbox">
			<slot></slot>
		</a-card>
	</a-layout-content>
</template>

<script>
	export default {
		name: 'subPageView',
		data() {
			return {
				breadList: []
			};
		},
		computed: {
			getTitle() {
				return this.$route.meta.title;
			}
		},
		created() {
			this.getBreadcrumb();
		},
		methods: {
			getBreadcrumb() {
				this.breadList = [];
				this.name = this.$route.name;
				this.$route.matched.forEach(item => {
					// item.meta.name === 'dashboard' ? item.path = '/dashboard' : this.$route.path === item.path
					this.breadList.push(item);
				});
			}
		},
		watch: {
			$route() {
				this.getBreadcrumb();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrapper {
		position: relative;
		padding: 10px 10px 0;
		// height: 100%;
		background: #fafbff;
	}

	.breadcrumb {
		// margin-bottom: 10px;

	}

	.pagehd {
		overflow: hidden;
		border-bottom: none;
		background: #fafbff;
		padding: 0 24px 10px;
		margin: 0 -10px 0;
		text-align: left;
		position: relative;
	}

	.pagehd::after {
		content: '';
		height: 1px;
		position: absolute;
		left: 24px;
		right: 24px;
		bottom: 0;
		background: #ddd;
	}

	.hd-right {
		float: right;
	}

	.cardbox {
		background: #fafbff;
		position: absolute;
		top: 54px;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: auto;
	}

	/deep/ .ant-form-inline .ant-form-item {
		width: 100%;
		display: flex;
		align-items: center;

		/deep/ .ant-form-item-control-wrapper {
			flex: 1;

			/deep/ .ant-calendar-picker {
				width: 100%;
			}
		}

		.ant-form-item-label {
			white-space: normal;
			line-height: 1;
			width: 6em !important;
		}
	}

	/deep/ .ant-card-body {
		padding: 0 14px;
		height: 100%;
	}
</style>
