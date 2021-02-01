import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/introduction'
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
      meta: {title: '自述文件'},
      children: [
        {// 系统首页
          path: '/introduction',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Introduction.vue'),
          meta: {title: '系统首页'}
        },
        {// 算法1----HiSeekerPage
          path: '/HiSeekerPage',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/HiSeekerPage.vue'),
          meta: {title: '算法1'}
        },
        {// 数据生成界面
          path: '/DataGeneration',
          component: () => import(/* webpackChunkName: "icon" */ '../components/page/DataGeneration.vue'),
          meta: {title: '数据生成界面'}
        },
        {// 算法对比界面
          path: '/MethodComparison',
          component: () => import(/* webpackChunkName: "icon" */ '../components/page/MethodComparison.vue'),
          meta: {title: '数据生成界面'}
        },
        {// SNP查询界面
          path: '/SNPInquery',
          component: () => import(/* webpackChunkName: "icon" */ '../components/page/SNPInquery.vue'),
          meta: {title: 'SNP查询界面'}
        },
        {// 任务控制界面
          path: '/TaskSummary',
          component: () => import(/* webpackChunkName: "icon" */ '../components/page/TaskSummary.vue'),
          meta: {title: '任务控制界面'}
        },
        {
          path: '/404',
          component: () => import(/* webpackChunkName: "404" */ '../components/alternate/404.vue'),
          meta: {title: '404'}
        }
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
