const state = {
  logged :false,
  user:{}
};

const getters = {
  currUser:state=>state.user,
  logged:state=>state.logged
}

const actions = {

}
const mutations = {
  logout(state){
    state.logged = false;
    state.user = {};
  },
  login(state,user){
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
