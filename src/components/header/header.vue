<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
          <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" width="64px" height="64px" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">粥品香坊(大运村)</span>
        </div>
        <div class="description">
          蜂鸟专送/38分钟送达
        </div>
        <div class="supports">
          <span class="icon special"></span>
          <span class="text">在线支付满28减5，满50减10</span>
          </div>
      </div>
      <div class="support-count">
        <span>5个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">
        粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
      </span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    
  </div>
</template>

<script>
  export default {}
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
</style>
