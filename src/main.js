import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import container from './components/layout/Container.vue'
Vue.config.productionTip = false
Vue.component('c-container', container)


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
