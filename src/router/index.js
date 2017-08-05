import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Upload from '@/components/upload/upload.vue'
import Register from '@/components/User/Register.vue';
import Login from '@/components/User/Login.vue';
import ArticleList from '@/components/Article/List.vue';
import ArticleDetail from '@/components/Article/Detail.vue';
import Markdown from '@/components/Demos/marked.vue';
Vue.use(Router);

const routes = [
  {
    path:'*',
    name:'notfound'
  }, {
    path: '/',
    name: 'Hello',
    component: Hello
  }, {
    path:'/upload',
    name:'upload',
    component:Upload
  }, {
    path:'/register',
    name:'register',
    component:Register
  }, {
    path:'/login',
    name:'login',
    component:Login
  }, {
    path: '/markdown',
    name: 'markdown',
    component: Markdown
  }, {
    path: '/articles',
    name: 'articles',
    component: ArticleList,
    children: [
      { path: '/articles/:id', component: ArticleList },
    ]
  }, {
    path: '/article/:id',
    name: 'article-detail',
    component: ArticleDetail
  },
]

export default new Router({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
      // 如果你的連結是帶 # 這種
      // to.hash 就會有值(值就是連結)
      // 例如 #3
      if (to.hash) {
        return {
          // 這個是透過 to.hash 的值來找到對應的元素
          // 照你的 html 來看是不用多加處理這樣就可以了
          // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
          selector: to.hash
        }
      }
    }

})
