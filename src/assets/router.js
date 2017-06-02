import Vue from 'Vue';
import Router from 'vue-router';

import Container from '../components/Container.vue';

Vue.use(Router);

export default new Router({
	routes:[
		{path:'/index',name:'container',component:Container}
	]
});
