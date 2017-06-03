import Cookies from 'js-cookie';

let auth = {
  getUser : function(){
    return JSON.parse(Cookies.get('user'));
  },
  getErrTime:function(){
    return Number.parseInt(Cookies.get('error_time'));
  }
}
export default auth;
