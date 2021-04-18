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
          <el-col :span="10">
            <el-row>
              <el-alert
                title="进行算法性能的对比"
                type="info"
                description="在下方的面板中，您可以自定义属性、算法和图像类型，并输入相应数据，其图像会在右边即时展示，并提供下载。"
                :closable = "false"
                show-icon>
              </el-alert>
            </el-row>
            <el-row>
              <div>
                <el-button type="primary" icon="el-icon-download" @click="exportChart" class="exportImg">导出图像</el-button>
                <el-radio v-model="radio1" @change="changeChartType" label="1" border>柱状图</el-radio>
                <el-radio v-model="radio1" @change="changeChartType" label="2" border>折线图</el-radio>
              </div>
            </el-row>
            <div class="grid-content bg-purple left-panel">
            <el-row type="flex" justify="center">
              <el-button type="primary" @click="addLength">增加方法</el-button>
              <el-button type="primary" @click="subLength">减少方法</el-button>
              <el-button type="primary" @click="addParam">增加属性</el-button>
              <el-button type="primary" @click="subParam">减少属性</el-button>
<!--              <el-button type="danger" @click="exportChart">导出图表</el-button>-->
            </el-row>
            <el-row :gutter="10">
              <el-col :span="4" >
                <el-input v-model="options1.title.text" placeholder="名称"></el-input>
              </el-col>
              <div v-for="(i,item) in options1.labels.length" :key="item">
                <el-col :span="4">
                <el-input v-model="options1.labels[i-1]" placeholder="属性名" ></el-input>
                  </el-col>
              </div>
            </el-row>
            <el-row>
              <div v-for="(i,item) in options1.datasets.length" :key="item">
                <el-row :gutter="10">
                  <el-col :span="4">
                    <el-input v-model="options1.datasets[i-1].label" placeholder="方法名"></el-input>
                  </el-col>
                  <div v-for="(j,item) in options1.labels.length" :key="item">
                    <el-col :span="4">
                      <el-input v-model="options1.datasets[i-1].data[j-1]" placeholder="属性值"></el-input>
                    </el-col>
                  </div>
                </el-row>
              </div>
            </el-row>
          </div></el-col>
          <el-col :span="13" :push="1"><div class="grid-content-right bg-purple">
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
      radio1: '1',
      options1: {
        type: 'bar',
        title: {
          text: 'chart'
        },
        bgColor: '#fbfbfb',
        labels: ['属性1', '属性2', '属性3', '属性4', '属性5'],
        datasets: [
          {
            label: '算法1',
            fillColor: 'rgba(241, 49, 74, 0.5)',
            data: [4, 7, 2, 8, 1]
          },
          {
            label: '算法2',
            data: [8, 9, 7, 5, 7]
          },
          {
            label: '算法3',
            data: [3, 1, 7, 4, 3]
          }
        ]
      }
    }
  },

  methods: {
    // 更换图形类型
    changeChartType () {
      if (this.options1.type === 'bar') {
        this.options1.type = 'line'
      } else {
        this.options1.type = 'bar'
      }
    },
    // 增加属性
    addParam () {
      this.options1.labels.push(`属性${this.options1.labels.length + 1}`)
    },
    // 减少属性
    subParam () {
      this.options1.labels.pop()
    },
    // 增加算法
    addLength () {
      console.log(this.list)
      this.options1.datasets.push({
        label: `算法${this.options1.datasets.length + 1}`,
        data: [0, 0, 0, 0, 0]
      })
    },
    // 减少算法
    subLength () {
      console.log(this.list)
      this.options1.datasets.pop()
    },
    // 导出图表的方法
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
/*手动微调*/
.left-panel{
  padding: 20px;
}
.exportImg{
  margin-right: 30px;
}

.el-row {
  margin-bottom: 20px;
&:last-child {
   margin-bottom: 0;
 }
}
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
  height:265px;
}
.grid-content-right {
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
