import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store/index'
import 'ant-design-vue/dist/antd.less'
import './assets/style/reset.css'
import promiseFinally from 'promise.prototype.finally'
import { message } from 'ant-design-vue'

message.config({ maxCount: 1 })
promiseFinally.shim()
sessionStorage.clear()
Vue.prototype.routeView = (address) => { router.push({ path: address }) }
Vue.prototype.routeBack = () => { router.go(-1) }
Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
