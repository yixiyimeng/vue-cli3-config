import Vue from 'vue'
import App from './App.vue'
import "@babel/polyfill" //用来兼容ie
// import '@/components' //按需加载的ant-design 样式
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
Vue.use(Antd)
/* pick 获取对象值 */
import pick from 'lodash.pick'
/* vue-ls 本地缓存 */
import '@/utils/storage'
/* mock 测试数据 */
import '@/mock'
Vue.config.productionTip = false
/* post 请求 */
import {
	postAction
} from '@/api';
Vue.prototype.$postAction = postAction;
Vue.prototype.$pick = pick;
new Vue({
	render: h => h(App)
}).$mount('#app')
