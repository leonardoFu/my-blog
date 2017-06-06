<template lang="html">
  <li class = "menu-item">
    <router-link :to="data.link" class="menu-item-link">{{data.name}}</router-link>
  </li>
</template>

<script>
export default {
  name:'menu-item',
  props:{
      data:{
        type:Object,
        required:true,
      }
  },
  methods:{
    handleClick:function(){

    }
  }
}
</script>
<style lang="css">
  .menu-item{
     height:50px;
     line-height:50px;
     font-size:1.3em;
  }
  .menu-item-link{
    position: relative;
    color:#fff;
  }
  .menu-item-link:hover{
    color:#fff;
  }
  .menu-item-link:visited{
    color:#fff;
  }
  .menu-item-link:after{
    content:"";
    position:absolute;
    display: block;
    top:100%;
    width:100%;
    height:0.15em;
    background-image: linear-gradient(to right,transparent 50.4%,#7CCD7C 50.3%);
    transition:background-position .4s ease;
    background-size: 200% auto;
  }
  .menu-item-link:hover:after{
    background-position:-100% 0;
  }
</style>
