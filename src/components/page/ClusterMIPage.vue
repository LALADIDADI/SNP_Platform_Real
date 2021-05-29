<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 算法板块
        </el-breadcrumb-item>
        <el-breadcrumb-item>ClusterMI</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="introduction-box">
        <el-row :gutter="20" >
          <el-col :span="9">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="算法简介 Algorithm introduction" name="1">
                <div>ClusterMI为两阶段算法：</div>
                <div>在筛选阶段，ClusterMI按照SNPs间的关联性强弱将其划分到多个簇中进行快速的分析筛选；</div>
                <div>在搜索阶段，ClusterMI根据保留两位点组合的数量大小采用不同的搜索策略。</div>
              </el-collapse-item>
              <el-collapse-item title="算法流程图 Algorithm flowchart" name="2">
                <el-image :src="pics"></el-image>
              </el-collapse-item>
              <el-collapse-item title="参数描述 Parameter Description" name="3">
                <div><strong>sigThreshold:</strong> the_significance_level(default = 0.05)</div>
                <div><strong>kCluster:</strong> number of clusters(default = 3)</div>
                <div><strong>rou:</strong> evaporation rate in Ant Colony Optimizaion(default = 0.05)</div>
                <div><strong>phe:</strong> initial pheromone level_for each locus(default = 100)</div>
                <div><strong>alpha:</strong> weight given to pheromone deposited by ants(default = 1.00)</div>
                <div><strong>iAntCount:</strong> number of ants(default = 500)</div>
                <div><strong>iterCount:</strong> number of iterations(default = 100)</div>
                <div><strong>kLociSet:</strong> number of pairwise SNPs selected by an ant in each iteration(default = 3)</div>
                <div><strong>kEpiModel:</strong> number of SNPs in an epistatic interaction(default = 4)</div>
                <div><strong>kTopModel:</strong> number of top ranking haplotypes in the ACO search stage(default = 1000)</div>
                <div><strong>topK:</strong> number of the most significant interactions(default = 100)</div>
                <div><strong>searchType:</strong> 0 for exhuastive search, 1 for ACO search(default = 1)</div>
              </el-collapse-item>
              <el-collapse-item title="数据样例 Data sample" name="4">
                <div><el-image :src="dataFormatPic"></el-image></div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <el-col :span="5">
            <el-form :model="params" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="sigThreshold:" prop="sigThreshold">
                <el-input v-model="params.sigThreshold" ></el-input>
              </el-form-item>
              <el-form-item label="kCluster:" prop="kCluster">
                <el-input v-model="params.kCluster" ></el-input>
              </el-form-item>
              <el-form-item label="rou:" prop="rou">
                <el-input v-model="params.rou" ></el-input>
              </el-form-item>
              <el-form-item label="phe:" prop="phe">
                <el-input v-model="params.phe"></el-input>
              </el-form-item>
              <el-form-item label="数据文件" prop="data_1">
                <el-upload
                  class="upload-demo"
                  ref="my-upload"
                  action="http://localhost:8080/ClusterMIInputDataUpload"
                  name="txtFile"
                  :show-file-list = false
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="105"
                  :on-success="uploadSuccess"
                  :on-exceed="handleExceed">
                  <el-button type="primary" :disabled = !frontParams.readyRun>点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">请上传txt文件，且不超过500MB</div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="5" >
            <el-row type="flex" justify="left">
            <el-form :model="params" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="alpha:" prop="alpha">
                <el-input v-model="params.alpha"></el-input>
              </el-form-item>
              <el-form-item label="iAntCount:" prop="iAntCount">
                <el-input v-model="params.iAntCount"></el-input>
              </el-form-item>
              <el-form-item label="iterCount:" prop="iterCount">
                <el-input v-model="params.iterCount"></el-input>
              </el-form-item>
              <el-form-item label="kLociSet:" prop="kLociSet">
                <el-input v-model="params.kLociSet"></el-input>
              </el-form-item>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>算法进度</span>
                </div>
                <div class="text item">
                  <el-progress :text-inside="true" :stroke-width="24" :percentage=paramId.progress status="success"></el-progress>
                </div>
              </el-card>
              <el-form-item>
                <p></p>
              </el-form-item>
            </el-form>
            </el-row>
            <el-row type="flex" justify="left">
              <el-button type="primary" @click="submitForm()" :disabled = !frontParams.readyRun>运行算法</el-button>
              <el-button type="primary" @click="downloadShow()" :disabled = !paramId.finished plain>结果展示</el-button>
              <el-button type="primary" @click="downloadRes()" :disabled = !paramId.finished plain>结果下载</el-button>
              <el-button @click="batchRun()" type="success" plain>加入批处理</el-button>
            </el-row>
            <el-row type="flex" justify="left" class = "secondRow">
              <el-button type="warning" @click="forceStop()" plain>强制终止</el-button>
            </el-row>
          </el-col>
          <el-col :span="5">
            <el-form :model="params" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="kEpiModel:" prop="kEpiModel">
                <el-input v-model="params.kEpiModel" ></el-input>
              </el-form-item>
              <el-form-item label="kTopModel:" prop="kTopModel">
                <el-input v-model="params.kTopModel"></el-input>
              </el-form-item>
              <el-form-item label="topK:" prop="topK">
                <el-input v-model="params.topK"></el-input>
              </el-form-item>
              <el-form-item label="searchType:" prop="typeOfSearch">
                <el-input v-model="params.typeOfSearch"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-drawer
      title="结果展示"
      :visible.sync="drawer"
      direction="rtl"
      size="30%">
      <el-table :data="tableData">
        <el-table-column property="SNP1" label="SNP1" width="100"></el-table-column>
        <el-table-column property="SNP2" label="SNP2" width="100"></el-table-column>
        <el-table-column property="SNP3" label="SNP3"></el-table-column>
        <el-table-column property="chi2" label="chi2"></el-table-column>
        <el-table-column property="p-value" label="p-value"></el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>

import {ClusterMIParamsUpload, ClusterMIPollResultData, ClusterMIResultShow, ClusterMIForceStop} from '../../api/index'
import {ClusterMIBatchRequest, ClusterMIJustSetParams} from '../../api/addIndex'

export default {
  name: 'ClusterMIPage',
  data () {
    return {
      // 结果展示，抽屉参数
      drawer: false,
      tableData: [],
      // 左半部分参数
      activeName: '1',
      pics: '../../../static/image/ClusterMIChartFlow.png',
      dataFormatPic: '../../../static/image/dataFormat.png',
      // 右半部分参数
      params: {
        sigThreshold: '0.05',
        kCluster: '3',
        rou: '0.01',
        phe: '500',
        alpha: '1',
        iAntCount: '1000',
        iterCount: '100',
        kLociSet: '2',
        kEpiModel: '3',
        kTopModel: '1000',
        topK: '100',
        typeOfSearch: '0'
      },
      paramId: {
        queryId: '',
        finished: false,
        progress: 0
      },
      frontParams: {
        readyRun: true
      },
      localParams: {
        fileCount: 0
      },
      rules: {
        sigThreshold: [
          { required: true, message: '参数sigThreshold是必须的', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
        ],
        kCluster: [
          { required: true, message: '参数kCluster是必须的', trigger: 'change' }
        ],
        rou: [
          { required: true, message: '参数rou是必须的', trigger: 'change' }
        ],
        phe: [
          { required: true, message: '参数phe是必须的', trigger: 'change' }
        ],
        alpha: [
          { required: true, message: '参数alpha是必须的', trigger: 'change' }
        ],
        iAntCount: [
          { required: true, message: '参数iAntCount是必须的', trigger: 'change' }
        ],
        iterCount: [
          { required: true, message: '参数iterCount是必须的', trigger: 'change' }
        ],
        kLociSet: [
          { required: true, message: '参数kLociSet是必须的', trigger: 'change' }
        ],
        kEpiModel: [
          { required: true, message: '参数kEpiModel是必须的', trigger: 'change' }
        ],
        topK: [
          { required: true, message: '参数topK是必须的', trigger: 'change' }
        ],
        typeOfSearch: [
          { required: true, message: '参数typeOfSearch是必须的', trigger: 'change' }
        ]
      }
    }
  },

  methods: {
    // 强制终止方法
    forceStop () {
      ClusterMIForceStop().then(res => {
        console.log('ClusterMI进程已全部停止')
        // 提示
        this.$message({
          message: `ClusterMI进程已全部停止`,
          type: `success`
        })
      })
    },
    // 结果展示方法
    downloadShow () {
      this.drawer = true
      this.tableData = []
      console.log('即将打开抽屉展示结果')
      ClusterMIResultShow(this.paramId).then(res => {
        console.log('ClusterMI结果展示返回')
        // 将数据写入tableData
        let i
        for (i = 0; i < res.length; i++) {
          this.tableData.push(res[i])
        }
      })
      // 结果展示后，解除禁用
      this.frontParams.readyRun = true
    },
    // 加入批处理的算法
    batchRun () {
      console.log('开始批处理')
      ClusterMIBatchRequest(this.params).then(res => {
        console.log('ClusterMI批处理页面显示参数提交')
        console.log(res)
      })
      ClusterMIJustSetParams(this.params).then(res => {
        console.log('ClusterMI批处理基本参数提交')
      })
      // 提示
      this.$message({
        message: `加入批处理成功`,
        type: `success`
      })
    },
    // 调用算法方法
    submitForm () {
      // 请求后端
      ClusterMIParamsUpload(this.params).then(res => {
        console.log(res)
        console.log(res.queryId)
        this.paramId.queryId = res.queryId
      })
      this.startPoll()
      // 在算法完成前，禁止再次使用算法（暂时的策略）
      this.frontParams.readyRun = false
      this.paramId.finished = false
      // 清空文件列表
      this.wipeButt()
    },
    // 下载返回结果文件方法
    downloadRes () {
      console.log('downloadRes Method')
      window.location.href = 'http://localhost:8080/ClusterMIResultDataDownload'
      // 下载文件后，解除禁用
      this.frontParams.readyRun = true
    },
    // 轮询方法，请求后端后自动执行
    pollResultData () {
      ClusterMIPollResultData(this.paramId).then(res => {
        console.log(res)
        if (res.finished === 'true') {
          // do something
          this.paramId.finished = true
          this.stopPoll()
        }
        // 实时更新进度条
        this.paramId.progress = res.progress
      })
    },
    startPoll () {
      this.myInterval = window.setInterval(() => {
        setTimeout(() => {
          this.pollResultData()
        }, 1)
      }, 3000)
    },
    // 停止轮询方法
    stopPoll () {
      clearInterval(this.myInterval)
    },
    // 生成调用号方法
    createQueryId () {
      var _this = this
      let yy = new Date().getFullYear()
      let mm = new Date().getMonth() + 1
      let dd = new Date().getDate()
      let hh = new Date().getHours()
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
      let getTime = yy + '-' + mm + '-' + dd + '-' + hh + '-' + mf + '-' + ss
      _this.params.queryId = getTime
      console.log(this.params.queryId)
    },
    // 输入数据上传方法
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除该文件吗？`)
    },
    uploadSuccess (response, files, fileList) {
      this.localParams.fileCount += 1
      if (this.localParams.fileCount < fileList.length) {
        return 0
      } else {
        return this.$message({
          message: `上传成功，共上传${fileList.length}个文件`,
          type: `success`
        })
      }
    },
    // 重置因上传成功无法恢复的状态，比如文件列表和fileCount
    wipeButt () {
      this.localParams.fileCount = 0
      this.$refs['my-upload'].clearFiles()
    },
    // 文件上传代表清空进度条
    uploadFiles () {
      this.paramId.progress = 0
    }
  }
}
</script>

<style>
.introduction-box{
  height: 700px;
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
.left-bottom{
  margin-top: 20px;
}
.right-bottom{
  margin-top: 20px;
}
.el-upload--picture-card{
  width: 100px;
  height: 100px;
}
.el-upload{
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.el-upload-list--picture-card .el-upload-list__item{
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.el-upload-list--picture-card .el-upload-list__item-thumbnail{
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.avatar{
  width: 100px;
  height: 100px;
}
/*自定义*/
.secondRow {
  margin-top: 8px;
}
</style>
