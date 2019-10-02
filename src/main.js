import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store/index'
import 'ant-design-vue/dist/antd.css'
import './assets/style/reset.css'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
