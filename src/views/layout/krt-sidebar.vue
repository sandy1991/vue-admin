<template>
  <aside class="asidebar" >
        <el-menu
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            unique-opened :default-active="tag.value" 
            active-text-color="#409eff">
            <sidebar-item :menu="menu" :show="!isCollapse"></sidebar-item>
        </el-menu>
    </aside>
</template>

<script>
import sidebarItem from "./krt-sidebar-item";
import { mapState,mapMutations,mapGetters } from 'vuex';


export default {
  data() {
    return {
      menuNavActive: "1-1"
    };
  },
  components: {
    sidebarItem
  },
  created() {
    this.getMenu();
  },
  computed: {
    ...mapGetters(["tag", "isCollapse", "menu"]),
  },
  methods: {
    // 获取菜单导航列表 / 权限
    getMenu() {
      return this.$API.menu.nav().then(({ data }) => {
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
  background-color: #545c64;
  color: #333;
  text-align: center;
  border-right: solid 1px #d2d6de;
  top: 60px;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 60px;
}


.el-menu {
  border-right: 0px;
}
</style>
