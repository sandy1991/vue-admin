import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name:'login',component: () => import('@/views/login/index'), hidden: true },
    {
      path: '/',
      name:'home',
      component: () => import('@/views/home/index'),
      children:[
        { path: '/', name:'dashBoard2',redirect: { name: 'dashBoard' }},
        {
          path: '/krt-tabs',
          component:() =>  import('@/views/layout//krt-tabs'),
          name: '/krt-tabs',
          redirect: { name: '404' },
          desc: '内容需通过tabs展示',
          children: [
            // 以'/n'开头统一拦截, 标记为左侧菜单导航tab展示内容方式路由
            { path: '/n/dashBoard', component: () => import('@/views/home/dashBoard'), name: 'dashBoard', desc: '首页' },
            { path: '/n/user', component: () => import('@/views/user/index'), name: 'user', desc: '管理员管理' }
          ]
        }
      ],
      beforeEnter (to, from, next) {
        let token = Vue.cookie.get('token')
        if (!token || !/\S/.test(token)) {
          next({ name: 'login' })
        }
        next()
      }
    }
  ]
})
