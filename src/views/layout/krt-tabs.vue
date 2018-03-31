<template>
  <div class="tags-container">
    <!-- tag盒子 -->
    <div class="tags-box" ref="tagBox">
      <!-- 左移 -->
      <div class="tags-prev" @click="prevHandle">
         <a href="javascript:;" class="prev"><i class="iconfont icon-left2"></i></a>
      </div>
      <!-- 右移 -->
      <div class="tags-next" @click="nextHandle">
         <a href="javascript:;" class="next"><i class="iconfont icon-right2"></i></a>
      </div>
      <!-- 更多 -->
      <el-dropdown class="tags-more pull-right">
        <span class="el-dropdown-link">
          <a href="javascript:;" class="more"><i class="iconfont icon-down"></i></a>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="closeOthersTags">关闭其他</el-dropdown-item>
          <el-dropdown-item @click.native="closeAllTags">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- tab区域 -->
      <div class="tags-list" ref="tagsList">
        <div ref="tagsPageOpened" class="tag-item" :class="{'is-active':nowTagValue==item.value}" :name="item.value" @contextmenu.prevent="openMenu(item,$event)" v-for="(item,index) in tagList" :key="index" @click="openUrl(item)">
          <span class="iconfont icon-yuan tag-item-icon" :class="{'is-active':nowTagValue==item.value}"></span> 
          <span class="tag-text">{{item.label}}</span>
          <i class="el-icon-close tag-close" @click.stop="closeTag(item)" v-if="item.close"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { resolveUrlPath, setUrlPath } from "@/utils";
import { mapState, mapGetters } from "vuex";
export default {
  name: "tags",
  components: {},
  data() {
    return {
      visible: false,
      tagBodyLeft: 40,
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
    prevHandle(e){
        var boundaryend = this.$refs.tagsList.offsetWidth - this.$refs.tagBox.offsetWidth;
        console.log("this.$refs.tagsList.offsetWidth", this.$refs.tagsList.offsetWidth);
        console.log("this.$refs.tagBox.offsetWidth", this.$refs.tagBox.offsetWidth);
        console.log("可视化区域宽度：",this.$refs.tagBox.offsetWidth-120)
        console.log("整个Tag区域宽度：", this.$refs.tagsList.offsetWidth)
        console.log("tagBodyLeft", this.tagBodyLeft); 
        if(boundaryend>0){
          this.tagBodyLeft=40-boundaryend-120;
          console.log("tagBodyLeft", this.tagBodyLeft); 
        }
       
    },
    nextHandle(e){
        var boundaryend = this.$refs.tagsList.offsetWidth - this.$refs.tagBox.offsetWidth;
        console.log("this.$refs.tagsList.offsetWidth", this.$refs.tagsList.offsetWidth);
        console.log("this.$refs.tagBox.offsetWidth", this.$refs.tagBox.offsetWidth-120);
        console.log("可视化区域宽度：",this.$refs.tagBox.offsetWidth-120)
        console.log("tagBodyLeft", this.tagBodyLeft); 
        if(boundaryend>0 && (this.tagBodyLeft-0)<=40){
          this.tagBodyLeft=this.tagBodyLeft+boundaryend;
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
          (this.$refs.tagBox.offsetWidth - 100 - tag.offsetWidth) +
          20
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
  margin-left: 200px;
  border-bottom: 1px solid #d2d6de;
}

.sidebar-collapse .tags-container {
  margin-left: 64px;
}
.tags-box {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 0px 80px 0px 40px;
  background: #ffffff;
}
.tags-content {
  margin-left: 40px;
}
.tags-list {
  position: absolute;
  overflow: visible;
  white-space: nowrap;
  transition: left 0.3s ease;
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
  min-width: 0;
  line-height: 40px;
  max-width: 160px;
  padding: 0 10px;
  border-right: 1px solid #d2d6de;
  background: #fff;
  color: #495060 !important;
  font-size: 14px;
  vertical-align: middle;
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
  opacity: 0.85;
}

.tags-prev {
  position: absolute;
  top: 0;
  left: 0px;
  display: flex;
  height: 40px;
  line-height: 40px;
  width: 40px;
  text-align: center;
  border-right: 1px solid #d2d6de;
  background: #ffffff;
  z-index: 1000;
}
.prev {
  height: 40px;
  display: block;
  padding: 0 10px;
}

.tags-next {
  position: absolute;
  top: 0;
  right: 40px;
  display: flex;
  height: 40px;
  line-height: 40px;
  width: 40px;
  text-align: center;
  border-left: 1px solid #d2d6de;
  background: #ffffff;
  z-index: 1000;
}
.next {
  height: 40px;
  display: block;
  padding: 0 10px;
}
.tags-more {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  line-height: 40px;
  width: 40px;
  text-align: center;
  border-left: 1px solid #d2d6de;
  background: #ffffff;
  z-index: 1000;
}
.more {
  height: 40px;
  display: block;
  padding: 0 10px;
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 2;
  position: fixed;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}
.contextmenu > li {
  margin: 0;
  height: 32px;
  line-height: 32px;
  padding: 0 15px;
  cursor: pointer;
}
.contextmenu > li:hover {
  background: #eee;
}
a {
  color: #495060;
  text-decoration: none;
}
.is-active {
  background-color: #d2d6de;
}
</style>


