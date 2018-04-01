<template>
  <aside class="asidebar" :style="{height: this.documentClientHeight - 50 + 'px'}">
        <el-menu
            :collapse="isCollapse"
            background-color="#20222A"
            text-color="#b8c7ce"
            unique-opened 
            :default-active="tag.value" 
            active-text-color="#409eff">
            <krt-sidebar-item :menu="menu"></krt-sidebar-item>
        </el-menu>
    </aside>
</template>

<script>
import krtSidebarItem from "./krt-sidebar-item";
import { mapState,mapMutations,mapGetters } from 'vuex';


export default {
  data() {
    return {
    };
  },
  components: {
    krtSidebarItem
  },
  created() {
    this.getMenu();
  },
  computed: {
    ...mapGetters(['tag', 'isCollapse', 'menu','documentClientHeight']),
  },
  methods: {
    // 获取菜单导航列表 / 权限
    getMenu() {
      return this.API.menu.nav().then(({ data }) => {
        if (data && data.code === 0) {
          this.$store.commit("SET_MENU", data.menuList);
          this.$store.commit(
            "SET_PERMISSION",
            JSON.stringify(data.permissions || "{}")
          );
        } else {
          this.$store.commit("SET_MENU", []);
          this.$store.commit(
            "SET_PERMISSION",
            JSON.stringify(data.permissions || "{}")
          );
        }
      });
    }
  }
};
</script>


<style scoped="scoped">
.asidebar {
  background-color: #20222A !important;
  color: #333;
  border-right: solid 1px #d2d6de;
  top: 50px;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.el-menu {
  border-right: 0px;
}
</style>
