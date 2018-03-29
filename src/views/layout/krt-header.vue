<template>
    <header class="krt-header">
        <div class="logo" v-if="!isCollapse">
            <span class="logo-name">Krt-admin</span>
        </div>
        <a class="sidebar-toggle" @click="switchSidebarCollapseHandle()" :class="[{ 'sidebar-toggle-collapse': isCollapse }]">
            <i class="iconfont icon-navicon"></i>
        </a>
        <div class="header-tag">
            <el-menu  class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">xx子平台1</el-menu-item>
            <el-menu-item index="2">xx子平台2</el-menu-item>
            <el-menu-item index="3">xx子平台3</el-menu-item>
            <el-submenu index="4">
                <template slot="title">x子平台</template>
                <el-menu-item index="2-1">子集平台1</el-menu-item>
                <el-menu-item index="2-2">子集平台2</el-menu-item>
                <el-menu-item index="2-3">子集平台3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">子集平台4</template>
                    <el-menu-item index="2-4-1">子集平台4-1</el-menu-item>
                    <el-menu-item index="2-4-2">子集平台4-2</el-menu-item>
                    <el-menu-item index="2-4-3">子集平台4-3</el-menu-item>
                </el-submenu>
            </el-submenu>
            </el-menu>
        </div>
        <div class="header-menu">
            <el-tooltip class="item" effect="dark" content="通知" placement="bottom">
                <i class="iconfont icon-lingdang-xianxing"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="isFullScren?'退出全屏':'全屏'" placement="bottom">
                 <i class="iconfont" :class="isFullScren ? 'icon-fullscreenalt' : 'icon-fullscreenexit'" @click="handleScreen"></i>
            </el-tooltip>
            <el-dropdown class="item">
                <span class="el-dropdown-link">
                     {{ userInfo.username }} 
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item> <i class="iconfont icon-userinfo"></i> 个人信息</el-dropdown-item>
                    <el-dropdown-item> <i class="iconfont icon-xiugaimima"></i> 修改密码</el-dropdown-item>
                    <el-dropdown-item @click.native="logout"> <i class="iconfont icon-tuichu5"></i> 退出系统</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
             <el-tooltip class="item" effect="dark" content="用户头像" placement="bottom">
                 <img class="user-logo" src="../../assets/images/user-logo.jpg"/>
             </el-tooltip>    
        </div>
    </header>
</template>


<script>
    import { mapState,mapMutations,mapGetters } from 'vuex';
    import { removeToken } from "@/utils/auth";
    import { fullscreenToggel, listenfullscreen } from "@/utils";
    export default {
        data() {
            return {

            }
        },
        computed:{
            ...mapGetters(["isCollapse", "isFullScren","userInfo"]), 
        },
        created() {
             this.getUserInfo();
        },
        methods: {
            // 切换侧边栏, 水平折叠收起状态
            switchSidebarCollapseHandle() {
               this.$store.commit("SET_COLLAPSE");
            },
            //获取登录用户信息
            getUserInfo(){
                this.API.user.getUserInfo().then(({ data  }) => {
                    console.log(data );
                    if (data && data.code === 0) {
                    this.$store.commit('SET_USERIFNO',data.user);
                    } else {
                    this.$message.error(data.msg);
                    }
                });
            },
            //设置浏览器全屏
            handleScreen() {
                fullscreenToggel();
                this.$store.commit("SET_FULLSCREN");
            },
            //退出系统
            logout(){
               this.$confirm(`确定进行退出吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.API.common.logout().then(({data}) => {
                        if (data && data.code === 0) {
                            //删除tag    
                            this.$store.commit('DEL_ALL_TAG');
                            //删除token
                            removeToken()
                            this.$router.replace({ name: 'login' })
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped="scoped">
    .krt-header {
        background-color: #ffffff;
        border-bottom: 2px solid #495060;
        color: #606266;
        text-align: center;
        height: 60px;
        line-height: 60px;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1030;
        min-width: 950px;
        display: block;
    }
    .krt-header .logo {
        float: left;
    }
    .krt-header .header-tag{
        float: left;
    }
    .header-tag .el-menu--horizontal{
        border: 0px;
    }
    .krt-header .logo .logo-name {
        display: block;
        float: left;
        height: 60px;
        font-size: 20px;
        line-height: 60px;
        text-align: center;
        width: 200px;
        font-weight: 700;
        padding: 0px;
        color: #409eff;
        font-size: 26px;
        overflow: hidden;
    }
    .sidebar-toggle {
        float: left;
        background-color: transparent;
        background-image: none;
        height: 60px;
        font-family: fontAwesome;
    }
    .sidebar-toggle-collapse {
        transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        /* IE 9 */
        -webkit-transform: rotate(90deg);
        /* Safari and Chrome */
        padding: 0px 15px;
    }

    .sidebar-toggle>i {
        font-size: 34px !important;
    }

    .header-menu {
        float: right;
        padding: 0 15px;
        color: #606266;
        font-size: 18px;
    }

    .header-menu > .item{
        margin-right: 20px
    }
    .el-menu--horizontal>.el-menu-item,
    .el-menu--horizontal>.el-submenu .el-submenu__title{
        color: #606266;
    }

    .user-logo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
    }
</style>

