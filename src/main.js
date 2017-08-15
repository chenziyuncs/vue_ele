import Vue from 'vue'
import app from './app'
import router from './router'
import './common/stylus/index.styl'
import VueResource from 'vue-resource'
import './mock/mockServer'//引入mock模块，就可以访问它映射的路由接口

Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h => h(app),
  router
})
