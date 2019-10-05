import Vue from 'vue'
import App from './App.vue'

import KeenUI from 'keen-ui'
import 'keen-ui/dist/keen-ui.css'
Vue.use(KeenUI)

import 'css-baseline/css/4.css'
import GoodVue from 'good-vue'
Vue.use(GoodVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
