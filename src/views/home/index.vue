<template>
    <div class="container" :class="containerClass">
        <!-- 头部 -->
        <krt-header></krt-header>
        <!-- 左侧菜单start -->
       <krt-sidebar></krt-sidebar>
       <!-- 内容区 -->  
       <div class="main" :style="mainStyle">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
       <krt-footer></krt-footer>
    </div>  
</template>



<script>
import krtHeader from "../layout/krt-header";
import krtSidebar from "../layout/krt-sidebar";
import krtFooter from "../layout/krt-footer";
import contentTabs from '../layout/content-tabs';

import { mapMutations } from "vuex";

export default {
  data() {
    return {
      loading: true,
    };
  },
  components: {
    krtHeader,
    krtSidebar,
    krtFooter,
    contentTabs
  },
  computed: {
    //添加class
    containerClass() {
      return [{ "sidebar-collapse": this.$store.state.sidebarCollapse }];
    },
    //计算main-div高度
    mainStyle() {
      return [{ height: this.$store.state.documentClientHeight - 110 + "px" }];
    }
  },
  created () {
    this.getUserInfo();
  },
  mounted() {
    this.resetDocumentClientHeight();
    window.onresize = () => {
      this.resetDocumentClientHeight();
    };
  },
  methods: {
    // 重置窗口可视高度
    resetDocumentClientHeight() {
      console.log(document.documentElement["clientHeight"]);
      this.UPDATE_DOCUMENT_CLIENT_HEIGHT({
        height: document.documentElement["clientHeight"]
      });
    },
    //获取登录用户信息
    getUserInfo(){
       this.$API.user.getUserInfo().then(({ data  }) => {
            console.log(data );
            if (data && data.code === 0) {
               this.SET_CURRENTUSER({ currentUser: data.user })
            } else {
              this.$message.error(data.msg);
            }
          });
    },
    ...mapMutations([
      "UPDATE_DOCUMENT_CLIENT_HEIGHT",
      "SET_CURRENTUSER",
      "DELETE_CONTENT_TABS"
    ])
  }
};
</script>


<style scoped="scoped">
body,
html {
  overflow: hidden;
}
.sidebar-collapse .main {
  margin-left: 64px;
}
.main {
  position: relative;
  padding-top: 60px;
  margin-left: 200px;
  overflow-y: auto;
  background-color: #f2f2f2;
}
</style>
