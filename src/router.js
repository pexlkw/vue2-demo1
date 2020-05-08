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
        component: () => import('./views/UserManage.vue')
      },
      {
        path: '/user-manage',
        name: 'user-manage',
        component: () => import('./views/UserManage.vue')
      },
      {
        path: '/user-profile',
        name: 'user-profile',
        component: () => import('./views/UserProfile.vue')
      }]
    },
    {
      path: '/404',
      name: '404',
      meta: {
        requiresAuth: false
      },
      component: () => import('./views/error/404.vue')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const hasLogin = store.getters.isLogin;
  if (to.path === '/login' && hasLogin) { // 登入頁且已登入時
    next();
  } else if (to.matched.some(record => record.meta.requiresAuth) && !hasLogin) { // 須登入而未登入時
    store.dispatch('UserInfo').then(() => {
      next();
    }).catch(() => {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    })
  } else { // 不須登入頁
    next();
  }
});

export default router
