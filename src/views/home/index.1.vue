<template>
    <el-container class="container">
        <el-header class="el-header">
            <div class="logo" v-if="!isCollapse">
                <span class="logo-name">Vue-admin</span>
            </div>
            <a class="sidebar-toggle" @click.prevent="isCollapse=!isCollapse"><i class="iconfont icon-liebiaoshitucaidan"></i></a>
            <div class="header-menu">
                <span><i class="iconfont icon-lingdang-xianxing"></i></span>
                <span><i class="el-icon-message"></i></span>
                <span><i class="el-icon-delete"></i></span>
                <el-dropdown>
                    <img class="user-logo" src="../../assets/images/user-logo.jpg" />
                    <label>admin</label>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item> <i class="iconfont icon-icon"></i> 个人信息</el-dropdown-item>
                        <el-dropdown-item> <i class="iconfont icon-xiugaimima"></i> 修改密码</el-dropdown-item>
                        <el-dropdown-item> <i class="iconfont icon-tuichu5"></i> 退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>
            <!-- 左侧菜单start -->
            <el-aside :width="isCollapse? '65px' : '200px'" style="background-color: #545c64">
                <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router :collapse="isCollapse"
                     background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                >
                     <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>系统管理</span>
                        </template>
                        <el-menu-item index="User">用户管理</el-menu-item>
                        <el-menu-item index="1-2">资源管理</el-menu-item>
                        <el-menu-item index="1-3">角色管理</el-menu-item>
                        <el-menu-item index="1-3">字典管理</el-menu-item>
                        <el-menu-item index="1-3">区域信息管理</el-menu-item>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="4" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                    </el-menu>
                    
                </el-menu>
            </el-aside>
        <el-container>
      <!-- 内容区 -->  
      <el-main>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
      </el-main>
      <el-footer class="main-footer" style="height:48px">
          <!-- To the right -->
          <div class="footer-version">
                版本号: V1.0
          </div>
          <!-- Default to the left -->
          <strong>Copyright &copy; 2017 <a href="http://www.cnkrt.com/" target="_blank" class="info-url">科睿特软件股份有限公司</a>.</strong> All rights reserved.
      </el-footer>
    </el-container>
  </el-container>
</el-container>
</template>

<script>
    export default {
        data() {
            return {
                isCollapse: false
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        }
    };
</script>


<style scoped="scoped">
    .el-header {
        background-color: #409eff;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-footer {
        height: 50px;
        background-color: #b3c0d1;
    }
    .el-aside {
        background-color: #d3dce6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    .el-main {
        background-color: #e9eef3;
        color: #333;
    }
    .container {
        height: 100%;
    }
    .el-header {
        color: #ffffff;
        padding: 0px;
    }
    .el-header .logo {
        float: left;
    }
    .el-header .logo .logo-name {
        display: block;
        float: left;
        height: 60px;
        font-size: 20px;
        line-height: 60px;
        text-align: center;
        width: 200px;
        font-weight: 300;
        overflow: hidden;
    }
    .sidebar-toggle {
        float: left;
        background-color: transparent;
        background-image: none;
        padding: 0 24px;
    }
    .header-menu {
        float: right;
        padding: 0 15px;
    }
    .el-header>.el-dropdown {
        padding: 15px;
    }
    .header-menu>.el-dropdown>i,
    .header-menu>span>i {
        padding: 15px;
        color: #ffffff;
    }
    .header-menu>.el-dropdown>label {
        color: #ffffff;
    }
    .user-logo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
    }
    .el-menu {
        border-right: 0px;
    }
    .el-aside {
        border-right: solid 1px #d2d6de;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .main-footer {
        height: 50px;
        background: #fff;
        padding: 15px;
        color: #444;
        border-top: 1px solid #d2d6de;
    }
    .footer-version {
        float: right;
    }
    .info-url {
        color: #409eff;
        text-decoration: none;
    }
</style>
