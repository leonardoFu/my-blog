const state = {
  logged :false,
  user:{}
};

const getter = {
  currUser:state=>state.user
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
  getter,
  actions,
  mutations
}
