import Cookies from 'js-cookie'
let auth = {
  getAttr(key){
    return JSON.parse(Cookies.get(key));
  },
  getUser(){
    return getAttr.user;
  },
  getErrTime:function(){
    return Number.parseInt(Cookies.get('error_time'));
  }
}
export default auth;
