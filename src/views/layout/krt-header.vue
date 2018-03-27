<template>
  <header class="el-header">
      <div class="logo" v-if="!$store.state.sidebarCollapse">
          <span class="logo-name">Vue-admin</span>
      </div>
      <a class="sidebar-toggle"  @click="switchSidebarCollapseHandle()"><i class="iconfont icon-liebiaoshitucaidan"></i></a>    
      <div class="header-menu">
        <span><i class="iconfont icon-lingdang-xianxing"></i></span> 
        <span><i class="el-icon-message"></i></span> 
        <span><i class="el-icon-delete"></i></span> 
         <el-dropdown>
            <img class="user-logo" src="../../assets/images/user-logo.jpg"/>
            <label>{{ $store.state.currentUser.username }}</label>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item> <i class="iconfont icon-icon"></i> 个人信息</el-dropdown-item>
            <el-dropdown-item> <i class="iconfont icon-xiugaimima"></i> 修改密码</el-dropdown-item>
            <el-dropdown-item> <i class="iconfont icon-tuichu5"></i> 退出系统</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
       </div> 
  </header>
</template>


<script>
import { mapMutations } from 'vuex'
export default {
   data() {
            return {
                isCollapse: false
            };
        },
    methods: {
      // 切换侧边栏, 水平折叠收起状态
      switchSidebarCollapseHandle () {
        this.SWITCH_SIDEBAR_COLLAPSE({ collapse: !this.$store.state.sidebarCollapse })
      },
      ...mapMutations(['SWITCH_SIDEBAR_COLLAPSE', 'DELETE_CONTENT_TABS'])
    }
  }
</script>

<style scoped="scoped">
   .el-header{
       background-color: rgb(64, 158, 255);
       color: #333;
       text-align: center;
       height: 60px;
       line-height: 60px;
       position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1030;
        box-shadow: 0 2px 4px rgba(0,0,0,.08);
        background-color: #3e8ef7;
        display: block;
   }

  .el-header {
      color: #ffffff;
      padding: 0px;
  }

  .el-header .logo{
      float: left;
  }
  .el-header .logo .logo-name{
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
  .sidebar-toggle{
    float: left;
    background-color: transparent;
    background-image: none;
    padding: 0 28px;
    font-family: fontAwesome;
  }
  .header-menu{
      float: right;
      padding: 0 15px;
  }

  .el-header > .el-dropdown {
      padding: 15px;
  }

  .header-menu > .el-dropdown >i,
  .header-menu > span >i {
      padding: 15px;
      color: #ffffff;
  }

  .header-menu > .el-dropdown >label{
      color: #ffffff
  }

  .user-logo{
    width: 40px;
    height: 40px;  
    border-radius: 50%;
    cursor: pointer;
    display: inline-block; 
    vertical-align: middle;
  }
  
</style>

