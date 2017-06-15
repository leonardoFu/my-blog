import Cookies from 'js-cookie';

let auth = {
  getUser : function(){
    return JSON.parse(Cookies.get('user'));
  },
  
}
export default auth;
