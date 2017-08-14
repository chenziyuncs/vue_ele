import Vue from 'vue'
import Router from 'vue-router'
import header from '../components/header/header.vue'
import goods from '../components/goods/goods.vue'
import ratings from '../components/ratings/ratings.vue'
import seller from '../components/seller/seller.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass:"active",
  routes: [
    {
      path:'/',
      redirect:'/goods'
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path: '/ratings',
      component: ratings
    }
  ]
})
