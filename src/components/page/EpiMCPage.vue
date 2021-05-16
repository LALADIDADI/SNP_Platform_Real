<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 算法板块
        </el-breadcrumb-item>
        <el-breadcrumb-item>EpiMC</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="introduction-box">
        <el-row :gutter="20" >
          <el-col :span="9">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="算法简介 Algorithm introduction" name="1">
                <div>EpiMC两阶段算法：</div>
                <div>在第一阶段，EpiMC提出了一种基于矩阵分解的方法将所有的snp划分为不同的簇</div>
                <div>在第二阶段，EpiMC使用穷举搜索策略来计算检测全基因组多位点上位性相互作用。</div>
              </el-collapse-item>
              <el-collapse-item title="算法流程图 Algorithm flowchart" name="2">
                <el-image :src="pics"></el-image>
              </el-collapse-item>
              <el-collapse-item title="参数描述 Parameter Description" name="3">
                <div><strong>alternativeC:</strong> the number of the alternative clusterings(default = 4)</div>
                <div><strong>kFea:</strong> the number of cluster in each clusterings(default = 3)</div>
                <div><strong>lambda1:</strong> the superparamter controls the grouping effect of multiple clusterings(default = 10)</div>
                <div><strong>lambda2:</strong> the superparamter controls the diversity of multiple clusterings(default = 10)</div>
                <div><strong>topT:</strong> the number of the obtaining high-quality SNPs(default = 10)</div>
                <div><strong>topK:</strong> the number of the SNP combinations(default = 200)</div>
                <div><strong>order:</strong> the order of SNP combinations(default = 2)</div>
              </el-collapse-item>
              <el-collapse-item title="数据样例 Data sample" name="4">
                <div><el-image :src="dataFormatPic"></el-image></div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <el-col :span="6">
            <el-form :model="params" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="alternativeC:" prop="alternativeC">
                <el-input v-model="params.alternativeC" ></el-input>
              </el-form-item>
              <el-form-item label="kFea:" prop="kFea">
                <el-input v-model="params.kFea" ></el-input>
              </el-form-item>
              <el-form-item label="lambda1:" prop="lambda1">
                <el-input v-model="params.lambda1" ></el-input>
              </el-form-item>
              <el-form-item label="lambda2:" prop="lambda2">
                <el-input v-model="params.lambda2"></el-input>
              </el-form-item>
              <el-form-item label="数据文件" prop="data_1">
                <el-upload
                  class="upload-demo"
                  ref="my-upload"
                  action="http://localhost:8080/EpiMCInputDataUpload"
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
          <el-col :span="6" >
            <el-form :model="params" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="topT:" prop="topT">
                <el-input v-model="params.topT"></el-input>
              </el-form-item>
              <el-form-item label="topK:" prop="topK">
                <el-input v-model="params.topK"></el-input>
              </el-form-item>
              <el-form-item label="order:" prop="order">
                <el-input v-model="params.order"></el-input>
              </el-form-item>
              <el-form-item>
                <p></p>
              </el-form-item>
              <el-form-item>
                <p></p>
              </el-form-item>
              <el-form-item>
                <p></p>
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
            <el-row type="flex" justify="left">
              <el-button type="primary" @click="submitForm()" :disabled = !frontParams.readyRun>运行算法</el-button>
              <el-button type="primary" @click="downloadShow()" :disabled = !paramId.finished plain>结果展示</el-button>
              <el-button type="primary" @click="downloadRes()" :disabled = !paramId.finished plain>结果下载</el-button>
              <el-button @click="batchRun()" type="success" plain>加入批处理</el-button>
            </el-row>
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
        <el-table-column property="SNP1" label="SNP1" ></el-table-column>
        <el-table-column property="SNP2" label="SNP2" ></el-table-column>
        <el-table-column property="SNP3" label="SNP3"></el-table-column>
        <el-table-column property="chi2" label="chi2"></el-table-column>
        <el-table-column property="p-value" label="p-value"></el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>

import {EpiMCParamsUpload, EpiMCPollResultData, EpiMCResultShow} from '../../api/index'
import {EpiMCBatchRequest, EpiMCJustSetParams} from '../../api/addIndex'

export default {
  name: 'EpiMCPage',
  data () {
    return {
      // 结果展示，抽屉参数
      drawer: false,
      tableData: [],
      // 左半部分参数
      activeName: '1',
      pics: '../../../static/image/EpiMC.png',
      dataFormatPic: '../../../static/image/IDTailFormat.png',
      // 右半部分参数
      params: {
        alternativeC: '4',
        kFea: '3',
        lambda1: '10',
        lambda2: '10',
        topT: '10',
        topK: '200',
        order: '2'
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
        alternativeC: [
          { required: true, message: '参数alternativeC是必须的', trigger: 'blur' },
          { min: 1, max: 2, message: '长度在 1 到 2 个字符', trigger: 'blur' }
        ],
        kFea: [
          { required: true, message: '参数kFea是必须的', trigger: 'change' }
        ],
        lambda1: [
          { required: true, message: '参数lambda1是必须的', trigger: 'change' }
        ],
        lambda2: [
          { required: true, message: '参数lambda2是必须的', trigger: 'change' }
        ],
        topT: [
          { required: true, message: '参数topT是必须的', trigger: 'change' }
        ],
        topK: [
          { required: true, message: '参数topK是必须的', trigger: 'change' }
        ],
        order: [
          { required: true, message: '参数order是必须的', trigger: 'change' }
        ]
      }
    }
  },

  methods: {
    // 结果展示方法
    downloadShow () {
      this.drawer = true
      this.tableData = []
      console.log('即将打开抽屉展示结果')
      EpiMCResultShow(this.paramId).then(res => {
        console.log('EpiMC结果展示返回')
        // 将数据写入tableData
        let i
        console.log(res)
        for (i = 0; i < res.length; i++) {
          if (res[i] != null) {
            this.tableData.push(res[i])
          }
        }
      })
      // 结果展示后，解除禁用
      this.frontParams.readyRun = true
    },
    // 加入批处理的算法
    batchRun () {
      console.log('开始批处理')
      EpiMCBatchRequest(this.params).then(res => {
        console.log('EpiMC批处理页面显示参数提交')
        console.log(res)
      })
      EpiMCJustSetParams(this.params).then(res => {
        console.log('EpiMC批处理基本参数提交')
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
      EpiMCParamsUpload(this.params).then(res => {
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
      window.location.href = 'http://localhost:8080/EpiMCResultDataDownload'
      // 下载文件后，解除禁用
      this.frontParams.readyRun = true
    },
    // 轮询方法，请求后端后自动执行
    pollResultData () {
      EpiMCPollResultData(this.paramId).then(res => {
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
</style>
