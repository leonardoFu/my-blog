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
        <el-form-item v-if="showValidateCode" label="验证码" prop="validateCode">
          <el-row>
            <el-col :span = "17">
              <el-input v-model="loginForm.validateCode"></el-input>
            </el-col>
            <el-col :span="6" :offset = "1">
              <img :src="validateCode" height="50" @click="changeValiCode" alt="">
            </el-col>
          </el-row>
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
          @click="toReg"
          class="login-btn"
          size="large">立即注册</el-button>
      </div>
    </div>
</template>

<script>
import $ from 'jquery';
import auth from '../../../utils/auth';
import SERVER from 'constants/server';
import Cookies from 'js-cookie';
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
    let error_time = Cookies.get('error_time');
    let showVali = error_time>2;

    return {
      loginForm:{
        username:'',
        password:'',
        validateCode:'',

      },
      rules:{
        password:[{
          validator:passNotNull,
        }],
        username:[{
          validator:nameNotNull,
        }]
      },
      submitting:false,
      showValidateCode:showVali,
      validateCode:`${SERVER}/user/valicode`
    }
  },
  computed:{
  },
  methods:{
    toReg:function(){
      this.$router.push("/register");
    },
    changeValiCode:function(){
      this.validateCode = `${SERVER}/user/valicode?date=${new Date()}`
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
                if(auth.getErrTime()>2){
                  _this.showValidateCode = true;
                }
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
