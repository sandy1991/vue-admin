<template>
  <div class="tags-container">
    <!-- tag -->
    <div class="tags-box" ref="tagBox">
      <div class="tags-list" ref="tagsList" @mousewheel="hadelMousewheel" @mouseup="hadelMouseUp" @mousemove="hadelMouse" @mousedown="hadelMousestart" @touchup="hadelMouseUp" @touchmove="hadelMouse" @touchstart="hadelMousestart">
        <div ref="tagsPageOpened" class="tag-item" :name="item.value" @contextmenu.prevent="openMenu(item,$event)" v-for="(item,index) in tagList" :key="index" @click="openUrl(item)">
          <span class="iconfont icon-yuan tag-item-icon" :class="{'is-active':nowTagValue==item.value}"></span>
          <span class="tag-text">{{item.label}}</span>
          <i class="el-icon-close tag-close" @click.stop="closeTag(item)" v-if="item.close"></i>
        </div>
      </div>
      <el-dropdown class="tags-menu pull-right">
        <el-button type="primary" size="mini">
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="closeOthersTags">关闭其他</el-dropdown-item>
          <el-dropdown-item @click.native="closeAllTags">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>

   import { resolveUrlPath, setUrlPath } from "@/utils";
  import {
    mapState,
    mapGetters
  } from "vuex";
  export default {
    name: "tags",
    components: {
    },
    data() {
      return {
        visible: false,
        tagBodyLeft: 0,
        lock: false,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        top: 0,
        left: 0,
        selectedTag: {}
      };
    },
    created() {},
    mounted() {
      this.init();
    },
    watch: {
      $route(to) {
        this.init();
      },
      visible(value) {
        if (value) {
          document.body.addEventListener("click", this.closeMenu);
        } else {
          document.body.removeEventListener("click", this.closeMenu);
        }
      },
      tagBodyLeft(value) {
        this.$refs.tagsList.style.left = value + "px";
      }
    },
    computed: {
      ...mapGetters(["tagWel", "tagList", "tag"]),
      nowTagValue: function() {
        return setUrlPath(this.$route);
      },
      tagListNum: function() {
        return this.tagList.length != 0;
      }
    },
    methods: {
      init() {
        this.refsTag = this.$refs.tagsPageOpened;
        setTimeout(() => {
          this.refsTag.forEach((item, index) => {
            if (this.tag.value === item.attributes.name.value) {
              let tag = this.refsTag[index];
              this.moveToView(tag);
            }
          });
        }, 1);
      },
      showCollapse() {
        this.$store.commit("SET_COLLAPSE");
      },
      hadelMouseUp(e) {
        this.lock = false;
      },
      hadelMousestart(e) {
        this.lock = true;
        if (e.clientX && e.clientY) {
          this.startX = e.clientX;
          this.startY = e.clientY;
        } else {
          this.startX = e.changedTouches[0].pageX;
          this.startY = e.changedTouches[0].pageY;
        }
      },
      hadelMouse(e) {
        const boundarystart = 0,
          boundaryend =
          this.$refs.tagsList.offsetWidth - this.$refs.tagBox.offsetWidth + 100;
        if (!this.lock) {
          return;
        }
        //鼠标滑动
        if (e.clientX && e.clientY) {
          this.endX = e.clientX;
          this.endY = e.clientY;
          //触摸屏滑动
        } else {
          //获取滑动屏幕时的X,Y
          this.endX = e.changedTouches[0].pageX;
          this.endY = e.changedTouches[0].pageY;
        }
        //获取滑动距离
        let distanceX = this.endX - this.startX;
        let distanceY = this.endY - this.startY;
        //判断滑动方向——向右滑动
        distanceX = parseInt(distanceX * 0.8);
        if (distanceX > 0 && this.tagBodyLeft < boundarystart) {
          this.tagBodyLeft = this.tagBodyLeft + distanceX;
          //判断滑动方向——向左滑动
        } else if (distanceX < 0 && this.tagBodyLeft >= -boundaryend) {
          this.tagBodyLeft = this.tagBodyLeft + distanceX;
        }
      },
      hadelMousewheel(e) {
        const step = 0.8 * 90; //一个tag长度
        const boundarystart = 0,
          boundaryend =
          this.$refs.tagsList.offsetWidth - this.$refs.tagBox.offsetWidth + 100;
        // Y>0向左滑动
        if (e.deltaY > 0 && this.tagBodyLeft >= -boundaryend) {
          this.tagBodyLeft = this.tagBodyLeft - step;
          // Y<0向右滑动
        } else if (e.deltaY < 0 && this.tagBodyLeft < boundarystart) {
          this.tagBodyLeft = this.tagBodyLeft + step;
        }
      },
      openMenu(tag, e) {
        if (this.tagList.length == 1) {
          return;
        }
        this.visible = true;
        this.selectedTag = tag;
        this.left = e.clientX;
        this.top = e.clientY;
      },
      closeOthersTags() {
        this.$store.commit("DEL_TAG_OTHER");
      },
      closeMenu() {
        this.visible = false;
      },
      closeAllTags() {
        this.$store.commit("DEL_ALL_TAG");
        this.$router.push({
          path: resolveUrlPath(this.tagWel.value),
          query: this.tagWel.query
        });
      },
      moveToView(tag) {
        if (tag.offsetLeft < -this.tagBodyLeft) {
          // 标签在可视区域左侧
          this.tagBodyLeft = -tag.offsetLeft + 10;
        } else if (
          tag.offsetLeft + 10 > -this.tagBodyLeft &&
          tag.offsetLeft + tag.offsetWidth <
          -this.tagBodyLeft + this.$refs.tagBox.offsetWidth
        ) {
          // 标签在可视区域
        } else {
          // 标签在可视区域右侧
          this.tagBodyLeft = -(
            tag.offsetLeft -
            (this.$refs.tagBox.offsetWidth - 100 - tag.offsetWidth) + 20
          );
        }
      },
      openUrl(item) {
        this.$router.push({
          path: resolveUrlPath(item.value, item.label),
          query: item.query
        });
      },
      eachTag(tag) {
        for (var key in this.tagList) {
          if (this.tagList[key].value == tag.value) {
            return key;
          }
        }
        return -1;
      },
      closeTag(item) {
        const key = this.eachTag(item);
        let tag;
        this.$store.commit("DEL_TAG", item);
        if (item.value == this.tag.value) {
          tag = this.tagList[key == 0 ? key : key - 1];
          this.openUrl(tag);
        }
      }
    }
  };
</script>
<style scoped>
  .tags-container {
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    padding-top: 60px;
    border-bottom: 1px solid #d2d6de;
  }
  .tags-box {
    position: relative;
    box-sizing: border-box;
    padding-right: 106px;
    width: 100%;
    height: 40px;
    background: #ffffff;
  }
  .tags-list {
    position: absolute;
    padding: 2px 10px;
    overflow: visible;
    white-space: nowrap;
    transition: left .3s ease;
  }
  .tag-item-icon {
    color: #eee;
    font-size: 11px !important;
  }
  .is-active {
    color: #4e97d9;
}
  .tag-item {
    position: relative;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    margin: 2px 4px 2px 0;
    padding: 0 10px;
    border: 1px solid #e9eaec;
    border-radius: 3px;
    background: #fff;
    color: #495060!important;
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    cursor: pointer;
  }
  .tag-text {
    margin-left: 8px;
  }
  .tag-close {
    margin-left: 8px;
  }
  .tag-item:hover {
    opacity: .85;
  }
  .tags-menu {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 0 15px;
    height: 96%;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 2;
    position: fixed;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  }
  .contextmenu>li {
    margin: 0;
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
    cursor: pointer;
  }
  .contextmenu>li:hover {
    background: #eee;
  }
</style>


