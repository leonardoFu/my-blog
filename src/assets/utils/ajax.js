import { ajax } from 'jquery';
const myAjax = {
  send(option){
    return ajax(option);
  },
  withCookie(option){
    const cookieOpt ={
      xhrFields: {
        withCredentials: true
      },
      crossDomain:true
    }
    return Object.assign({},option,cookieOpt)
  },
  /**
   * 封装跨域携带cookies的post方法
   * @param  {String} url      请求地址
   * @param  {Object} data     请求携带的数据
   * @param  {function} success  成功回调
   * @param  {function} error    失败回调
   * @param  {Object} extraOpt 其余选项
   * @return {Object}          返回jquery的deferd对象
   */
  reqConstructor(method,url,data,onSuccess,onError,extraOpt){
    const {send,withCookie} = this;
    let options = {
      url,
      method,
      data,
      success(result){
        onSuccess = onSuccess || function(){};
        try {
          objResult = JSON.parse(result);
        } catch(e) {
            onSuccess(result);
          return;
        }
        onSuccess(objResult);
      },
      error:onError||null,
    };
    return send(withCookie(options));
  },

}
export default {
  getWithCookie:myAjax.reqConstructor.bind(myAjax,'GET'),
  postWithCookie:myAjax.reqConstructor.bind(myAjax,'POST'),
  putWithCookie:myAjax.reqConstructor.bind(myAjax,'PUT'),
  delWithCookie:myAjax.reqConstructor.bind(myAjax,'DELETE'),
  parseJSON(result){
    return JSON.parse(result);
  }
}
