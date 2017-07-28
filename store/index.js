import Vue from 'vue';
import Vuex from 'vuex'
import global from './modules/global';
import article from './modules/article';
Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    global,
    article
  }
})
