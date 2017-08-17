<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
          <img :src="seller.avatar" width="64px" height="64px" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
         <div class="supports" v-if="seller.supports">
          <!--使用v-if有值才解析,否则seller.supports[0]获取的是undefined -->
          <span class="icon" :class="supportClases[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
          </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showMask(true)">
        <span>{{seller.supports.length}}</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper"  @click="showMask(true)">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">
        {{seller.bulletin}}
      </span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
    <transition name="fade">
      <div class="mask" v-show="isShow" >
        <div class="mask-wrapper">
          <div class="mask-main">
            <h1 class="title">{{seller.name}}</h1>
            <!-- 星星组件 -->
            <div class="stars-wrapper">
              <stars :score="seller.score" :size="48"></stars>
            </div>
            <div class="info">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="list">
              <li class="item" v-for="(support,index) in seller.supports" :key="index">
                <span class="icon" :class="supportClases[support.type]"></span>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
            <div class="info">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="content">
              <p class="text">
                {{seller.bulletin}}
              </p>
            </div>
          </div>
        </div>
        <div class="mask-footer" @click="showMask(false)">
          <span class="icon-close"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import stars from '../stars/stars.vue'
  export default {
    props:['seller'],
    data(){
      return {
        isShow:false,
        supportClases:['decrease','discount','guarantee','invoice','special']
      }
    },
    methods:{
      showMask(isShow){
        this.isShow = isShow
      }
    },
    components:{
      stars
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"

  .header
    position relative
    color rgb(255,255,255)
    background-color rgba(7,17,27,.5)
    overflow hidden
    font-size 0
    .content-wrapper
      position relative
      margin 24px 12px  18px  24px
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        margin-left 16px
        .title
          margin 2px  0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            background-size  100% 100%
            background-repeat no-repeat
            bg-image(brand)
          .name
            margin-left 6px
            font-size 16px
            color rgb(255,255,255)
            font-weight bold
            line-height 18px
        .description
            font-size 12px
            color rgb(255,255,255)
            font-weight 200
            line-height 12px
            margin-top 8px
            margin-bottom  10px
        .supports
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            background-size 100%  100%
            background-repeat no-repeat
            &.decrease
              bg-image(decrease_1)
            &.discount
              bg-image(discount_1)
            &.guarantee
              bg-image(guarantee_1)
            &.invoice
              bg-image(invoice_1)
            &.special
              bg-image(special_1)
          .text
            font-size 10px
            color rgb(255,255,255)
            font-weight 200
            line-height 12px
      .support-count
        position absolute
        right 0
        bottom 0
        width 48px
        height 24px
        line-height 12px
        font-size 10px
        display inline-block
        border-radius 16px
        text-align center
        color rgb(255,255,255)
        font-weight 200
        line-height 12px
        background-color rgba(0,0,0,0.2)
        span
          line-height 24px 
    .bulletin-wrapper
      font-size 10px
      height 28px
      font-weight 200
      padding 0 12px  0 12px
      line-height 28px
      color rgb(255,255,255)
      background-color rgba(7,17,27,.2)
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      .bulletin-title
        margin-top 8px
        vertical-align top
        display inline-block
        width 22px
        height 12px
        background-repeat no-repeat
        background-size 100%  100%
        bg-image(bulletin)
      .icon-keyboard_arrow_right
        position absolute
        right 12px
        line-height 28px
        bottom 0
    .background
      position absolute
      left 0
      top 0
      background-color rgba(7,17,27,0.2)
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .mask
      position fixed
      left 0
      top 0
      font-size 22px
      width 100%
      height 100%
      background-color rgba(7,17,27,.8)
      z-index 99
      overflow auto
      &.fade-enter-active, &.fade-leave-active
        transition opacity  .5s
      &fade-enter, &.fade-leave-to
        opacity   0
      .mask-wrapper
        min-height 100%
        .mask-main
          padding-top 64px
          padding-bottom 64px
          .title
            font-size 16px
            line-height 16px
            font-weight 700
            text-align center
          .stars-wrapper
            height 24px
            margin 16px 0 28px  0
          .info
            width 80%
            display flex
            margin 0  auto
            .line
              flex 1
              background-color rgba(255,255,255,.2)
              height 1px
              position relative
              top 8px
            .text
              margin 0  12px
              font-size 16px
              line-height 16px
              font-weight 700
              text-align center
          .list
            width 80%
            margin-top 24px
            margin 0  auto  24px  28px
            li
              margin-bottom 12px
              &:last-child
                margin-bottom 0
              .icon
                display  inline-block
                width 16px
                height 16px
                background-repeat no-repeat
                background-size 100%  100%
                &.decrease
                  bg-image(decrease_2)
                &.discount
                  bg-image(discount_2)
                &.guarantee
                  bg-image(guarantee_2)
                &.invoice
                  bg-image(invoice_2)
                &.special
                  bg-image(special_2)
              .text 
                font-size 12px
                line-height 12px
                font-weight 200
                color rgb(255,255,255)
          .content
            .text
              font-size 12px
              font-weight 200
              color rgb(255,255,255)
              line-height 24px
              margin  24px  36px  0 36px
      .mask-footer
        text-align center
        margin-top -64px
        font-size 32px
        color rgba(255,255,255,.5)









</style>
