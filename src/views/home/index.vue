<template>
    <div class="container" :class="{'sidebar-collapse':isCollapse}">
        <!-- 头部 -->
        <krt-header></krt-header>
        <!-- 左侧菜单start -->
       <krt-sidebar></krt-sidebar>
       <!-- 内容区 -->  
       <krt-tabs></krt-tabs>
       <div class="main" :style="{height: this.documentClientHeight - 140 + 'px'}"> 
            <transition 
             name="fade"
             enter-active-class="animated fadeIn">
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
import krtTabs from '../layout/krt-tabs'; 

import { mapState,mapMutations,mapGetters } from 'vuex';

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
    krtTabs
  },
  computed: {
    ...mapGetters(['documentClientHeight','isCollapse']),
  },
  created () {
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
      this.$store.commit("SET_DOCUMENT_CLIENT_HEIGHT",document.documentElement["clientHeight"]);
    }
  }
};
</script>


<style scoped="scoped">
body,
html {
  overflow: hidden;
}
.main {
  position: relative;
  overflow-y: auto;
  background-color: #f2f2f2;
}
</style>
