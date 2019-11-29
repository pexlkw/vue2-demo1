import axios from 'axios'

let config = {
  timeout: 60 * 1000, // Timeout
  baseURL: '//08ef4fc4.ngrok.io/api'
  // withCredentials: true// Check cross-site Access-Control
  // 跨域處理
}

const axiosInstanceApi = axios.create(config)
// axiosInstanceApi.interceptors.request.use(loadFunction)

let finishFunction = response => {
  return response
}
let errorFunction = error => {
  alert(error.message + 'tess')
  if (error.response.status) {
    switch (error.response.status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        console.log(`401, ${error.mssage}`);
        alert(error.message)
        break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
      case 403:
        console.log(`403, ${error.mssage}`);
        alert(error.message)
        break
        // 404请求不存在
      case 404:
        console.log(`404, ${error.mssage}`);
        alert(error.message)
        break
      default:
        console.log(`${error.mssage}`);
        alert(error.message)
        break
    }
    return Promise.reject(error.response);
  }
}
axiosInstanceApi.interceptors.response.use(finishFunction, errorFunction)

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
