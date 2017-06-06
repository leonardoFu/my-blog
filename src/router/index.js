import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Upload from '@/components/upload/upload.vue'
import Register from '@/components/User/Register.vue';
import Login from '@/components/User/Login.vue';
import Marked from '@/components/demos/marked.vue';
Vue.use(Router)
export default new Router({
  routes: [
    {
      path:'*',
      name:'notfound'
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },{
      path:'/upload',
      name:'upload',
      component:Upload
    },{
      path:'/register',
      name:'register',
      component:Register
    },{
      path:'/login',
      name:'login',
      component:Login
    },{
      path:'/marked',
      name:'marked',
      component:Marked
    }
  ]
})
