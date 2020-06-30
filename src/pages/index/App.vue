<template>
	<a-locale-provider :locale="locale">
		<div id="app">
			<page-view></page-view>
		</div>
	</a-locale-provider>
</template>
<script>
	import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
	import pageView from '@/pages/index/views/pageView';
	export default {
		name: 'home',
		components: {
			pageView
		},
		data() {
			return {
				locale: zhCN
			};
		},

		mounted() {
			// console.log(process.env.VUE_APP_SRC);
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
		// text-align: center;
		color: #2c3e50;
	}
</style>
