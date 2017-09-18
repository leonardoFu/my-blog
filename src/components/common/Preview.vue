<template lang="html">
  <el-dialog :title="title"
   :visible="visible"
   :size ="size"
   :before-close = "handleClose">
    <el-carousel :height = "containerH"
    :autoplay = "false"
    :arrow = "arrow || 'never'"
    :initial-index = "index || 0"
    indicator-position="outside">
      <el-carousel-item v-for="image in imageList"

      :key="image">
        <img :src="image"
        alt=""
        :width = "imgWidth"
        :height = "height" >
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
    images: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean
    },
    size: {
      type: String
    },
    height: {
      type: String
    },
    width: {
      type: String
    },
    title: {
      type: String
    },
    arrow: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods:{
    handleClose(){
      this.$emit('update:visible',false);
    },

  },
  computed:{
    imageList(){
      if(Object.prototype.toString.call(this.images)=='[object Array]'){
        return this.images;
      }
      return this.images.split(',');
    },
    imgWidth(){
      return this.height || '530';
    },
    imgHeight(){
      return this.width || '300';
    },
    containerH(){
      return `${this.height || 300}px`
    }
  }
}
</script>

<style lang="css">
</style>
