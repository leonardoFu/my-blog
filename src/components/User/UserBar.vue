<template lang="html">
  <div class="user-bar">
    <el-row v-if="!(logState||logged)">
      <el-col :span = "11">
        <el-tooltip content="我认识豪爷我骄傲！" placement="bottom" >
          <router-link to = "/login">
             登录
          </router-link>
        </el-tooltip>
      </el-col>
      <el-col :span = "12">
        <el-tooltip content="未满十八岁请在家长指导下认识豪爷！" placement="bottom" >
          <router-link to = "/register">
            注册
          </router-link>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row v-if="logState||logged">
      <img :src="avatar" class="userbar-avatar" alt="">
      <div class="userbar-name">
        {{username}}
      </div>
      <div class="userbar-oprators">
        <i class = "el-icon-setting"></i>
        <i class = "iconfont icon-tuichu"></i>
      </div>
    </el-row>
  </div>
</template>

<script>
import {Row,Col,Tooltip} from 'element-ui'
import {mapGetters} from 'vuex'
import style from './less/user.less';
import SERVER from 'constants/server';
import Cookies from 'js-cookie';
export default {
  name:'user',
  data(){
    let logged,user;
    if(Cookies.get('user')){
      logged = true;
      user = JSON.parse(Cookies.get('user'));
    }
    return {
      logged,
      user
    }
  },
  updated(){
    if(this.logged!==this.logState){
      this.logged = this.logState;
      this.user = JSON.parse(Cookies.get('user'))
    }
  },

  computed:{
    ...mapGetters({
      logState:'logged'
    }),
    avatar(){
      if(this.user){
        return this.user.avatar?`${SERVER}/${this.user.avatar}`:'';
      }else{
        return '';
      }
    },
    username(){
      return this.user?this.user.nickname:'';
    }
  }

}
</script>

<style lang="less" scoped>
  .userbar-avatar{
    height:70px;
    width:70px;
    border-radius:50%;

  }
  .userbar-oprators{
    margin:5px 0;
  }
  .userbar-oprators i{
    margin:0 7px;
    font-size:22px;
    color:#20a0ff;
    cursor:pointer;
  }
</style>
