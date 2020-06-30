<template>
	<div id="tags-view-container" class="tags-view-container">
		<scroll-pane ref="scrollPane" class="tags-view-wrapper">
			<a href="javascript:;" v-for="tag in viewsList" class="tags-view-item" :key="tag.url" @click="addTags(tag)" :class="{ active: activeView == tag.url }">
				<i class="material-icons iconfont" v-if="tag.icon">{{ tag.icon }}</i>
				{{ tag.name }}
			</a>
		</scroll-pane>
	</div>
</template>

<script>
import ScrollPane from './ScrollPane';
import { mapGetters, mapActions } from 'vuex';
export default {
	components: { ScrollPane },
	data() {
		return {
			visible: false,
			top: 0,
			left: 0,
			selectedTag: {},
			affixTags: []
		};
	},
	props: {
		viewsList: {
			type: Array,
			default: []
		}
	},
	watch: {
		viewsList(newValue, oldValue) {
			this.initTags();
		}
	},
	computed: {
		...mapGetters(['visitedViews', 'activeView'])
	},
	mounted() {
		this.initTags();
	},
	methods: {
		...mapActions(['addVisitedViews', 'setActiveView']),
		addTags(tag) {
			this.addVisitedViews(tag);
			this.setActiveView(tag.url);
		},
		initTags() {
			if (this.viewsList && this.viewsList.length > 0) {
				let view = this.viewsList[0];
				let viewpath = this.viewsList[0].url;
				/* 通过浏览器地址来判断，是否是tab跳转 */
				var urlpath=window.location.href;
				if (urlpath.indexOf('tabframe')>-1) {
					var index = this.viewsList.findIndex(item => item.name == '备课管理');
					view = this.viewsList[index];
					viewpath = this.viewsList[index].url;
				}
				this.addVisitedViews(view);
				this.setActiveView(viewpath);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.tags-view-container {
	height: 100%;
	// background: #125fc9;
	.tags-view-wrapper {
		.tags-view-item {
			display: inline-block;
			height: 50px;
			padding: 0 20px;
			color: #fff;
			text-decoration: none;
			vertical-align: top;
			line-height: 50px;
			font-size: 16px;
			& > i {
				font-size: 20px;
				vertical-align: -0.2em;
				margin-right: 4px;
			}
			&.active {
				// background-color: #004098;
				background-color: rgba(0, 0, 0, 0.3);
			}
		}
	}

	.contextmenu {
		margin: 0;
		background: #fff;
		z-index: 3000;
		position: absolute;
		list-style-type: none;
		padding: 5px 0;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 400;
		color: #333;
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

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
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
	.tags-view-item {
		.el-icon-close {
			width: 16px;
			height: 16px;
			vertical-align: 2px;
			border-radius: 50%;
			text-align: center;
			transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
			transform-origin: 100% 50%;
			&:before {
				transform: scale(0.6);
				display: inline-block;
				vertical-align: -3px;
			}
			&:hover {
				background-color: #b4bccc;
				color: #fff;
			}
		}
	}
}
</style>
