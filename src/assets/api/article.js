import SERVER from 'constants/server';
import ajax from 'utils/ajax';

const getList = (pageNum,classId) => {
  let params = {
    pageNum: pageNum || 1,
  }
  if (classId) params.classId = classId;

  return ajax.getWithCookie(`${SERVER}/articles/list`, params).then(ajax.parseJSON)
}

const getClasses = () => {
  return ajax.getWithCookie(`${SERVER}/articles/classes`).then(ajax.parseJSON)
}

const getOne = (id) => {
  return ajax.getWithCookie(`${SERVER}/articles/article/${id}`).then(ajax.parseJSON)
}

const addComment = (newComment) => {
  return ajax.postWithCookie(`${SERVER}/articles/comment`, newComment).then(ajax.parseJSON)
}
export default {
  getList,
  getClasses,
  getOne,
  addComment
}
