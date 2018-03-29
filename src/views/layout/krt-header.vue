<template>
    <header class="krt-header">
        <div class="logo" v-if="!isCollapse">
            <span class="logo-name">Krt-admin</span>
        </div>
        <a class="sidebar-toggle" @click="switchSidebarCollapseHandle()" :class="[{ 'sidebar-toggle-collapse': isCollapse }]">
            <i class="iconfont icon-navicon"></i>
        </a>
        <div class="header-menu">
            <span><i class="iconfont icon-lingdang-xianxing"></i></span>
            <span><i class="el-icon-message"></i></span>
            <el-dropdown>
                <span class="el-dropdown-link">
                     {{ userInfo.username }} 
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item> <i class="iconfont icon-icon"></i> 个人信息</el-dropdown-item>
                    <el-dropdown-item> <i class="iconfont icon-xiugaimima"></i> 修改密码</el-dropdown-item>
                    <el-dropdown-item> <i class="iconfont icon-tuichu5"></i> 退出系统</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span> <img class="user-logo" src="../../assets/images/user-logo.jpg" /></span>
        </div>
    </header>
</template>


<script>
    import { mapState,mapMutations,mapGetters } from 'vuex';
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
                this.$API.user.getUserInfo().then(({ data  }) => {
                    console.log(data );
                    if (data && data.code === 0) {
                    this.$store.commit('SET_USERIFNO',data.user);
                    } else {
                    this.$message.error(data.msg);
                    }
                });
            },
        }
    }
</script>

<style scoped="scoped">
    .krt-header {
        background-color: #ffffff;
        border-bottom: 2px solid #495060;
        color: #333;
        text-align: center;
        height: 60px;
        line-height: 60px;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1030;
        min-width: 540px;
        display: block;
    }
    .krt-header .logo {
        float: left;
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
    .krt-header .el-dropdown {
        padding: 0 15px;
    }
    .header-menu>.el-dropdown>i,
    .header-menu>span>i {
        padding: 15px;
        color: #606266;
    }
    .header-menu>.el-dropdown>label {
         color: #606266;
         padding: 15px;
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

