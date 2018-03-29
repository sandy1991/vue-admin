import Vue from 'vue'
import Router from 'vue-router';
import Layout from '@/views/home/index'
import Myiframe from '@/components/iframe/iframe.vue'

import login from '@/views/login/index.vue'
import errorPage404 from '@/components/errorPage/404.vue';
import errorPage403 from '@/components/errorPage/403.vue';
import errorPage500 from '@/components/errorPage/500.vue';


Vue.use(Router);

export default new Router({
  
});

export const asyncRouterMap = [
  { path: '/login',component: login,name: 'login'},
  { path: '*', redirect: '/404', hidden: true },
  { path: '/404', component: errorPage404, name: '404' },
	{ path: '/403', component: errorPage403, name: '403' },
	{ path: '/500', component: errorPage500, name: '500' },
  {
    path: '/',
    name: '主页',
    redirect: '/wel'
  }, {
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [{
      path: 'index',
      name: '首页',
      component: () =>
        import ('@/views/wel/index')
    }]
  }, {
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    children: [{
      path: ":routerPath",
      name: 'iframe',
      component: Myiframe,
      props: true
    }]
  }, {
    path: '/admin',
    component: Layout,
    children: [{
      path: 'user',
      name: '用户管理',
      component: () =>
        import ('@/views/user/index')
    }]
  }
]
