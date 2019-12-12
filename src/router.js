import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
// import { apiUtils } from '@/assets/js/utils/apiUtils'

// 頁面
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        requiresAuth: false
      },
      component: () => import('./views/Login.vue')
      // componet: Login
    },
    {
      path: '/',
      // name: 'home',
      component: Home,
      meta: {
        requiresAuth: true // 是否須要登入權限才可以進到頁面
      },
      children: [{
        path: '', // 預設的頁面
        name: 'home',
        component: () => import('./views/Datatable.vue')
      },
      {
        path: '/datatable',
        name: 'datatable',
        component: () => import('./views/Datatable.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('./views/About.vue')
      }]
    }
  ]
})

/**
 * 判斷 token 是否有過期,
 */
// const isLogin1 = () => {
//   if (!store.getters.isLogin && store.getters.token) { // 未登入但 localstorage 有 token時
//     const params = {
//       token: store.getters.token
//     }
//     apiUtils.get('/auth/signin.json', params, response => {
//       return !!(response.auth); // 是否token 有過期
//     });
//   } else {
//     return store.getters.isLogin;
//   }
// }

router.beforeEach((to, from, next) => {
  console.log('to=', to.fullPath, '| from=', from.fullPath, to.path);
  const isLogin = store.getters.isLogin;
  const hasRequiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (to.path === '/login' && isLogin) { // 登入頁且已登入時
    next();
  } else if (hasRequiresAuth && !isLogin) { // 須登入而未登入時
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next();
  }
})

export default router
