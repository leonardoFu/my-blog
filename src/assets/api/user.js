import SERVER from 'constants/server';
import ajax from 'utils/ajax';
let login = (formData) => {
  return ajax.postWithCookie(`${SERVER}/user/login`,formData);
}
export default {
  login
}
