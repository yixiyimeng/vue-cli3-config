import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
Vue.use(Antd)
import subPageView from '@/layouts/subPageView'
Vue.component('subPageView',subPageView)
Vue.config.productionTip = false
/* pick 获取对象值 */
import pick from 'lodash.pick'
/* vue-ls 本地缓存 */
import '@/utils/storage'
import filterbar from '@/components/filterbar'
import STable from '@/components/Table';
/* mock 测试数据 */
import '@/mock'
import './permission'//权限路由处理
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
