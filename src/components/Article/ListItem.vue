<template lang="html">
  <li class = "articles-item">
    <h2><router-link class = "article-item-title":to = "linkToOne">{{ article.title }}</router-link></h2>
    <div class = "articles-item-info">
      发布于：{{ createdTime }} | 分类：<router-link class = "black" :to = "linkToCls">{{ article.class.name }}({{ article.class.count }})</router-link> |
      关键字：<el-tag
        v-for="tag in tags"
        :key="tag.name"
        :type="tag.type"
      >
      {{tag.name}}
      </el-tag>
    </div>
    <div class = "articles-item-info">

    </div>
    <div class="articles-item-desc">
      <h3 :id = "trimedTitle"><router-link :to = "'#'+trimedTitle">简述</router-link></h3>
      {{ article.description }}
    </div>
    <div class="articles-detail-link">
      <router-link :to = "linkToOne">查看文章</router-link>
    </div>
  </li>
</template>

<script>
export default {
  props:['article'],
  computed:{
    createdTime(){
      let time = new Date(this.article.created_time);
      return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
    },
    linkToOne(){
      return `/article/${this.article.id}`;
    },
    linkToCls(){
      return `/articles/${this.article.classId}`;
    },
    tags(){
      let {keywords = ''} = this.article;
      keywords = keywords.length > 0 ?keywords.split(',') : [];
      return [...keywords.map(v => {
          return { name: v, type: 'gray'}
      })];
    },
    trimedTitle(){
      return this.article.title.split('').filter(v => v !== ' ').join('');
    }
  }
}
</script>

<style lang="less">
  .articles-item{
    min-height: 100px;
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    text-align: left;
    animation-duration: .7s !important;
    // animation-delay: 1s;
    &>h2{
      display: inline-block;
      position: relative;
      margin: 10px 0;
    }
    .articles-item-info{
      color: #777;
      font-size: 12px;
      font-weight: 600;
      margin: 5px 0;
    }
    .articles-item-desc{
      margin-bottom: 30px;
      h3{
        margin-top: 20px;
        padding: 5px 0;
        border-bottom: 1px dashed #eee;
      }
      a:hover{
        border-bottom: 1px solid #ccc;
      }
    }
    .articles-detail-link{
      margin-bottom: 25px;
      text-align: center;
      &>a{
        color: #777;
        font-size: 0.9rem;
        transition: .3s all ease;
        border-bottom: 1px solid #777;
      }
      &>a:before{

        display: none;
      }
      a:hover{
        color: #444;
        border-bottom: 1px solid #444;
      }
    }
    .el-tag{
      margin-right: 8px;
    }
    a{
      position: relative;
      color: #555;
      font-weight:500;
      cursor: pointer;
    }

  }
  .article-item-title:before{
    content: "";
    position: absolute;
    height: 2px;
    width: 100%;
    bottom: 0;
    background-color: #555;
    transition:.2s all ease;
    transform: scaleX(0);
  }
  .article-item-title:hover:before{
    transform:scaleX(1);
  }
</style>
