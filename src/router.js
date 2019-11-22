import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/',
      // name: 'home',
      component: Home,
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
