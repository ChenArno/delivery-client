import axios from 'axios'
import {Message} from 'element-ui'

const timeout = 1000 * 60 * 5;
let baseURL = process.env.BASE_API;
const service = axios.create({
  // headers:{
  //   'Content-Type':'application/json;charset=utf-8'
  // },
  baseURL,
  timeout
});
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log("拦截器===>" + error);
  Promise.reject(error);
})
service.interceptors.response.use(response => {
  return response.data
}, err => {
  Message({
    showClose: true,
    message: '网络异常，请稍候再试',
    type: 'error'
  });
  return Promise.reject(err);
});
export default service