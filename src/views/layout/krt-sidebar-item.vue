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
          <krt-sidebar-item v-else :menu="[child]" :key="cindex"></krt-sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { resolveUrlPath } from "@/utils";
import { mapState,mapMutations,mapGetters } from 'vuex';
export default {
  name: "krtSidebarItem",
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

.el-menu--inline > li{
  background-color: rgba(0,0,0,.3)!important;
}

</style>

