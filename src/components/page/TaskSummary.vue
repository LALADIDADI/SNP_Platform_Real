<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 任务控制界面
        </el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="introduction-box">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content ">
              <div class="content-title">正在进行的任务</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content ">
              <el-table
                :data="tableData"
                border
                style="width: 56%"
                height="200">
                <el-table-column
                  fixed
                  prop="date"
                  label="提交时间"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="number"
                  label="任务编号"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="method"
                  label="所用算法"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="完成状态"
                  width="120">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="150">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除任务</el-button>
                    <el-button type="text" size="small">结果下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content ">
              <div class="content-title">已完成任务</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content ">
              <el-table
                :data="tableData"
                border
                style="width: 56%"
                height="200">
                <el-table-column
                  fixed
                  prop="date"
                  label="提交时间"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="number"
                  label="任务编号"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="method"
                  label="所用算法"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="完成状态"
                  width="120">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="150">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除任务</el-button>
                    <el-button type="text" size="small">结果下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskSummary',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        number: '0001',
        method: 'HiSeeker',
        status: '正在进行'
      }, {
        date: '2016-05-02',
        number: '0002',
        method: 'ClusterMI',
        status: '正在进行'
      }, {
        date: '2016-05-02',
        number: '0003',
        method: 'ClusterMI',
        status: '正在进行'
      }, {
        date: '2016-05-02',
        number: '0004',
        method: 'HiSeeker',
        status: '正在进行'
      }]
    }
  },

  methods: {
    handleClick (row) {
      console.log(row)
    }
  }
}
</script>

<style>
.introduction-box {
  height: 700px;
}

.sub-introduction {
  height: 25px;
  margin-bottom: 10px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

/*页面布局css*/
.el-row {
  margin-bottom: 20px;

&
:last-child {
  margin-bottom: 0;
}

}
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

/*简单的字体而已*/
.content-title {
  clear: both;
  font-size: 22px;
  color: #1f2f3d;
}
</style>
