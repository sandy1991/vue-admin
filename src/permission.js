import router from '@/router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth'
import { setTitle } from '@/utils';
import { validatenull } from '@/utils/validate';
import { asyncRouterMap } from '@/router'
NProgress.configure({ showSpinner: false })// NProgress Configuration


//定义白名单(路径不需要tag打开)
const whiteList = ['/login', '/404', '/403', '/500']

// 动态添加可访问路由表
router.addRoutes(asyncRouterMap); 

//路由进入前拦截
router.beforeEach((to, from, next) => {
    //路由进入前开始进度条
    NProgress.start() // start progress bar
    const value = to.query.src ? to.query.src : to.path;
    const label = to.query.name ? to.query.name : to.name;
    //判断路径是否属于白名单
    if (whiteList.indexOf(value) == -1) {
        store.commit('ADD_TAG', {
            label: label,
            value: value,
            query: to.query
        });
    }
    //检测是否存在token
    if (getToken()) {
        //存在token 放行
        //判断url权限（待处理）
        next();
    } else {
        //不存在token
        if (whiteList.indexOf(to.path) !== -1) {
            //白名单放行
            next()
        } else {
            //非白名单 跳转到登录页
            next('/login')
            NProgress.done();
        }
    }
    
})

//路由进入后
router.afterEach((to, from) => {
    //关闭进度条
    NProgress.done();
    setTimeout(() => {
        const tag = store.getters.tag;
        setTitle(tag.label);
        store.commit('SET_TAG_CURRENT', tag);
    }, 0);
})
