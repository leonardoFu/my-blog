import Cookies from 'js-cookie'
let auth = {
  getAttr(key){
    return JSON.parse(Cookies.get(key));
  },
  getUser(){
    return getAttr.user;
  }
}
export default auth;
