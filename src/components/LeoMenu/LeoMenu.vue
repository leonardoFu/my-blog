<template lang="html">
  <header class="leo-menu">
    <span :class="{'menu-toggle':true,'menu-toggle-open':showMenu}" @click = "toogleMenu">
      <div class="menu-bar menu-bar-top">
      </div>
      <div class="menu-bar menu-bar-mid">
      </div>
      <div class="menu-bar menu-bar-bottom">
      </div>
    </span>
    <div v-bind:class="{ 'menu-wrap': true, 'menu-wrap-open animated bounceInLeft': showMenu}">
      <SideBar></SideBar>
    </div>
  </header>
</template>

<script>
import SideBar from './SideBar.vue';
import {mapGetters,mapMutations} from 'vuex';
export default {
  name:'leo-menu',
  created:function(){
    let _this = this;
    window.setTimeout(function(){
      _this.showMenu = true;
    },500);
  },
  data(){
    return {
      showMenu:false
    }
  },
  computed:{
    ...mapGetters({
      currUser:'currUser',
      logged:'logged'
    })
  },
  methods:{
    toogleMenu:function(){
      this.showMenu = !this.showMenu;
    },
    ...mapMutations([
      'login'
    ])
  },
  components:{
    SideBar,
  }
}
</script>

<style lang="css">
  .leo-menu{
    text-align: left;
  }
  .menu-wrap{
     position:fixed;
     top:0;
     left:-320px;
     height:100%;
     width:320px;
     background: #36648B;
     font-size:1em;
     transition: .25s all ease;
  }
  .menu-wrap-open{
    left:-40px;
    box-shadow: 2px 2px 15px 3px #B9ADAD;
  }
  .menu-toggle{
    position:fixed;
    height:44px;
    width:44px;
    top:50px;
    left:60px;
    z-index:10;
    cursor: pointer;
    transition:.25s all ease;
  }
  .menu-toggle-open{
    left:55px;
  }
  .menu-toggle>.menu-bar{
    position: absolute;
    height:4px;
    width: 80%;
    border-radius: 3px;
    background: #000;
    transition:.5s all  ease;
  }
  .menu-toggle-open>.menu-bar{
    background: #fff;
  }
  .menu-toggle>.menu-bar-top{
    top:0;
  }
  .menu-toggle>.menu-bar-mid{
    top:11px;
    left:0px;
  }
  .menu-toggle>.menu-bar-bottom{
    top:22px;
  }
  /*菜单开启状态下*/
  .menu-toggle-open>.menu-bar-top{
    top:11px;
    transform:rotate(45deg);
  }
  .menu-toggle-open>.menu-bar-mid{
    top:11px;
    left:200px;
    opacity: 0;
  }
  .menu-toggle-open>.menu-bar-bottom{
    top:11px;
    transform:rotate(-45deg);
  }
</style>
