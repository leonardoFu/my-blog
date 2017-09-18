<template lang="html">
  <li class = "comment">
    <p class = "comment-header">
      <span class = "comment-username">{{ data.username }}</span>说：
    </p>
    <div class="comment-content">
      <div v-if = "data.reference" class="comment-refer">
        <p>引用<span class = "comment-username">{{ refer.username }}</span>的发言：</p>
        <pre class = "comment-text">{{refer.text}}</pre>
      </div>
      <pre class = "comment-text">{{data.text}}</pre>
      <div class="comment-info">
        <span class = "comment-time">{{ commentTime }}</span>&nbsp;|
        <a href = "#" @click.prevent = "referThis" class = "refer-link">引用</a>
      </div>
    </div>
  </li>
</template>

<script>
import types from 'constants/mutation_types';
import $ from 'jquery';
export default {
  name: 'comment',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    referThis(){
      this.$store.commit(types['REFER_COMMENT'], this.data);
      $(window).scrollTop($('.comment-add').offset().top);
    }
  },
  computed: {
    refer: function(){
      return this.data.reference || {}
    },
    commentTime: function(){
      let { data: { created_time } } = this;
      created_time = new Date(created_time);
      let year = created_time.getFullYear();
      let month = created_time.getMonth() + 1;
      let date = created_time.getDate();
      let hour = created_time.getHours() > 10 ? created_time.getHours(): '0' + created_time.getHours();
      let minute = created_time.getMinutes() > 10 ? created_time.getMinutes(): '0' + created_time.getMinutes();

      return `${year}年${month}月${date}日 ${hour}:${minute}`
    }
  }
}
</script>

<style lang="less">
  .comment{
    position: relative;
    min-height: 120px;
    padding-left: 0.5rem;
    padding-bottom: 10px;
    font-size: 1.1rem;
    border-bottom: 1px dashed #ccc;

  }
  .comment-content{
    margin-bottom: 30px;
  }
  .comment-username{
    font-size: 1.2rem;
    margin:0 0.5rem;
    font-weight: 700;
  }
  .comment-info{
    position: absolute;
    bottom: 10px;
    right: 10%;
    font-size: 0.8rem;
  }
  .comment-text{
    padding-left: 1.5rem;
  }
  .comment-refer{
    position: relative;
    margin: 2rem;
    padding: 1.2rem;
    background: #fdf6e3;
    font-size: 1rem;
    border-radius: 10px;
    p{
      margin: 10px 0;
    }
  }
</style>
