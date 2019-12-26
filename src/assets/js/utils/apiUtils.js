import axios from 'axios'
import { getToken } from './auth';
import { openMsg } from '../components/alertEvent';

let config = {
  timeout: 60 * 1000, // Timeout
  baseURL: '//127.0.0.1:9090/api'
  // withCredentials: true// Check cross-site Access-Control
  // 跨域處理
}

const axiosInstanceApi = axios.create(config)
// axiosInstanceApi.interceptors.request.use(loadFunction)

let finishFunction = response => {
  return response
}

let requestPrepare = config => {
  config.headers.Authorization = getToken();
  return config;
}

let errorFunction = (error) => {
  if (error.response.status) {
    switch (error.response.status) {
      case 401: // 未登入
        console.log(401, error.message);
        openMsg('登入失敗，請重新輸入帳號與密碼', 'alert-danger');
        // alert(error.message)
        break
      case 403: // token 過期: 清除token -> 跳轉login
        console.log(403, error.message);
        alert(error.message)
        break
      case 404: // 不存在
        console.log(404, error.message);
        alert(error.message)
        break
      default:
        console.log('a', error.message, error.status);
        break
    }
    return Promise.reject(error.response);
  }
}

axiosInstanceApi.interceptors.request.use(requestPrepare);
axiosInstanceApi.interceptors.response.use(finishFunction, errorFunction);

export const apiUtils = {
  async get (name, model, callback) {
    return axiosInstanceApi
      .get(
        name,
        {
          params: model
        },
        {}
      )
      .then(response => {
        if (callback) {
          callback(response.data)
        }
      })
  },
  async post (name, model, callback, errorCallback) {
    return axiosInstanceApi.post(name, model).then(response => {
      if (callback) {
        callback(response.data)
      }
    }).catch(e => {
      if (errorCallback) {
        errorCallback(e.response)
      }
    })
  }
};
