import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
Vue.use(Antd)
Vue.config.productionTip = false
/* pick 获取对象值 */
import pick from 'lodash.pick'
/* vue-ls 本地缓存 */
import '@/utils/storage'
/* mock 测试数据 */
import '@/mock'
new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
