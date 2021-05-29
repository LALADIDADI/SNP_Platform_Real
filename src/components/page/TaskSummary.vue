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
            <div>
              <el-row>
                <el-col :span="10">
                  <div class="content-title">
                    任务列表
                  </div>
                </el-col>
                <el-col :span="6">
                  <el-button type="success" @click="runBatch(0)" plain>开始批处理</el-button>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div>
              <el-table
                border
                :data="tableData"
                style="width: 65%"
              >
                <el-table-column
                  prop="date"
                  label="提交时间"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="number"
                  label="任务编号"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="method"
                  label="所用算法"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="state"
                  label="完成状态"
                  width="161">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="162">
                  <template slot-scope="scope">
                    <el-button @click="deleteRow(scope.row, scope.$index, tableData)" type="text" size="small">删除任务
                    </el-button>
                    <el-button @click="downloadRes(scope.$index)" type="text" size="small">结果下载</el-button>
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

import {RefreshTask, DeleteTask, HiSeekerJustRun, ClusterMIJustRun, DCHEJustRun, DECMDRJustRun, MACOEDJustRun, DualWMDRJustRun, MOMDRJustRun, EpiMCJustRun} from '../../api/addIndex'
import {HiSeekerPollResultData, ClusterMIPollResultData, DCHEPollResultData, DECMDRPollResultData, MACOEDPollResultData, DualWMDRPollResultData, MOMDRPollResultData, EpiMCPollResultData} from '../../api/index'

export default {
  name: 'TaskSummary',
  data () {
    return {
      tableData: [],
      paramId: {
        queryId: '',
        finished: false,
        progress: 0
      },
      localParam: {
        runIndex: 0,
        deleteIndex: 0
      }
    }
  },

  methods: {
    // 发送遍历dataTable和轮询请求
    runBatch (i) {
      // 设置上传的id
      this.paramId.queryId = this.tableData[i].number
      // 更新当前任务的状态，由等待执行改为正在执行
      this.tableData[i].state = '正在执行'
      if (this.tableData[i].method === 'HiSeeker') {
        HiSeekerJustRun().then(res => {
          console.log(res)
          // 开始轮询
          this.startPoll('HiSeeker')
        })
      } else if (this.tableData[i].method === 'ClusterMI') {
        ClusterMIJustRun().then(res => {
          console.log(res)
          this.startPoll('ClusterMI')
        })
      } else if (this.tableData[i].method === 'DCHE') {
        DCHEJustRun().then(res => {
          console.log(res)
          this.startPoll('DCHE')
        })
      } else if (this.tableData[i].method === 'DECMDR') {
        DECMDRJustRun().then(res => {
          console.log(res)
          this.startPoll('DECMDR')
        })
      } else if (this.tableData[i].method === 'MACOED') {
        MACOEDJustRun().then(res => {
          console.log(res)
          this.startPoll('MACOED')
        })
      } else if (this.tableData[i].method === 'DualWMDR') {
        DualWMDRJustRun().then(res => {
          console.log(res)
          this.startPoll('DualWMDR')
        })
      } else if (this.tableData[i].method === 'MOMDR') {
        MOMDRJustRun().then(res => {
          console.log(res)
          this.startPoll('MOMDR')
        })
      } else if (this.tableData[i].method === 'EpiMC') {
        EpiMCJustRun().then(res => {
          console.log(res)
          this.startPoll('EpiMC')
        })
      }
    },
    // 轮询方法，请求后端后自动执行
    pollResultData (methodName) {
      if (methodName === 'HiSeeker') {
        HiSeekerPollResultData(this.paramId).then(res => {
          console.log(res)
          // 实时更新进度条
          this.paramId.progress = res.progress
          if (res.finished === 'true') {
            // do something
            this.paramId.finished = true
            this.stopPoll()
          }
        })
      } else if (methodName === 'ClusterMI') {
        ClusterMIPollResultData(this.paramId).then(res => {
          console.log(res)
          // 实时更新进度条
          this.paramId.progress = res.progress
          if (res.finished === 'true') {
            // do something
            this.paramId.finished = true
            this.stopPoll()
          }
        })
      } else if (methodName === 'DCHE') {
        DCHEPollResultData(this.paramId).then(res => {
          console.log(res)
          // 实时更新进度条
          this.paramId.progress = res.progress
          if (res.finished === 'true') {
            // do something
            this.paramId.finished = true
            this.stopPoll()
          }
        })
      } else if (methodName === 'DECMDR') {
        DECMDRPollResultData(this.paramId).then(res => {
          console.log(res)
          // 实时更新进度条
          this.paramId.progress = res.progress
          if (res.finished === 'true') {
            // do something
            this.paramId.finished = true
            this.stopPoll()
          }
        })
      } else if (methodName === 'MACOED') {
        MACOEDPollResultData(this.paramId).then(res => {
          console.log(res)
          // 实时更新进度条
          this.paramId.progress = res.progress
          if (res.finished === 'true') {
            // do something
            this.paramId.finished = true
            this.stopPoll()
          }
        })
      } else if (methodName === 'DualWMDR') {
        DualWMDRPollResultData(this.paramId).then(res => {
          console.log(res)
          // 实时更新进度条
          this.paramId.progress = res.progress
          if (res.finished === 'true') {
            // do something
            this.paramId.finished = true
            this.stopPoll()
          }
        })
      } else if (methodName === 'MOMDR') {
        MOMDRPollResultData(this.paramId).then(res => {
          console.log(res)
          // 实时更新进度条
          this.paramId.progress = res.progress
          if (res.finished === 'true') {
            // do something
            this.paramId.finished = true
            this.stopPoll()
          }
        })
      } else if (methodName === 'EpiMC') {
        EpiMCPollResultData(this.paramId).then(res => {
          console.log(res)
          // 实时更新进度条
          this.paramId.progress = res.progress
          if (res.finished === 'true') {
            // do something
            this.paramId.finished = true
            this.stopPoll()
          }
        })
      }
    },
    // 封装后的轮询方法
    startPoll (methodName) {
      this.myInterval = window.setInterval(() => {
        setTimeout(() => {
          this.pollResultData(methodName)
        }, 1)
      }, 3000)
    },
    // 停止轮询方法,并开启下一个算法
    stopPoll () {
      clearInterval(this.myInterval)
      console.log('已经stopPoll了！')
      // 重置状态
      this.paramId.queryId = ''
      this.paramId.finished = false
      this.paramId.progress = 0
      // 更新完成的任务的状态，由running改为finished
      this.tableData[this.localParam.runIndex].state = '运行完成'
      // 判断是否有其它算法等待，如果有，按顺序执行
      if (this.localParam.runIndex < this.tableData.length - 1) {
        this.localParam.runIndex += 1
        this.runBatch(this.localParam.runIndex)
      }
    },
    // 删除指定行
    deleteRow (row, index, rows) {
      console.log(row)
      rows.splice(index, 1)
      // 在前端删除后，还要向后端发个请求，在后端删除
      this.localParam.deleteIndex = index
      DeleteTask(this.localParam).then(res => {
        console.log(res)
      })
    },
    // 下载指定行的结果文件
    downloadRes (index) {
      console.log(`index: ${index}`)
      if (this.tableData[index].method === 'HiSeeker') {
        window.location.href = 'http://localhost:8080/HiSeekerResultDataDownload'
        console.log('download HiSeeker result!')
      } else if (this.tableData[index].method === 'ClusterMI') {
        window.location.href = 'http://localhost:8080/ClusterMIResultDataDownload'
        console.log('download ClusterMI result!')
      } else if (this.tableData[index].method === 'DCHE') {
        window.location.href = 'http://localhost:8080/DCHEResultDataDownload'
        console.log('download DCHE result!')
      } else if (this.tableData[index].method === 'DECMDR') {
        window.location.href = 'http://localhost:8080/DECMDRResultDataDownload'
        console.log('download DECMDR result!')
      } else if (this.tableData[index].method === 'MACOED') {
        window.location.href = 'http://localhost:8080/MACOEDResultDataDownload'
        console.log('download MACOED result!')
      } else if (this.tableData[index].method === 'DualWMDR') {
        window.location.href = 'http://localhost:8080/DualWMDRResultDataDownload'
        console.log('download DualWMDR result!')
      } else if (this.tableData[index].method === 'MOMDR') {
        window.location.href = 'http://localhost:8080/MOMDRResultDataDownload'
        console.log('download MOMDR result!')
      } else if (this.tableData[index].method === 'EpiMC') {
        window.location.href = 'http://localhost:8080/EpiMCResultDataDownload'
        console.log('download EpiMC result!')
      }
    }
  },
  mounted () {
    // 发送一个请求读取列表
    RefreshTask().then(res => {
      console.log(res)
      let i
      for (i = 0; i < res.length; i++) {
        this.tableData.push(res[i])
      }
    })
    console.log('sssssss')
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
}

.el-row :last-child {
  margin-bottom: 0;
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
