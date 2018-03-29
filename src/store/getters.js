const getters = {
    isCollapse: state => state.common.isCollapse,
    isFullScren: state => state.common.isFullScren,
    documentClientHeight: state => state.common.documentClientHeight,

    userInfo:state => state.user.userInfo,
    permission:state => state.user.permission,
    menu:state => state.user.menu,

    tag: state => state.tags.tag,
    tagList: state => state.tags.tagList,
    tagCurrent: state => state.tags.tagCurrent,
    tagWel: state => state.tags.tagWel,

}
export default getters
