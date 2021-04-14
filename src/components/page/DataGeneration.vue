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
              <el-col :span="12">
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item title="模拟数据模型展示" name="1">
                    <el-table
                      :data="tableData"
                      height="150"
                      border
                      style="width: 100%">
                      <el-table-column
                        prop="date"
                        label="参数"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="参数简介"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="参数实例">
                      </el-table-column>
                    </el-table>
                  </el-collapse-item>
                  <el-collapse-item title="模拟数据信息" name="2">
                    <el-table
                      :data="tableData_2"
                      height="150"
                      border
                      style="width: 100%">
                      <el-table-column
                        prop="parameter"
                        label="属性"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="count"
                        label="个数">
                      </el-table-column>
                    </el-table>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
              <el-col :span="12" :push="1">
                <el-row>
                  <el-col :span="24"><div class="grid-content ">
                    <el-button type="primary" :loading="false">下载数据压缩包</el-button>
                  </div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><div class="grid-content ">
                  </div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><div class="grid-content">
                    <el-upload
                      class="upload-demo"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :before-remove="beforeRemove"
                      multiple
                      :limit="3"
                      :on-exceed="handleExceed"
                      :file-list="fileList">
                      <el-button size="small" type="primary">个人数据上传</el-button>
                      <div slot="tip" class="el-upload__tip">请上传txt文件，且不超过500MB</div>
                    </el-upload>
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
export default {
  name: 'DataGeneration',
  data () {
    return {
      activeNames: ['1'],
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      tableData_2: [{
        parameter: 'SNP',
        count: '10'
      }, {
        parameter: 'case',
        count: '12'
      }, {
        parameter: 'control',
        count: '5'
      }],
      fileList: [{name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
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

<style scoped>

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

/*布局*/
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
