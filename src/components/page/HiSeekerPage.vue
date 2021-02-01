<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 算法板块
        </el-breadcrumb-item>
        <el-breadcrumb-item>HiSeeker</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="introduction-box">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="算法简介 Algorithm introduction" name="1">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              </el-collapse-item>
              <el-collapse-item title="算法流程图 Algorithm flowchart" name="2">
                <el-image :src="pics"></el-image>
              </el-collapse-item>
              <el-collapse-item title="参数描述 Parameter Description" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              </el-collapse-item>
              <el-collapse-item title="数据样例 Data sample" name="4">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <el-col :span="12">
            <el-form :model="params" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="参数零：" prop="param_0">
                <el-input v-model="params.param_0" maxlength="10" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="参数一：" prop="param_1">
                <el-select v-model="params.param_1" placeholder="请选择参数">
                  <el-option label="1.0" value="value1"></el-option>
                  <el-option label="2.0" value="value2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="参数二：" prop="param_2">
                <el-select v-model="params.param_2" placeholder="请选择参数">
                  <el-option label="1.0" value="value1"></el-option>
                  <el-option label="2.0" value="value2"></el-option>
                  <el-option label="3.0" value="value3"></el-option>
                  <el-option label="4.0" value="value4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="参数三：" prop="param_3">
                <el-switch v-model="params.param_3"></el-switch>
              </el-form-item>
                <el-form-item label="数据文件" prop="data_1">
                  <el-upload
                    class="upload-demo"
                    action="http://localhost:8080/uploadDemo"
                    name="txtFile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed">
                    <el-button type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传txt文件，且不超过500kb</div>
                  </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm()">运行算法</el-button>
                <el-button @click="resetForm('ruleForm')">结果下载</el-button>
                <el-button @click="resetForm('ruleForm')">样例下载</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {Method1ParamsUpload} from '../../api/index'

export default {
  name: 'HiSeekerPage',
  data () {
    return {
      // 左半部分参数
      activeName: '1',
      pics: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F11981132422%2F0.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614744153&t=79514d4f045ee1eb4d6b9f2753d1e064',
      // 右半部分参数
      params: {
        param_0: '12345',
        param_1: '1.0',
        param_2: '2.0',
        param_3: true
      },
      rules: {
        param_0: [
          { required: true, message: '请输入参数0', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        param_1: [
          { required: true, message: '请输入参数1', trigger: 'change' } // trigger为表单验证触发方式
        ],
        param_2: [
          { required: true, message: '请输入参数2', trigger: 'change' }
        ],
        param_3: [
          { required: true, message: '请输入参数3', trigger: 'change' }
        ],
        param_4: [
          { type: 'array', required: true, message: '请至少选择一个香料', trigger: 'change' }
        ]
      }
    }
  },

  methods: {
    submitForm () {
      Method1ParamsUpload(this.params).then(res => {
        console.log(res)
      })
    },
    resetForm () {
      console.log('reset!')
    },
    // 数据上传方法
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
    }
  }
}
</script>

<style>
.introduction-box{
  height: 500px;
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
