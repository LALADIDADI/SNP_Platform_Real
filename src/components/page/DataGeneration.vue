<template>
  <el-container>
      <div>
        <div class="crumbs">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-lx-calendar"></i> 数据生成界面
            </el-breadcrumb-item>
            <el-breadcrumb-item></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="container">
          <div class="introduction-box">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item title="模拟数据模型展示" name="1">
                    <el-image :src="pic1" ></el-image>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
              <el-col :span="10" :push="1">
                <el-row>
                  <el-col :span="24"><div>
                    <el-alert
                      title="使用GAMETES"
                      type="info"
                      description="我们推荐您使用软件GAMETES来生成您所需要的数据。通过GAMETES，您可以随时生成不同的模拟数据来调试您的算法。"
                      :closable="false"
                      show-icon>
                    </el-alert>
                  </div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><div>
                    <el-button type="primary" :loading="false" @click="downloadUserManual" >用户手册下载</el-button>
                    <el-button type="primary" :loading="false" @click="downloadGameTes" >源文件下载</el-button>
                  </div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><div>
                    <el-alert
                      title="当然，您也可以直接调起程序。"
                      type="info"
                      description="点击下方按钮，则会调起本软件中的嵌入的GAMETES。"
                      :closable="false"
                      >
                    </el-alert>
                  </div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><div>
                    <el-button type="primary" :loading="false" @click="openGameTes" >调起程序</el-button>
                  </div></el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>

import {OpenGameTes} from '../../api/addIndex'

export default {
  name: 'DataGeneration',
  data () {
    return {
      activeNames: ['1'],
      pic1: '../../../static/image/data_model2.png'
    }
  },
  methods: {
    // 向后端发起调用GAMETES2.0
    openGameTes () {
      OpenGameTes().then(res => {
        console.log(res)
      })
    },
    // 提供用户手册的下载
    downloadUserManual () {
      console.log('downloadUserManual Method')
      window.location.href = 'http://localhost:8080/downloadUserManual'
    },
    // 提供源文件的下载
    downloadGameTes () {
      console.log('downloadGameTes Method')
      window.location.href = 'http://localhost:8080/downloadGameTes'
    },
    // 左边折叠栏展示方法
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>

<style>

.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.introduction-box{
  height: 700px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
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

/*布局,这行报错的代码千万别动*/
.el-row {
  margin-bottom: 20px;
&:last-child {
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
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

</style>
