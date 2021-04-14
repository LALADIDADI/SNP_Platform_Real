<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 系统首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>系统介绍</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="introduction-box">
        <el-row :gutter="20">
          <el-col :span="12">
            <p class="sub-introduction">软件特性</p>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="一致性 Consistency" name="1">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              </el-collapse-item>
              <el-collapse-item title="反馈 Feedback" name="2">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              </el-collapse-item>
              <el-collapse-item title="效率 Efficiency" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              </el-collapse-item>
              <el-collapse-item title="可控 Controllability" name="4">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
          <el-col :span="12">
            <div class="grid-content ql-bg-green">
              <div class="block">
                <el-carousel height="450px">
                  <el-carousel-item v-for="item in pics" :key="item">
                    <el-image :src="item"></el-image>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="left-bottom">
              <p>作者：DADADIDADI</p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right-bottom">
              <p>论文链接：www.snpplat.com</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'introduction',
  data () {
    return {
      activeName: '1',
      pics: ['../../../static/image/ycy.jpg']
    }
  },

  methods: {
    handleChange (val) {
      console.log(val)
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
.left-bottom{
  margin-top: 20px;
}
.right-bottom{
  margin-top: 20px;
}

</style>
