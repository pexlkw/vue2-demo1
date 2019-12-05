import { getToken, setToken } from '@/assets/js/utils/auth';
import { apiUtils } from '@/assets/js/utils/apiUtils';
const user = {
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    Login ({ commit }, params) {
      return new Promise((resolve, reject) => {
        apiUtils.post('/auth/signin', params, response => {
          let tokenParams;
          setToken(response);
          tokenParams = getToken();
          commit('SET_TOKEN', tokenParams);
          resolve();
        });
      })
    } // login end

  }
}
export default user;
