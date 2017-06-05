import types from 'constants/mutation_types';
import {Message} from 'element-ui';
import userApis from 'api/user';
import Cookies from 'js-cookie';

const state = {
  logged :false,
  user:{}
};

const getters = {
  currUser:state=>state.user,
  logged:state=>state.logged
}

const actions = {
  login({commit,state},formData){
    return new Promise((res,rej)=>{
      userApis.login(formData).done((result)=>{
          result = JSON.parse(result);
          if(result.error_code ===200){
            let user = JSON.parse(Cookies.get('user'));
            commit(types.LOG_IN,user)
            res(result.message);
          }else{
            rej(result.message);
          }
      }).fail((err)=>{
        rej(err);
      })
    })
  }
}
const mutations = {
  [types.LOG_OUT](state){
    state.logged = false;
    state.user = {};
  },
  [types.LOG_IN](state,user){
    console.log(state);
    console.log(user);

    state.logged = true;
    state.user = user;
  },
}
export default{
  state,
  getters,
  actions,
  mutations
}
