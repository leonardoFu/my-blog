<template lang="html">
  <div class="menu-sidebar">
    <ul>
      <template v-for="i in data">
        <MenuItem :data="i"></MenuItem>
      </template>
    </ul>

  </div>
</template>

<script>
import data from '@/constants/menu';
import MenuItem from './MenuItem.vue';
export default {
  name:'sidebar',
  data(){
    return {
      data,
    }
  },
  components:{
    MenuItem,
  }
}
</script>

<style lang="css">
  .menu-sidebar{
    position:relative;
    min-height:100px;
    width:200px;
    top:150px;
    margin:50px 15px 0 20px;
  }
</style>
