import * as types from './mutation-types'

export default {
  //sidebar状态切换
  [types.SWITCH_SIDEBAR_COLLAPSE] (state, { collapse }) {
    state.sidebarCollapse = collapse
  },
  //重置高度
  [types.UPDATE_DOCUMENT_CLIENT_HEIGHT] (state, { height }) {
    state.documentClientHeight = height
  },
  //设置菜单
  [types.UPDATE_MENU_NAV_LIST] (state, list) {
    state.menuNavList = list
  },
  //添加tab
  [types.ADD_CONTENT_TAB] (state, tab) {
    state.contentTabs.push(tab)
  },
 //更新tab
  [types.UPDATE_CONTENT_TABS] (state, tabs) {
    state.contentTabs = tabs
  },
  //关闭tab
  [types.DELETE_CONTENT_TABS] (state) {
    state.contentTabs = []
  },
  //设置活动的tab
  [types.UPDATE_CONTENT_TABS_ACTIVE_NAME] (state, { name }) {
    state.contentTabsActiveName = name
  },
  //设置登录用户
  [types.SET_CURRENTUSER] (state,{currentUser}) {
    state.currentUser = currentUser
  },
}
