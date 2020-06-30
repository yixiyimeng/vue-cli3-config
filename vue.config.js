const createThemeColorReplacerPlugin = require('./config/plugin.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
let pageMethod = require('./config/getPages.js');
pages = pageMethod.pages();
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	lintOnSave: false, //禁用eslint
	productionSourceMap: false,
	pages,
	devServer: {
		index: 'login.html', //默认启动serve 打开index页面
		open: process.platform === 'darwin',
		host: '',
		port: 8080,
		https: false,
		hotOnly: false,
		proxy: null, // 设置代理
		before: app => {}
	},
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@$', resolve('src'))
			.set('@api', resolve('src/api'))
			.set('@assets', resolve('src/assets'))
			.set('@comp', resolve('src/components'))
			.set('@views', resolve('src/views'))
			.set('@layout', resolve('src/layout'))
			.set('@static', resolve('src/static'))
			.set('@pages', resolve('src/pages'))
	},
	css: {
		loaderOptions: {
			less: {
				modifyVars: {
					'primary-color': '#125fc9',
					'border-radius-base': '2px'
				},
				javascriptEnabled: true,
			}
		}
	},
	devServer: {

	}

}
