<template lang="html">
  <div class="wrapper reg-form">
    <h1 class="reg-title">注册成为我的小伙伴</h1>
    <el-form :model="regForm"
      :rules="rules"
      ref="regForm"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item label="用户名" prop="username" >
        <el-input v-model="regForm.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname" >
        <el-input v-model="regForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="regForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="password2">
        <el-input v-model="regForm.password2" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="regForm.mail" placeholder="输入邮箱方便联系您">
        </el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="regForm.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="reg-uplaod">
        <span class="avatar-label">上传头像</span>
          <el-upload
            class="upload-avatar"
            :action="`${SERVER}/file`"
            name = "avatar"
            :before-upload ="beforeUpload"
            :on-success = "uploadSuccess"
            :on-preview = "previewUpload"
            :on-remove ="delUploaded"
            :file-list="fileList">
            <el-tooltip content="只能上传一张头像，最大：2MB" placement="bottom" >
              <el-button size="small" >点击上传</el-button>
            </el-tooltip>
          </el-upload>
        <div class="clear">
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('regForm')">注册</el-button>
        <el-button>不了，我还是个宝宝</el-button>
      </el-form-item>
    </el-form>
    <Preview :images = "image"
      :visible.sync = "showAvatar"
      size = "tiny"
      height="500px"
      title = "头像">
    </Preview>
  </div>
</template>

<script>
import $ from 'jquery';
import SERVER from 'constants/server'
const SUPPURT_EXT = ['jpg','jpeg','png','gif'];
import Preview from '../common/Preview.vue';
export default {
  created(){

  },
  data(){
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      let reg = /^[0-9a-z_A-Z]+$/;
      if (!value) {
        callback(new Error('密码不能为空！'));
      } else if (value.length>16||value.length<8) {
        callback(new Error('密码长度为8到16位！'));
      } else if (!reg.test(value)){
        callback(new Error('密码只能由字母、数字和下划线组成！'));
      }else {
        callback();
      }
    };
    let validateName = (rule,value,callback) =>{
      let reg = /^[0-9a-z_A-Z]+$/
      if(!value){
        callback(new Error('用户名不能为空！'))
      }else if(!reg.test(value)){
        callback(new Error('用户名只能由字母、数字和下划线组成！'))
      }else if(value.length>16){
        callback(new Error('用户名不能超过16个字符！'))
      } else {
         checkNameExists(value,callback);
      }
    }
    let checkNameExists = (name,callback) =>{
      let exist = false;
      $.get(`${SERVER}/user/exists?username=${name}`).then((result)=>{
        if(result.error_code ===200){
          exist = result.data.exists;
          if(exist){
            callback(new Error('用户名已存在！'))
          }else{
            callback();
          }
        }
      })
    }
    return {
      fileList:[],
      submitting:false,
      regForm:{
        username:'',
        password:'',
        password2:'',
        nickname:'',
        mail:'',
        sex:'1',
        avatar:''
      },
      rules:{
        username:[{
          required:true,message:'用户名不能为空！',
        },{
          validator:validateName,
          trigger: 'blur'
        }],
        nickname:[{
          required:true,message:'昵称不能为空！',
        },{
          max:10,
          message:'昵称不能超过10位！',
          trigger:'blur'
        }],
        password:[{
          required:true,message:'请填写密码'
        },{
          validator:validatePass,
          trigger:'blur'
        }],
        password2:[{required:true,message:'请重复密码'},{
           validator: validatePass2,
           trigger: 'blur'
        }],
        mail:[{
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }]
      },
      showAvatar:false

    }
  },
  computed:{
    SERVER:function(){
      return SERVER;
    },
    image:function(){
      return this.fileList[0]?`${SERVER}/${this.fileList[0].url}`:' ';
    }
  },
  methods:{
    uploadSuccess:function(response, file, fileList){
      let {avatar} = this.regForm;
      this.regForm.avatar =response.data.fileId;
      this.fileList.push(response.data.file);
    },
    beforeUpload:function(file){
      if(this.fileList.length>=1){
        this.$message({
          message:'只能上传一张头像！',
          type:'warning'
        });
        return false;
      }

      if(file.size>2*Math.pow(1024,2)){
        this.$message({
          message:'头像最大不能超过2MB！',
          type:'warning'
        });
        return false;
      }

      let nameArr = file.name.split('.');
      let fileExt = nameArr[nameArr.length-1].toLowerCase();
      if(SUPPURT_EXT.indexOf(fileExt)<0){
        this.$message({
          message:`头像支持图片格式：${SUPPURT_EXT.join(',')}`,
          type:'warning'
        });
        return false;
      }
    },
    previewUpload:function(file){
      this.showAvatar = true;
    },
    delUploaded:function(file){
      let _this = this;
      $.ajax({
        url:`${SERVER}/file`,
        type:'DELETE',
        data:file,
        success:(result)=>{
          // result = result?JSON.parse(result):{};
          if(result.error_code === 200){
            _this.fileList.splice(1,_this.fileList.length-1);
          }else{
            _this.$message({
               message: '删除失败',
               type:'error'
            })
          }
        }
      })
    },
    onSubmit:function(formName){
      this.submitting = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          $.post(`${SERVER}/user`,this.regForm).then((result)=>{
            this.$message({
              showClose: true,
              message: '注册成功,3秒后跳转',
              type: 'success',
              onClose:()=>{
                this.$router.push("/");
              }
            });
          })
        } else {
          return false;
        }
      });
    }
  },
  components:{
    Preview,
  }
}
</script>

<style lang="css">
  .reg-form{
     width:600px;
     min-height:500px;
     text-align: left;
  }
  .upload-avatar{
    float:left;
  }
  .reg-title{
    text-align: center;
    padding-left: 20px;
    margin-bottom: 50px;
  }
  .reg-uplaod{
    margin-bottom:50px;
  }
  .avatar-label{
    display: inline-block;
    height:20px;
    line-height:25px;
    color:#48576a;
    float:left;
    padding-left:32px;
    font-size:14px;
    margin-right:10px;
  }
  .clear{
    clear:both;
  }
</style>
