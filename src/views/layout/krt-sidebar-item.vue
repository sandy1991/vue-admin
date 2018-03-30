<template>
  <div :class="[{ 'el-menu--collapse': isCollapse}]">
    <template v-for="item in menu">
      <el-menu-item v-if="item.children.length===0 " :index="item.href"  @click="open(item)" :key="item.label">
        <i :class="item.icon?item.icon:'iconfont icon-pointer'"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu v-else :index="item.label" :key="item.name">
        <template slot="title">
          <i :class="item.icon?item.icon:'iconfont icon-pointer'"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <template v-for="(child,cindex) in item.children">
          <el-menu-item :index="child.href" @click="open(child)" v-if="child.children.length==0" :key="cindex">
            <i :class="child.icon?child.icon:'iconfont icon-pointer'"></i>
            <span slot="title">{{child.label}}</span>
          </el-menu-item>
          <sidebar-item v-else :menu="[child]" :key="cindex"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { resolveUrlPath } from "@/utils";
import { mapState,mapMutations,mapGetters } from 'vuex';
export default {
  name: "SidebarItem",
  data() {
    return {};
  },
  props: {
    menu: {
      type: Array
    }
  },
    computed: {
    ...mapGetters(['tag', 'isCollapse', 'menu','documentClientHeight']),
  },
  created() {},
  mounted() {},
  methods: {
    open(item) {
      //支持iframe
      this.$router.push({
        path: resolveUrlPath(item.href, item.label),
        query: item.query
      });
    }
  }
};
</script>
<style scoped>
.display {
  display: none;
}
i{
  margin-right: 10px;
}
.el-menu--inline{
  background-color: #2c3b41!important;
}

.el-menu--inline > li{
  background-color: #2c3b41!important;
}
</style>

