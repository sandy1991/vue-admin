<template>
  <aside class="asidebar" :class="asideClass" >
        <el-menu
            :collapse="$store.state.sidebarCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1-1" @click="$router.push({ name: 'home' })">
                <i class="site-sidebar__menu-icon fa fa-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <sub-menu-nav
            v-for="menuNav in $store.state.menuNavList" 
            :key="menuNav.menuId"
            :menu-nav="menuNav">
            </sub-menu-nav>
        </el-menu>
    </aside>
</template>
<script>
  import SubMenuNav from '@/components/sub-menu-nav'
  import { mapMutations } from 'vuex'
  import { getRouteNameByUrl } from '@/utils'
  import isEmpty from 'lodash/isEmpty'

export default {
  data () {
      return {
        menuNavActive: '1-1'
      }
    },
    components: {
      SubMenuNav
    },
    watch: {
      $route: 'routeHandle'
    },
    created () {
      this.getMenuNavList().then(() => {
        this.routeHandle(this.$route)
      })
    },
    computed: {
        //添加class
        asideClass() {
            return [{ "sidebar-collapse": this.$store.state.sidebarCollapse }];
        },
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
      // 路由操作
      routeHandle (route) {
        if (/^\/n\/.*$/.test(route.path)) {
            console.log(this.$store.state.contentTabs);
          console.log(route.name);
          var tab = this.$store.state.contentTabs.filter(item => item.name === route.name)[0]
          console.log('tab',tab);
          // tab不存在, 先添加
          if (isEmpty(tab)) {
            var menuNav = this.getMenuNavByRouteName(route.name, this.$store.state.menuNavList)
            if (!isEmpty(menuNav)) {
              tab = {
                id: menuNav.menuId,
                name: route.name,
                title: menuNav.name,
                //type: (window.SITE_CONFIG.nestIframeRouteNameList || []).indexOf(route.name) !== -1 ? 'iframe' : 'module',
                tyle:'module',
                url: menuNav.url
              }
              this.ADD_CONTENT_TAB(tab)
            } else {
              return console.error('未能找到可用tab标签页！')
            }
          }
          this.menuNavActive = tab.id + ''
          this.UPDATE_CONTENT_TABS_ACTIVE_NAME({ name: route.name })
        }
      },
      // 获取菜单导航, 根据路由名称
      getMenuNavByRouteName (name, menuNavList) {
          console.log(menuNavList);
        var temp = []
        for (var i = 0; i < menuNavList.length; i++) {
            console.log(getRouteNameByUrl(menuNavList[i].url));

          if (menuNavList[i].list && menuNavList[i].list.length >= 1) {
            temp = temp.concat(menuNavList[i].list)
          } else if (getRouteNameByUrl(menuNavList[i].url) === name) {
            return menuNavList[i]
          }
        }
        return temp.length >= 1 ? this.getMenuNavByRouteName(name, temp) : []
      },
      ...mapMutations(['UPDATE_MENU_NAV_LIST', 'ADD_CONTENT_TAB', 'UPDATE_CONTENT_TABS_ACTIVE_NAME'])
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
  overflow: hidden;
}

.sidebar-collapse .asidebar {
  width: 64px;
}
.el-aside {
  position: relative;
  z-index: 1;
  height: 100%;
  padding-bottom: 60px;
  overflow-y: auto;
}
.el-menu {
  border-right: 0px;
}
</style>
