<template>
  <div class="krt-wrapper">
    <div class="krt-search">
        <el-form :inline="true" :model="dataForm" class="krt-search-form" size="small">
        <el-form-item label="审批人">
          <el-input  placeholder="审批人" v-model="dataForm.param1"></el-input>
        </el-form-item>
        <el-form-item label="审批人">
          <el-input  placeholder="审批人" v-model="dataForm.param2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="getDataList()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

  <div class="krt-box">
  <div class="krt-box-body">  
    <div class="krt-box-button"> 
        <el-button  type="success" size="small" @click="insertOrUpdateHandle()">新增</el-button>
        <el-button  type="danger" size="small" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        <el-button  type="primary" size="small" v-if="hasPermission('sys:user:excel')"  @click="insertOrUpdateHandle()">导出excel</el-button>
    </div>
    <el-table
      :data="dataList"
      ref="multipleTable" 
      stripe
      border
      tooltip-effect="dark"
      @selection-change="selectionChangeHandle">
      <el-table-column 
        type="selection"
        prop="id" 
        width="55">
      </el-table-column>
      <el-table-column 
        prop="username" 
        header-align="center" 
        align="center" 
        label="用户账号">
      </el-table-column>
      <el-table-column 
        prop="name" 
        header-align="center" 
        align="center" 
        label="用户姓名">
      </el-table-column>
      <el-table-column 
        prop="roleName" 
        header-align="center" 
        align="center" 
        label="角色名">
      </el-table-column>
      <el-table-column 
        prop="organizationName" 
        header-align="center" 
        align="center" 
        label="所属机构">
      </el-table-column>
      <el-table-column 
        prop="status" 
        header-align="center" 
        align="center" 
        label="账号状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" size="small" type="danger">禁用</el-tag>
          <el-tag v-else size="small">正常</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
           <el-button  type="text" size="small" @click="insertOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="krt-page"> 
     <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    </div>  
   </div>
  </div>
  <!-- 弹窗, 新增 / 修改 -->
  <insert-or-update v-if="insertOrUpdateVisible" ref="insertOrUpdate"  @refreshDataList="getDataList"></insert-or-update>
</div>
</template>

<script>
import insertOrUpdate from "./insert-or-update";
export default {
  name: 'user',
  data() {
    return {
      dataForm: {
        param1: "",
        param2: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      insertOrUpdateVisible: false
    };
  },
  components: {
    insertOrUpdate
  },
  activated() {
    this.getDataList();
  },
  created(){
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize,
        param1: this.dataForm.param1
      };
      this.API.user.list(params).then(({ data }) => {
        if (data && data.code === 0) {
          console.log(data);
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    insertOrUpdateHandle(id) {
      this.insertOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.insertOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle(id) {
      var userIds = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(
        `确定对[id=${userIds.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        API.user.del(userIds).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    }
  }
};
</script>
