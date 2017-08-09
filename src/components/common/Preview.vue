<template lang="html">
  <el-dialog :title="title" :visible="visible" :size ="size" :before-close = "handleClose">
    <el-carousel :height = "height" indicator-position="outside">
      <el-carousel-item v-for="image in imageList" :key="image">
        <img :src="image" alt="" :width = "imgWidth" :height = "height" >
      </el-carousel-item>
    </el-carousel>
 </el-dialog>
</template>

<script>
/**
 * 预览弹窗，针对上传的图片进行预览
 * @type {Object}
 */
export default {
  data(){
    return{};
  },
  props:{
    images:{
      type: String,
      required: true
    },
    visible:{
      type:Boolean
    },
    size:{
      type:String
    },
    height:{
      type:String
    },
    title:{
      type:String
    }
  },
  methods:{
    handleClose(){
      this.$emit('update:visible',false);
    },

  },
  computed:{
    imageList(){
      return this.images.split(',');
    },
    imgWidth(){
      switch(this.size){
        case 'tiny':
          return '530'
      }
    },
    imgHeight(){
      switch(this.size){
        case 'tiny':
          return '300'
      }
    }
  }
}
</script>

<style lang="css">
</style>
