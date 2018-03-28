import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/home/index'
import Myiframe from '@/components/iframe/iframe.vue' 

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name:'login',component: () => import('@/views/login/index'), hidden: true },
    {
      path: '/',
      name: '主页',
      redirect: '/wel'
    }, {
      path: '/wel',
      component: Layout,
      redirect: '/wel/index',
      children: [
        {
          path: 'index',
          name: '首页',
          component:() => import('@/views/wel/index')
        }
      ]
    }, {
		path: '/myiframe',
		component: Layout,
		redirect: '/myiframe',
		children: [
			{
				path: ":routerPath",
				name: 'iframe',
				component: Myiframe,
				props: true
			}
		]

  },{
      path: '/admin',
      component: Layout,
      children: [
        {
          path: 'user',
          name: '用户管理',
          component:() => import('@/views/user/index')
        }
      ]
    }
  ]
})
