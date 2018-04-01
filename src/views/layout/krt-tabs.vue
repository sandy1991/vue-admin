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
        <div ref="tagsPageOpened" class="tag-item" 
        :class="{'is-active':nowTagValue==item.value}" 
        :name="item.value" @
        contextmenu.prevent="openMenu(item,$event)" 
        v-for="(item,index) in tagList" :key="index" 
        @click="openUrl(item)">
          <span class="iconfont icon-yuan tag-item-icon"></span> 
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
      //visible: false,
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
    prevHandle(e) {
      //滑块左边遮挡宽度
      var marginLeftVal = Math.abs(parseInt(this.tagBodyLeft));
      //遮挡区域
      var tabOuterWidth = 120;
      //可视滑动区域
      var visibleWidth = this.$refs.tagBox.offsetWidth - tabOuterWidth;
      var scrollVal = 0;
      //但需要显示的滑块小于可视区域宽度 不需要滑动
      if (this.$refs.tagsList.offsetWidth < visibleWidth) {
        return false;
      } else {
        var tIndex = 0;
        var tabElement;
        var offsetVal = 0;
        this.refsTag.forEach((item, index) => {
          if (offsetVal <= marginLeftVal) {
            offsetVal = offsetVal + item.offsetWidth;
            tIndex = index;
            tabElement = item;
          }
        });
        //tabElement = tabElement.nextSibling;
        console.log(tabElement);
        console.log(offsetVal);
        console.log(visibleWidth);
        if (offsetVal > visibleWidth) {
          offsetVal = 0;
          while (
            tabElement &&
            offsetVal + tabElement.offsetWidth < visibleWidth
          ) {
            offsetVal += tabElement.offsetWidth;
            tabElement = tabElement.previousSibling;
          }
          console.log(tabElement);
          // tabElement = tabElement.previousSibling;
          while (tabElement) {
            scrollVal += tabElement.offsetWidth;
            tabElement = tabElement.previousSibling;
          }
          console.log(scrollVal);
        }
        this.tagBodyLeft = 40 - scrollVal;
      }
    },
    nextHandle(e) {
      var marginLeftVal = Math.abs(parseInt(this.tagBodyLeft));
      var tabOuterWidth = 120;
      var visibleWidth = this.$refs.tagBox.offsetWidth - tabOuterWidth;
      var scrollVal = 0;
      console.log(this.$refs.tagsList.offsetWidth);
      console.log(visibleWidth + marginLeftVal);
      if (this.$refs.tagsList.offsetWidth <= visibleWidth + marginLeftVal + 40) {
        return false;
      } else {
        var tIndex = 0;
        var lastElement;
        var tabElement;
        var offsetVal = 0;
        this.refsTag.forEach((item, index) => {
          if (offsetVal <= marginLeftVal) {
            offsetVal = offsetVal + item.offsetWidth;
            tIndex = index;
            tabElement = item;
          }
          lastElement = item;
        });
        console.log(tabElement);
        // console.log(visibleWidth);
        offsetVal = 0;
        while (
          tabElement &&
          offsetVal + tabElement.offsetWidth < visibleWidth
        ) {
          offsetVal += tabElement.offsetWidth;
          tabElement = tabElement.nextSibling;
          console.log(tabElement);
        }
        //tabElement = tabElement.previousSibling;
        while (tabElement) {
          console.log(tabElement.offsetWidth);
          scrollVal += tabElement.offsetWidth;
          tabElement = tabElement.previousSibling;
        }
        console.log(scrollVal);
        if (scrollVal > 0) {
          this.tagBodyLeft = 40 - scrollVal;
        }
      }
    },
    openMenu(tag, e) {
      if (this.tagList.length == 1) {
        return;
      }
      this.selectedTag = tag;
    },
    closeOthersTags() {
      this.$store.commit("DEL_TAG_OTHER");
    },
    closeAllTags() {
      if(this.$refs.tagsList.children.length>1){
        this.$store.commit("DEL_ALL_TAG");
        console.log(this.tagWel.query);
        this.$router.push({
          path: resolveUrlPath(this.tagWel.value)+"?t="+Math.random()
        }); 
      }else{
        this.$message({ message: '至少保留一个tab页', type: 'warning', duration: 1500, });
      }
    },
    moveToView(tag) {
      var marginLeftVal = 0;
      var tagElment = tag;
      while (tagElment) {
        console.log(tagElment,tagElment.offsetWidth);
        marginLeftVal += tagElment.offsetWidth;
        tagElment = tagElment.previousSibling;
      }
      var marginRightVal = 0;
      tagElment = tag;
      while (tagElment) {
        marginRightVal += tag.offsetWidth;
        tagElment = tagElment.nextSibling;
      }
      console.log(tag);
      console.log(marginLeftVal);
      console.log(marginRightVal);
      var tabOuterWidth = 120;
      var visibleWidth = this.$refs.tagBox.offsetWidth - tabOuterWidth;
      var scrollVal = 0;
      var nextTagWidth = 0;
      if(tag.nextSibling){
          nextTagWidth = tag.nextSibling.offsetWidth;
      }
      if (this.$refs.tagsList.offsetWidth < visibleWidth) {
        scrollVal = 0;
      } else if (marginRightVal <= (visibleWidth - tag.offsetWidth - nextTagWidth)) {
        if (visibleWidth - nextTagWidth > marginRightVal) {
          scrollVal = marginLeftVal;
          var tabElement = tag;
          while (tabElement && ((scrollVal - tabElement.offsetWidth) > (this.$refs.tagsList.offsetWidth - visibleWidth))) {
            scrollVal -= tabElement.previousSibling.offsetWidth;
            tabElement = tabElement.previousSibling;
          }
        }
      } else if ( marginLeftVal > visibleWidth - tag.offsetWidth - nextTagWidth) {
        scrollVal = marginLeftVal - tag.offsetWidth;
      }
      this.tagBodyLeft = 40 - scrollVal;
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
  padding-top: 50px;
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

.is-active > span.iconfont {
  color: #4e97d9;
}
.tag-item {
  position: relative;
  display: inline-block;
  min-width: 0;
  line-height: 40px;
  max-width: 150px;
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


