<template lang="html">
  <div  @click = "backToTop" :class="classStr" :style = "styleStr">
    <i class="el-icon-caret-top back-icon"></i>
  </div>
</template>

<script>
import classNames from 'classnames';
import $ from 'jquery';
/**
 * 用于长页面的回顶部组件
 * @type {String}
 */
export default {
  name:'back-to-top',
  data(){
    return {
      show: false,
      notShow: true
    }
  },
  created(){
    $(window).scroll(() => {
      let currTop = $(window).scrollTop();
      let {top = 100} = this;
      if(currTop > top){
        if(this.show === false){
          this.show = true;
          this.notShow = false;
        }
      } else {
        if(this.show === true) this.show = false;
        if(this.notShow === false){
          window.setTimeout(() => {
            this.notShow = true;
          }, 500);
        }
      }
    })
  },
  props:{
    className: {
      type: String
    }
  },
  computed: {
    classStr(){
      return classNames('back-to-top',{ 'to-top-hidden': !this.show }, this.className);
    },
    styleStr(){
      return this.notShow ? 'display: none;' : '';
    }
  },
  methods: {
    backToTop(){
      $(window).scrollTop(0);
    }
  }
}
</script>

<style lang="less">
  .back-to-top{
    background-color: #36648B;
    position: fixed;
    right: 15%;
    bottom: 150px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    cursor: pointer;
    transition: .3s;
    opacity: .4;
    animation: toTopFadeIn .5s;
    &:hover{
      opacity: .8;
    }
  }
  .to-top-hidden{
    /*display: none;*/
    opacity: 0;
    animation: toTopFadeOut .5s ;
  }
  @keyframes toTopFadeOut{
    from {
      opacity: .4;
      transform: translate(0, 0px);
    }
    to {
      opacity: 0;
      transform: translate(0, -10px);
    }
  }
  @keyframes toTopFadeIn{
    from {
      opacity: 0;
      transform: translate(0, -10px);
    }
    to{
      opacity: .4;
      transform: translate(0, 0);
    }
  }
  .back-icon{
    color: #fff;
    display: block;
    line-height: 50px;
    text-align: center;
    font-size: 22px;
  }
</style>
