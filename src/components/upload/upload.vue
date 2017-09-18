<template lang="html">
  <el-upload
    class="upload-demo"
    action="http://127.0.0.1:3000/upload"
    name = "avatar"
    :on-success = "uploadSuccess"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
import {Upload,Button} from 'element-ui';
export default {
  name:'upload',
  data(){
    return {
      fileList:[]
    }
  },
  methods:{
    uploadSuccess:()=>{
    }
  }
}
</script>

<style lang="css">
</style>
