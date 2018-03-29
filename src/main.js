// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import './permission' // 权限
import router from './router';
import store from '@/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/krt.css';
import animate from 'animate.css'
import API from './api';
import { hasPermission } from '@/utils'
import '@/mock' 

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.API = API;
Vue.prototype.hasPermission = hasPermission // 挂载权限方法

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
