import SERVER from 'constants/server';
import ajax from 'utils/ajax';

const getList = (pageNum,classId) => {
  let params = {
    pageNum: pageNum || 1,
  }
  console.log(classId);
  if (classId) params.classId = classId;

  return ajax.getWithCookie(`${SERVER}/articles/list`, params).then((result) => {
    return JSON.parse(result);
  })
}

const getClasses = () => {
  return ajax.getWithCookie(`${SERVER}/articles/classes`).then((result) => {
    return JSON.parse(result);
  })
}
export default {
  getList,
  getClasses
}
