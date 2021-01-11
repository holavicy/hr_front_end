import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store/index'
import util from '@/libs/util.js'

// 路由数据
import routes from './routes'

import * as dd from 'dingtalk-jsapi'
import config from '@/config'
import api from '@/api'

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
  await store.dispatch('d2admin/page/isLoaded')
  // 确认已经加载组件尺寸设置 https://github.com/d2-projects/d2-admin/issues/198
  await store.dispatch('d2admin/size/isLoaded')
  // 进度条
  NProgress.start()
  // 关闭搜索面板
  store.commit('d2admin/search/set', false)
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some(r => r.meta.auth)) {
    // 这里暂时将cookie里是否存有token作为验证是否登录的条件
    // 请根据自身业务需要修改
    const token = util.cookies.get('token')
    if (token && token !== 'undefined') {
      next()
    } else {
      // 判断当前是否是钉钉环境
      // 若是钉钉环境，进行免登操作；若不是，跳转登录界面
      const isDD = dd.env.platform !== 'notInDingTalk'
      if(isDD){
        dd.ready(function() {
          dd.runtime.permission.requestAuthCode({
            corpId: config.corpId, // 企业id
            onSuccess: function (info) {
              let code = info.code // 通过该免登授权码可以获取用户身份
              let data = {
                code: code
              }
              api.DING_LOGIN(data)
                .then(async (res) => {
                  console.log(res)
                  let roles = []
                  // res.roles.forEach(role => {
                  //   if (role.id == '1741844343') {
                  //     roles.push('admin')
                  //   }
                  // })
                  let user_info = {
                    'staffNo': res.jobnumber,
                    'avatar': res.avatar,
                    'name': res.name,
                    'mobile': res.mobile,
                    'roles': roles
                  }
                  const db = await store.dispatch('d2admin/db/database', {
                    user: true
                  })
                  db
                    .set('user_info', user_info)
                    .write()
                  next()
                })
                .catch(err => {
                  console.log('err', err)
                })
            }});
          });
      } else {
        next({
          name: 'login',
          query: {
            redirect: to.fullPath
          }
        })
      }
      
      // https://github.com/d2-projects/d2-admin/issues/138
      NProgress.done()
    }
  } else {
    // 不需要身份校验 直接通过
    next()
  }
})

router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 多页控制 打开新的页面
  store.dispatch('d2admin/page/open', to)
  // 更改标题
  util.title(to.meta.title)
})

export default router
