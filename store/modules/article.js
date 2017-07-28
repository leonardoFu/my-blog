import types from 'constants/mutation_types';
import articleApis from 'api/article';

const state = {
  articles: [],
  total: 0,
  currentArticle: {},
  articleCls: []
}

const getters = {
  articleCls: state => state.articleCls,
  articles: state => state.articles,
  articlesTotal: state => state.total,
  currentArticle: state => state.currentArticle
}


const actions = {
  initList({commit,state},param){
    let page = param.page || 1;
    let classId = param.clsId || '';
    return articleApis.getList(page, classId).then((result) => {
      if (result.error_code === 200) {
        commit(types.INIT_ARTICLE_LIST, result.data);
      }
      return result;
    })
  },
  initClasses({commit,state}){
    return articleApis.getClasses().then((result) => {
      if(result.error_code === 200){
        commit(types.INIT_ARTICLE_CLASS,result.data);
      }
      return result;
    })
  }
}

const mutations = {
  [types.INIT_ARTICLE_LIST](state, data = {}){
    state.articles = data.articles;
    state.total = data.total;
  },
  [types.INIT_ARTICLE_CLASS](state, data){
    state.articleCls = data;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
