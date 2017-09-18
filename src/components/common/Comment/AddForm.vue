<template lang="html">
  <div class="comment-add">
    <el-form ref = "addForm" label-position="top" :model = "formData" :rules="rules">
      <el-form-item label="您的留言"  prop="text">
        <el-input type = "textarea" :rows = "10" v-model="formData.text"></el-input>
      </el-form-item>
      <el-form-item label="您的大名" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="user_email">
        <el-input v-model="formData.user_email"></el-input>
      </el-form-item>
      <el-form-item label="个人网址" prop="link">
        <el-input v-model="formData.link"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class = "comment-submit" type="primary" @click="submit">提交</el-button>
        <el-checkbox
         v-if = "currentRefer.id"
         :true-label="1"
         :false-label="0"
         v-model = "formData.isRefer"
        >
          引用
          <span class="refer-username">{{currentRefer.username}}</span>
          的发言
        </el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
  name: 'comment-add',
  data(){
    let checkMail = (rule, value, callback) => {
      let reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
      if(!reg.test(value)){
        callback('请填写合法的邮箱地址');
      } else {
        callback();
      }
    }
    return {
      formData: {
        username: '',
        text: '',
        user_email: '',
        link: '',
        isRefer: 1,
        article_id: '',
        reference_id: ''
      },
      rules: {
        text: [
          {required: true, message: '请填写您的留言内容', trigger: 'blur'},
          {min: 1, max: 150, message: '长度不能超过150字', trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请填写您的大名', trigger: 'blur'},
          {min: 1, max: 30, message: '长度不能超过30', trigger: 'blur'}
        ],
        user_email: [
          {required: true, message: '请留下您的邮箱', trigger: 'blur'},
          {validator: checkMail, trigger: 'blur'}
        ],
      }
    }
  },
  computed:{
    ...mapGetters([
      'currentRefer',
      'currentArticle'
    ])
  },
  methods: {
    submit(){
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          let { formData, currentArticle = {}, currentRefer = {}} = this;
          formData.article_id = currentArticle.id;

          if(formData.isRefer){
            formData.reference_id = currentRefer.id;
          }
          this.$store.dispatch('comment', formData).then((result) => {
            if(result.error_code !== 200){
              this.$message.error('评论失败！');
            } else {
              this.$message({
                message: '评论成功！',
                type: 'success'
              });
              this.$refs.addForm.resetFields();
            }
          })

        }
      })
    }
  }
}
</script>

<style lang="less">
 .comment-add{
   width: 400px;
   textarea{
     width: 800px;
   }
 }
 .refer-username{
   font-weight: 700;
 }
 .comment-submit{
   margin-right: 20px;
 }
</style>
