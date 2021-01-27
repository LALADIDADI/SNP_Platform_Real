<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 算法对比界面
        </el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="introduction-box">
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-row>
              <el-button type="primary" @click="addLength">增加方法</el-button>
              <el-button type="primary" @click="subLength">减少方法</el-button>
              <el-button type="danger" @click="exportChart">导出图表</el-button>
            </el-row>
            <el-row>
              <div v-for="(i,item) in options1.datasets.length" :key="item">
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-input v-model="options1.datasets[i-1].label" placeholder="方法名"></el-input>
                  </el-col>
                  <el-col :span="16">
                    <el-input v-model="options1.datasets[i-1].data[0]" placeholder="请输入内容"></el-input>
                  </el-col>
                </el-row>
              </div>
            </el-row>
          </div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">
            <el-input v-model="options1.title.text" placeholder="请输入标题"></el-input>
          </div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple">
            <div class="schart-box">
              <div class="content-title"></div>
              <schart class="schart" canvasId="bar" :options="options1" ref="chart"></schart>
            </div>
          </div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Schart from 'vue-schart'
import FileSaver from 'file-saver'

export default {
  name: 'MethodComparison',
  components: {
    Schart
  },
  data () {
    return {
      methodName: ['A', 'B', 'C', 'D'],
      power: ['11', '22', '33', '44'],
      options1: {
        type: 'bar',
        title: {
          text: '算法对比图'
        },
        bgColor: '#fbfbfb',
        labels: ['属性1', '属性2', '属性3', '属性4', '属性5', '属性6'],
        datasets: [
          {
            label: '算法一',
            fillColor: 'rgba(241, 49, 74, 0.5)',
            data: [234, 278, 270, 190, 230, 100]
          },
          {
            label: '算法二',
            data: [164, 178, 190, 135, 160, 100]
          },
          {
            label: '算法三',
            data: [144, 198, 150, 235, 120, 100]
          }
        ]
      }
    }
  },

  methods: {
    addLength () {
      console.log(this.list)
      this.options1.datasets.push({
        label: '算法四',
        data: [144, 198, 150, 235, 120, 100]
      })
    },
    subLength () {
      console.log(this.list)
      this.options1.datasets.pop()
    },
    exportChart () {
      if (typeof Blob !== 'function') {
        this.$alert('您的浏览器不支持！请使用最新版本chrome/firefox浏览器!')
        return
      }
      const canvas = this.$refs.chart.$el.getElementsByTagName('canvas')[0]
      try {
        canvas.toBlob((blob) => {
          FileSaver.saveAs(
            blob,
            'chart.png'
          )
        })
      } catch (e) {
        console.error(e)
        this.$alert('导出失败！')
      }
    }
  }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
&:last-child {
   margin-bottom: 0;
 }
}
.introduction-box{
  height: 550px;
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

/*柱状图相关*/
.schart-box {
  display: inline-block;
  margin: 20px;
}

.schart {
  width: 600px;
  height: 400px;
}

.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}

</style>
