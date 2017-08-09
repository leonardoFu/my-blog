<template lang="html">
    <el-row type = "flex" class="articles">
      <el-col  :md = "20" :lg = "{span: 16, offset: 4}">
        <div class = "articles-main">
          <h3 class = "articles-title">{{ currentClsName }}({{ articlesTotal }})</h3>
          <div style = "min-height: 200px;">
            <ul v-if = "showList" class = "articles-list ">
              <ListItem v-for = "article in articles" :article = "article"></ListItem>
            </ul>
          </div>
          <el-pagination class = "articles-pagination"
            small
            layout = "prev, pager, next"
            :page-size = "10"
            :total = "articlesTotal">
          </el-pagination>
        </div>
      </el-col>
      <el-col  :md = "4" :lg = "4">
        <div class = "articles-right">
          <el-card class = "articles-classes">
            <div slot="header" class="clearfix">
              <span >文章分类</span>
            </div>
            <ul class = "class-list">
              <li>
                <router-link :to = "'/articles'">
                  全部
                </router-link>
              </li>
              <li v-for = "cls in articleCls" >
                <router-link :to = "'/articles/'+cls.id">
                  {{cls.name+'('+cls.count+')'}}
                </router-link>
              </li>
            </ul>
          </el-card>
        </div>
      </el-col>
    </el-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ListItem from './ListItem.vue';
export default {
  data(){
    return {
      showList: false
    }
  },
  created(){
    this.fetchListData().then(() => {
      this.fetchClsData();
    });
  },
  beforeMount(){
    // this.fetchListData().then(() => {
    //   this.fetchClsData();
    // });
  },
  methods: {
    ...mapActions([
      'initList',
      'initClasses'
    ]),
    fetchListData(){
      let clsId = this.$route.params.id;
      this.showList = false;
      return this.initList({
        page: 1,
        clsId
      }).then(() => {
        this.showList = true;
      });
    },
    fetchClsData(){
      this.initClasses().catch((e) => {
        this.$message.error('查询列表失败！');
      });
    }
  },
  computed: {
    ...mapGetters([
      'articles',
      'articlesTotal',
      'articleCls'
    ]),
    currentClsName(){
      const clsId = this.$route.params.id;
      if(clsId){
        return this.articleCls.length ? this.articleCls.filter( v => v.id === clsId)[0].name :''
      }
      return '全部';
    }
  },
  watch:{
    '$route': {
      handler(curVal, oldVal){
        if(!curVal.hash){
          this.fetchListData();
        }
      }
    }
  },
  components:{
    ListItem
  }
};

</script>

<style lang="less">

  .articles{
    width: 70%;
    max-width: 1400px;
    margin: 0 auto;
    margin-top: 80px;
    min-height: 500px;
    text-align: left;
  }
  .articles-list{
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    animation: artiFadeIn .5s;
  }
  .articles-main{
    position: relative;
  }
  .articles-title{
    margin-left: 45px;
    color:#777;
  }
  .articles-pagination{
    text-align: right;

     .el-pager .number{
       height: 30px;
       line-height: 30px;
       min-width: 30px;
       border-radius: 7px;
       font-size: 16px;
     }
     .el-pager .number:last-child{
       height: 30px;
       line-height: 30px;
       min-width: 30px;
       border-radius: 7px;
       font-size: 16px ;
     }
     .btn-prev, .btn-next{
       height: 30px !important;
       min-width: 30px !important;
       line-height: 30px !important;
     }
  }
  .articles-right{
    margin-top: 50px;
    margin-left:10px;
    .articles-classes{
      min-height: 50px;
      box-shadow: none;
    }
  }
  .class-list{
    padding-left: 1.5em;
    a{
      color: #555;
      border-bottom: 1px solid #555;
    }
    li{
      margin-bottom: 15px;
    }
  }
</style>
