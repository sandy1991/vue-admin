/**
 * 用户模块组
 */
const user = {

  state : {
     userInfo:{},
     permission: {},
     menu: [],
  },

  mutations:{
    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = permission;
    },
    SET_MENU: (state, menu) => {
        state.menu = menu;
    },
  },

  actions:{

  },
  
}
export default user