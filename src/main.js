import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import i18n from './lang'
import './plugins/resdLocalStorange'
import './plugins/element.js'
import './assets/less/reset.less'

Vue.config.productionTip = false
Vue.prototype.$api = api
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
