<template>
  <div id="app">
    <leo-menu></leo-menu>
    <user-panel></user-panel>
    <router-view></router-view>
  </div>
</template>

<script>
import define from '@/assets/css/default.less';
import Menu from './components/LeoMenu/LeoMenu.vue';
import UserBar from './components/User/UserBar.vue';
export default {
  name: 'app',
  components:{
    'leo-menu':Menu,
    'user-panel':UserBar
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial,微软雅黑, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color:454545;
  }
  body {
    font-family: 'Montserrat', Arial, serif;
  }
</style>
