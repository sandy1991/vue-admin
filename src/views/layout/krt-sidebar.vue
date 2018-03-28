<template>
  <aside class="asidebar" :class="asideClass" >
        <el-menu
            :collapse="$store.state.sidebarCollapse"
            background-color="#545c64"
            text-color="#fff"
            unique-opened :default-active="tag.value" 
            active-text-color="#ffd04b">
            <sidebar-item :menu="$store.state.menuNavList" :show="!$store.state.sidebarCollapse"></sidebar-item>
        </el-menu>
    </aside>
</template>
<script>

  import sidebarItem from './krt-sidebar-item'
  import { mapMutations } from 'vuex'
  // import { getRouteNameByUrl } from '../utils'
  import isEmpty from 'lodash/isEmpty'
  import { setUrlPath } from "@/utils";
  import { mapGetters } from "vuex";

export default {
  data () {
      return {
        menuNavActive: '1-1'
      }
    },
    components: {
      sidebarItem
    },
    created () {
      this.getMenuNavList();
      //this.$router.replace({ name: "dashBoard" });
    },
    computed: {
        //添加class 
        asideClass() {
            return [{ "sidebar-collapse": this.$store.state.sidebarCollapse }];
        },
        ...mapGetters([ "tag"]),
        nowTagValue: function() {
          return setUrlPath(this.$route);
        }
    },
    methods: {
      // 获取菜单导航列表 / 权限
      getMenuNavList () {
        return this.$API.menu.nav().then(({data}) => {
          if (data && data.code === 0) {
            this.UPDATE_MENU_NAV_LIST(data.menuList)
            sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
          } else {
            this.UPDATE_MENU_NAV_LIST([])
            sessionStorage.setItem('permissions', '[]')
          }
        })
      },
      ...mapMutations(['UPDATE_MENU_NAV_LIST'])
    }
  }
</script>


<style scoped="scoped">
.asidebar {
  background-color: #545c64;
  color: #333;
  text-align: center;
  border-right: solid 1px #d2d6de;
  top: 60px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 200px;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 60px;
}

.sidebar-collapse .asidebar {
  width: 64px;
}
.el-menu {
  border-right: 0px;
}
</style>
