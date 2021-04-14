<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> SNP查询界面
        </el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="introduction-box">
        <el-row :gutter="20">
          <el-col :span="3" align="right"><div class="grid-content ">
            <el-button type="primary" @click="getData">SNP查询</el-button>
          </div></el-col>
          <el-col :span="6"><div class="grid-content ">
            <el-input v-model="form.name" placeholder="请输入SNP编号"></el-input>
          </div></el-col>
          <el-col :span="2"><div class="grid-content "></div></el-col>
          <el-col :span="12">
            <el-input
              type="textarea"
              :rows="20"
              placeholder="信息将会在此处显示"
              v-model="form.textarea">
            </el-input>
            <div class="grid-content ">
          </div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {fetchDemo} from '../../api/index'

export default {
  name: 'SNPInquery',
  data () {
    return {
      form: {
        name: '123',
        textarea: '信息将会在此处显示'
      }
    }
  },

  methods: {
    // 本地服务器获取数据
    getData () {
      fetchDemo(this.form).then(res => {
        console.log(res)
        this.form.name = res.name
        this.form.textarea = res.textarea
      })
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style>
.introduction-box{
  height: 700px;
}
.sub-introduction{
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
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

</style>
