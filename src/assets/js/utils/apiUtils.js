import axios from 'axios';
import router from '@/router';
import { getToken } from './auth';
import { openAlertMsg } from '../components/alertEvent';

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

let requestPrepare = (config) => {
  config.headers.Authorization = getToken();
  return config;
}

let errorFunction = (error) => {
  if (error.response.status) {
    switch (error.response.status) {
      case 401: // 未登入
        if (error.response.data.path === '/api/auth/signin') { // 登入頁錯誤訊息
          openAlertMsg('登入失敗，請重新輸入帳號與密碼', 'alert-danger');
        } else {
          router.push('/login');
        }
        break
      case 403: // token 過期: 清除token -> 跳轉login
        console.log(403, error.message);
        router.push('/login');
        break
      case 404: // 不存在
        console.log(404, error.message);
        // router.push('/404');
        openAlertMsg(error.message, 'alert-danger');
        break
      default:
        console.log(error.message);
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
  async post (name, model, callback, errorCallback, completeCallback) {
    return axiosInstanceApi.post(name, model).then(response => {
      if (callback) {
        callback(response.data)
      }
    }).catch(e => {
      if (errorCallback) {
        errorCallback(e.response)
      }
    }).then(() => {
      if (completeCallback) completeCallback();
    })
  }
};
