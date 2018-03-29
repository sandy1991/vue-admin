/**
 * 共用的模块组
 */
const common = {

    state: {
        //菜单是否收缩
        isCollapse: false, 
        //是否全屏
        isFullScren: false,
        //页面文档可视高度(随窗口改变大小)
        documentClientHeight:0,
    },

    mutations: {
        SET_COLLAPSE: (state, action) => {
            state.isCollapse = !state.isCollapse;
        },
        SET_FULLSCREN: (state, action) => {
            state.isFullScren = !state.isFullScren;
        },
        SET_DOCUMENT_CLIENT_HEIGHT: (state, documentClientHeight) => {
            state.documentClientHeight = documentClientHeight;
        }
    },

    actions:{

    }
}
export default common