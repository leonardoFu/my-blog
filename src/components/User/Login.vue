<template lang="html">
    <div class="wrapper login">
      <div class="login-logo">
      </div>
      <el-form :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-position = "top"
        label-width="100px"
        class = "login-form">
        <el-form-item label="用户名" prop="username" >
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <!-- <div class="login-extralinks">
        <router-link class ="login-forget">忘记密码</router-link>
      </div> -->
      <div class="login-btns">
        <el-button type="primary"
          class="login-btn"
          size="large"
          @click="onSubmit" >登录</el-button>
        <el-button
          @click="onSubmit"
          class="login-btn"
          size="large">立即注册</el-button>
      </div>
    </div>
</template>

<script>
import $ from 'jquery';

import SERVER from 'constants/server'
export default {
  data(){
    let nameNotNull = (rule,value,callback)=>{
      if(!value){
        callback('请输入用户名')
      }else{
        callback();
      }
    }
    let passNotNull = (rule,value,callback)=>{
      if(!value){
        callback('亲输入密码')
      }
      callback();
    }
    return {
      loginForm:{
        username:'',
        password:''
      },
      rules:{
        password:[{
          validator:passNotNull,
        }],
        username:[{
          validator:nameNotNull,
        }]
      },
      submitting:false
    }
  },
  methods:{
    toReg:function(){
      this.$router.push("/register");
    },
    onSubmit:function(){
      this.$refs.loginForm.validate((valid)=>{
        this.submitting = true;
        let _this = this;
        if (valid) {
          $.ajax({
            url:`${SERVER}/user/login`,
            type:'POST',
            xhrFields: {
              withCredentials: true
            },
            crossDomain:true,
            data:this.loginForm,
            success:(result)=>{
              result = JSON.parse(result);
              if(result.error_code===200){
                this.$message({
                  type:'success',
                  message:'登录成功',
                  duration:1500,
                  onClose:()=>{
                    this.$router.push('/')
                  }
                })

              }else{
                this.$message({
                  type:'error',
                  message:result.message||'登录失败'
                })
              }
              _this.submitting = false;
            },
            error:(err)=>{
              this.$message({
                type:'error',
                message:'网络异常，请稍后重试'
              })
              _this.submitting = false;
            }
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="css">
  .login{
    top:180px;
  }
  .login-logo{
    display: inline-block;
    height:150px;
    width:150px;
    left:-45px;
    margin-bottom: 20px;
    background: url(../../assets/images/login.jpg);
    background-size: cover;
    border-radius: 50%;
  }
  .login-form{
    position:relative;
    margin: 0 auto;
    width:350px;
    text-align: left;
  }
  .login-btns{
    margin-top: 30px;
  }
  .login-btn{
    width:168px;
  }
  .login-extralinks{

  }
</style>
