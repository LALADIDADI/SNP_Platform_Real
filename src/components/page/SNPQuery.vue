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
          <el-col :span="6">
            <el-row>
              <el-alert
                title="输入SNP编号"
                type="info"
                description="在下方输入SNP编号，即可跳转NCBI查询。"
                :closable="false"
                show-icon>
              </el-alert>
            </el-row>
            <el-row>
            <div>
              <el-col :span="6">
                <el-button type="primary" @click="getData">SNP查询</el-button>
              </el-col>
              <el-col :span="16" :push="2">
                <el-input v-model="form.name" placeholder="请输入SNP编号"></el-input>
              </el-col>
          </div>
            </el-row>
            <el-row>
              <el-alert
                title="获取更多信息"
                type="info"
                :closable="false"
                >
              </el-alert>
              <el-link class="myLink" href="https://www.ncbi.nlm.nih.gov" type="primary">网站链接</el-link>
            </el-row>
          </el-col>
          <el-col :span="17" :push="1">
            <div style="width:800px;height:730px;overflow:hidden;border:0px">
              <div style="width:500px;height:730px;margin:-255px 0px 0px -160px;">
                <iframe :src="url" width="950" height="730" frameborder="1" scrolling="auto" ></iframe>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SNPQuery',
  data () {
    return {
      url: 'https://www.ncbi.nlm.nih.gov/snp/?term=rs380390',
      form: {
        name: 'rs380390',
        textarea: '信息将会在此处显示'
      }
    }
  },

  methods: {
    // 通过NCBI获取数据
    getData () {
      console.log('query!')
      this.url = `https://www.ncbi.nlm.nih.gov/snp/?term=${this.form.name}`
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>
/*页面微调*/
.myLink{
  margin-top: 10px;
}
/*页面布局*/
.introduction-box{
  height: 700px;
}
.sub-introduction{
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
