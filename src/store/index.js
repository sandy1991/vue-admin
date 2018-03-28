import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './modules/user'
import tags from './modules/tags'

Vue.use(Vuex)

const state = {
  // 侧边栏, 水平折叠收起状态
  sidebarCollapse: false,
  // 页面文档可视高度(随窗口改变大小)
  documentClientHeight: 0,
  // 菜单导航
  menuNavList: [],
  // 内容区域tabs标签页
  contentTabs: [],
  contentTabsActiveName: '',
  //当前用户
  currentUser:{},
}

const store =  new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules:{
    tags
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
