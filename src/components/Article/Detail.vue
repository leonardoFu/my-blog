<template lang="html">
  <article v-if = "currentArticle.content" class="article-container">
    <div class="article-head">
      <h1>{{currentArticle.title}}</h1>
      发布于{{createdTime}} | 分类:
      <router-link class = "black" :to = "'/articles/' + articleClsId">
        {{ articleCls }}
      </router-link>
    </div>
    <div class="article-body">
      <h2>简述</h2>
      <div class="article-desc">
        {{ currentArticle.description }}
      </div>
      <h2>正文</h2>
      <div v-html = "compiledMarkdown">
      </div>
    </div>
    <Comments :comments = "currentArticle.comments || []"></Comments>
    <BackToTop></BackToTop>
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import marked from 'marked';
import highlightStyle from 'highlight.js/styles/solarized-light.css';
import Comments from '@/components/common/Comment/List';
import BackToTop from '@/components/common/ToTop.vue';
export default {
  name: 'article-detail',
  created(){
    this.initArticle(this.$route.params.id);
  },
  methods: {
    ...mapActions([
      'initArticle'
    ])
  },
  computed: {
    ...mapGetters([
      'currentArticle'
    ]),
    createdTime(){
      let time =  this.currentArticle ? this.currentArticle.created_time : '';
      if(time){
        time = new Date(time);
        return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
      }
    },
    articleCls(){
      let { articleCls } = this.currentArticle;
      if(articleCls){
        return `${articleCls.name}(${articleCls.count})`;
      }
      return '';
    },
    articleClsId(){
      return this.currentArticle.classId;
    },
    compiledMarkdown: function () {
      let renderer = new marked.Renderer();
      renderer.code = (code, lang) => {
        code = require('highlight.js').highlightAuto(code,['javascript','java', ]).value
        return `<pre><code class = "hljs ${lang}">${code}</code></pre>`;
      }
      marked.setOptions({
        renderer
      })
      return marked(this.currentArticle.content || '', { sanitize: true })
    }
  },
  components: {
    Comments,
    BackToTop
  }
}
</script>

<style lang="less">
  @keyframes artiFadeIn{
    from {
      opacity: 0;
      transform: translate(0, -20px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  .article-container{
    width: 50%;
    margin: 0 auto;
    min-height: 500px;
    padding-top: 50px;
    text-align: left;
    animation: artiFadeIn .5s;
    & h2{
      padding-bottom: 10px;
      border-bottom: 1px dashed #ccc;
      font-weight: 400;
    }
  }
  .article-head{
    color: #b5b1b1;
    font-size: 14px;
    text-align: center;
    margin-bottom: 30px;
    & h1{
      font-size: 36px;
      font-weight: 400;
      color: #000;
    }
  }

  .article-body{
    &>h2{
      font-size: 30px;
      border: none;
    }
    li{
      padding: 7px 0;
      line-height: 24px;
      list-style: inherit;
      border-radius: 10px;
    }
    p>code{
      background: #fdf6e3;
      padding: 3px;
      border-radius: 3px;
    }
    pre>code{
      font-size: 16px;
      line-height: 22px;
      border-radius: 10px;
      padding: 15px;
    }
    ol{
      background: #fdf6e3;
      border-radius: 10px;
    }
    p{
      padding: 10px 0;
      line-height: 24px;
    }
  }
</style>
