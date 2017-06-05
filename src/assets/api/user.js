import $ from 'jquery';
import SERVER from 'constants/server';

let login = (formData)=>{
  return $.ajax({
    url:`${SERVER}/user/login`,
    type:'POST',
    xhrFields: {
      withCredentials: true
    },
    crossDomain:true,
    data:formData
  })
}
export default {
  login
}
