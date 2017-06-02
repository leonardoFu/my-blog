<template lang="html">
  <div class="user-bar">
    <el-row >
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

  </div>
</template>

<script>
import {Row,Col,Tooltip} from 'element-ui'
import style from './less/user.less';
export default {
  name:'user'
}
</script>

<style lang="less" scoped>

</style>
