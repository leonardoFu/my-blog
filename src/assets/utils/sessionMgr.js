const sessionMgr = {
  set(key, data, isJSON){
    if(isJSON){
      window.sessionStorage.setItem(key, JSON.stringify(data));
    } else {
      window.sessionStorage.setItem(key, data.toString());
    }
  },
  get(key){
    let result;
    try {
      result = JSON.parse(window.sessionStorage.getItem(key));
    } catch(e) {
      result = window.sessionStorage.getItem(key);
    }
    return result;
  },
  remove(key){
    window.sessionStorage.removeItem(key);
  }
}
export default sessionMgr;
