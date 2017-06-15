// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
import Element from './element_ui';
import store from '../store';
import iconfont from '@/assets/fonts/iconfont.css';
import animate from 'animate.css';
/* eslint-disable no-new */
var LeoWebSite = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
