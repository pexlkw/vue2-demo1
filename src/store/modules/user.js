import { getToken, setToken } from '@/assets/js/utils/auth';
import { apiUtils } from '@/assets/js/utils/apiUtils';

const user = {
  state: {
    token: getToken(),
    isLogin: false,
    userInfo: null
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
      state.isLogin = true;
    }
  },
  actions: {
    Login ({ commit }, params) { // 登入action
      return new Promise((resolve, reject) => { // json delete
        apiUtils.post('/auth/signin', params, response => {
          let tokenParams;
          setToken(response);
          tokenParams = getToken();
          commit('SET_TOKEN', tokenParams);
          resolve();
        });
      })
    },
    UserInfo ({ commit }, params) { // 取得使用者資訊
      return new Promise((resolve, reject) => {
        apiUtils.get('/authuser/getAuthUserInfo', params, response => {
          commit('SET_USERINFO', response);
          resolve();
        })
      })
    } // userinfo end
  }
}
export default user;
