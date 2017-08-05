<template lang="html">
  <article class="article-container">
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
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import marked from 'marked';
import highlightStyle from 'highlight.js/styles/solarized-light.css';
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
  }
}
</script>

<style lang="less">
  .article-container{
    width: 45%;
    margin: 0 auto;
    min-height: 500px;
    padding-top: 50px;
    text-align: left;
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
      border-radius: 5px;
    }
    code{
      font-size: 16px;
      line-height: 22px;
      border-radius: 5px;
    }
    ol{
      background: #fdf6e3;
    }
    p{
      padding: 10px 0;
      line-height: 24px;
    }
  }
</style>
