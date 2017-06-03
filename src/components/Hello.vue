<template>
  <div class="hello-page">
	  <div class="user-logo">
	  </div>
    <h1>感受到满屏幕的帅气了么？</h1>
    <h2>没有，我就再长胖一点</h2>
    <h3>弱弱地补充一句：欢迎来到豪爷的个人网站</h3>
    <!-- <p>在这里，您可以：</p> -->
  </div>
</template>

<script>
import SERVER from 'constants/server';
export default {
  	name: 'hello',
    created:function(){
      // $.get(SERVER+'/user').then((result)=>{
      //   console.log(reuslt);
      // })
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello-page>h1{
    text-align: center;
  }
  .user-logo{
    display: inline-block;
    position:relative;
    height:150px;
    width:150px;
    left:-20px;
    margin-top:60px;
    background-image: url('../assets/images/happycat.gif');
    background-size: cover;
    border-radius: 50%;
  }
</style>
