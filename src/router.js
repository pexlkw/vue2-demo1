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

function getLoginEvent () {
  if (!store.getters.isLogin && store.getters.token) { // 未登入但 localstorage 有 token時
    store.dispatch('UserInfo').then(() => {
      return store.getters.isLogin;
    });
  } else { // 已登入 or 未登入
    return store.getters.isLogin
  }
}

router.beforeEach((to, from, next) => {
  // console.log('to=', to.fullPath, '| from=', from.fullPath, to.path);
  const hasRequiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const hasLogin = getLoginEvent();
  if (to.path === '/login' && hasLogin) { // 登入頁且已登入時
    console.log('login', hasRequiresAuth, hasLogin);
    next();
  } else if (hasRequiresAuth && !hasLogin) { // 須登入而未登入時
    store.dispatch('UserInfo').then(() => {
      console.log('nnn', hasRequiresAuth, hasLogin);
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    })
  } else { // 不須登入頁
    console.log('next');
    next();
  }
});

export default router
