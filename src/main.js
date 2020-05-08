import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import bootstrap file
import 'bootstrap' // Import js file
import 'bootstrap/dist/css/bootstrap.min.css' // Import css file
import '@fortawesome/fontawesome-free/css/all.min.css'; // import fontawesome icon
import './assets/scss/public.scss' // 共用scss

import { apiUtils } from '@/assets/js/utils/apiUtils'; // 引用封裝後的 axios
import { openAlertMsg } from '@/assets/js/components/alertEvent'; // alert

// 全域使用
Vue.prototype.$apiUtils = apiUtils;
Vue.prototype.$openAlertMsg = openAlertMsg;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
