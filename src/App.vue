<template>
  <div>
      <ele-header :seller="seller"></ele-header>
      <div class="tab border-1px">
        <div class="tab-item">
          <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings">评价</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
      </div>
      <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import axios from 'axios'
export default {
  data(){
    return {
      seller:{}
    }
  },
  created(){
    //使用vue-resource发送ajax请求express提供的模拟接口
    this.$http.get('/api/goods')
      .then(response =>{
        const result = response.body
        console.log('vue-resource',result)
      })
      //使用axios发送ajax请求mockjs提供的模拟接口
    axios.get('/api2/seller')
      .then(response =>{
        const result = response.data
        console.log('axios',result)
        if(result.code === 0){
          this.seller = result.data
          
        }
      })
  },
  components:{
    'ele-header':header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
.tab
  display flex
  height 40px
  line-height 40px
  font-size 14px
  border-1px(pink)
  .tab-item
    width 0
    flex 1
    text-align center
    font-size 14px
    & > a
      
      display block
    .active
      color rgb(240,20,20)
</style>
