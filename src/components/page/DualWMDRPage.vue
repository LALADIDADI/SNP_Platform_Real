<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 算法板块
        </el-breadcrumb-item>
        <el-breadcrumb-item>DualWMDR</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="introduction-box">
        <el-row :gutter="20" >
          <el-col :span="9">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="算法简介 Algorithm introduction" name="1">
                <div>DualWMDR是一种将双筛选策略与MDR相结合的算法，来计算和检测全基因组多位点上位性相互作用。</div>
              </el-collapse-item>
              <el-collapse-item title="算法流程图 Algorithm flowchart" name="2">
                <el-image :src="pics"></el-image>
              </el-collapse-item>
              <el-collapse-item title="参数描述 Parameter Description" name="3">
                <div><strong>percent:</strong> the percent(default = 1.0)</div>
                <div><strong>topT:</strong> the TopT(default = 200)</div>
                <div><strong>topK:</strong> number of the most significant interactions(default = 100)</div>
                <div><strong>threshold:</strong> the significance level(default = 1)</div>
                <div><strong>fold:</strong> number of fold(default = 5)</div>
                <div><strong>constant:</strong> the constant(default = 0.5)</div>
                <div><strong>alpha:</strong> the alpha(default = 0.25)</div>
                <div><strong>order:</strong>  the order of SNP-SNP interaction (default = 2)</div>
              </el-collapse-item>
              <el-collapse-item title="数据样例 Data sample" name="4">
                <div><el-image :src="dataFormatPic"></el-image></div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <el-col :span="6">
            <el-form :model="params" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="percent:" prop="percent">
                <el-input v-model="params.percent" ></el-input>
              </el-form-item>
              <el-form-item label="topT:" prop="topT">
                <el-input v-model="params.topT" ></el-input>
              </el-form-item>
              <el-form-item label="topK:" prop="topK">
                <el-input v-model="params.topK" ></el-input>
              </el-form-item>
              <el-form-item label="threshold:" prop="threshold">
                <el-input v-model="params.threshold"></el-input>
              </el-form-item>
              <el-form-item label="数据文件" prop="data_1">
                <el-upload
                  class="upload-demo"
                  ref="my-upload"
                  action="http://localhost:8080/DualWMDRInputDataUpload"
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
            <el-row type="flex" justify="left">
            <el-form :model="params" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="fold:" prop="fold">
                <el-input v-model="params.fold"></el-input>
              </el-form-item>
              <el-form-item label="constant:" prop="constant">
                <el-input v-model="params.constant"></el-input>
              </el-form-item>
              <el-form-item label="alpha:" prop="alpha">
                <el-input v-model="params.alpha"></el-input>
              </el-form-item>
              <el-form-item label="order:" prop="order">
                <el-input v-model="params.order"></el-input>
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
        <el-table-column property="error-rates" label="error-rates"></el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>

import {DualWMDRParamsUpload, DualWMDRPollResultData, DualWMDRResultShow, DualWMDRForceStop} from '../../api/index'
import {DualWMDRBatchRequest, DualWMDRJustSetParams} from '../../api/addIndex'

export default {
  name: 'DualWMDRPage',
  data () {
    return {
      // 结果展示，抽屉参数
      drawer: false,
      tableData: [],
      // 左半部分参数
      activeName: '1',
      pics: '../../../static/image/DualWMDR.png',
      dataFormatPic: '../../../static/image/dataFormat.png',
      // 右半部分参数
      params: {
        percent: '1.0',
        topT: '200',
        topK: '100',
        threshold: '1',
        fold: '5',
        constant: '0.5',
        alpha: '0.25',
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
        percent: [
          { required: true, message: '参数percent是必须的', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 2 个字符', trigger: 'blur' }
        ],
        topT: [
          { required: true, message: '参数topT是必须的', trigger: 'change' }
        ],
        topK: [
          { required: true, message: '参数topK是必须的', trigger: 'change' }
        ],
        threshold: [
          { required: true, message: '参数threshold是必须的', trigger: 'change' }
        ],
        fold: [
          { required: true, message: '参数fold是必须的', trigger: 'change' }
        ],
        constant: [
          { required: true, message: '参数constant是必须的', trigger: 'change' }
        ],
        alpha: [
          { required: true, message: '参数alpha是必须的', trigger: 'change' }
        ],
        order: [
          { required: true, message: '参数order是必须的', trigger: 'change' }
        ]
      }
    }
  },

  methods: {
    // 强制终止方法
    forceStop () {
      DualWMDRForceStop().then(res => {
        console.log('DualWMDR进程已全部停止')
        // 提示
        this.$message({
          message: `DualWMDR进程已全部停止`,
          type: `success`
        })
      })
    },
    // 结果展示方法
    downloadShow () {
      this.drawer = true
      this.tableData = []
      console.log('即将打开抽屉展示结果')
      DualWMDRResultShow(this.paramId).then(res => {
        console.log('DualWMDR结果展示返回')
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
      DualWMDRBatchRequest(this.params).then(res => {
        console.log('DualWMDR批处理页面显示参数提交')
        console.log(res)
      })
      DualWMDRJustSetParams(this.params).then(res => {
        console.log('DualWMDR批处理基本参数提交')
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
      DualWMDRParamsUpload(this.params).then(res => {
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
      window.location.href = 'http://localhost:8080/DualWMDRResultDataDownload'
      // 下载文件后，解除禁用
      this.frontParams.readyRun = true
    },
    // 轮询方法，请求后端后自动执行
    pollResultData () {
      DualWMDRPollResultData(this.paramId).then(res => {
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
