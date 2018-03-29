<template>
  <div class="krt-wrapper">
    <el-row :gutter="20">
     
          <el-col :sm="24" :md="4">
            <div class="krt-box">
              <div class="krt-box-header">
                <h4>项目资源树</h4>
                <div class="box-tools">
                  <i class="iconfont icon-refresh"></i>
                </div>
              </div>
              <div class="krt-box-body"> 
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
               </div>
              </div> 
          </el-col>
        
   <el-col :sm="24" :md="20">
     <div class="krt-box">
        <div class="krt-box-header">
          <h4>项目管理</h4>
        </div>  
      <div class="krt-box-body">
        <div class="krt-box-button">
        <el-button  type="success" size="small" >新增</el-button>
     </div>   
          <el-table
          :data="tableData"
          border
           stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>
      </div>   
    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>
    