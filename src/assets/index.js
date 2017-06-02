
import Vue from 'Vue';
Vue.config.debug = true;//开启错误提示
import VueRouter from 'vue-router';

import Container from './components/Container.vue';
import Favlist from './components/Favlist.vue';
Vue.use(VueRouter);


let router =  new VueRouter({
	routes:[
		{path:'/index',name:'Favlist',component:Favlist}
	]
});

const app = new Vue({
	el:'#app',
	router,
	render: h => h(Container)
	// template:'<Container/>',
	// components:{Container}
});
// };
