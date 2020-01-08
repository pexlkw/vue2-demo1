import { getToken, setToken, removeToken } from '@/assets/js/utils/auth';
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
      state.isLogin = !!userInfo;
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
    },
    SignOut ({ commit }) { // 登出
      return new Promise((resolve) => {
        removeToken();
        commit('SET_TOKEN', '');
        commit('SET_USERINFO', '');
        resolve();
      })
    } // signOut end
  }
}
export default user;
