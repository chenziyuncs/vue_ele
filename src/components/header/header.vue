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
          <span class="icon decrease"></span>
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
    <div class="background">
      <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" width="100%" height="100%" />
    </div>
    <div class="mask">
      <div class="mask-wrapper">
        <div class="mask-main">
          <h1 class="title">粥品香坊(大运村)</h1>
          <div class="stars-wrapper">
            <div class="starts stars-24">
              <span class="star on"></span>
              <span class="star on"></span>
              <span class="star on"></span>
              <span class="star half"></span>
              <span class="star off"></span>
            </div>
          </div>
          <div class="info">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="list">
            <li>
              <span class="icon decrease"></span>
              <span class="text">在线支付满28减2个隔壁老王</span>
            </li>
            <li>
              <span class="icon decrease"></span>
              <span class="text">vc无限果汁全场8折只限老司机</span>
            </li>
            <li>
              <span class="icon decrease"></span>
              <span class="text">双人原谅绿套餐</span>
            </li>
            <li>
              <span class="icon decrease"></span>
              <span class="text">该商家支持发票，请下单写好发票</span>
            </li>
            <li>
              <span class="icon decrease"></span>
              <span class="text">已加入“隔壁老王培养”计划，食品安全保障</span>
            </li>
          </ul>
          <div class="info">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="content">
            <p class="text">
              粥品香坊其烹饪粥料的秘方来源于中国千年古法，在融合现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然，0添加的良心品质深得消费者青睐，发展至今称为粥类引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
            </p>
          </div>
        </div>
      </div>
      <div class="mask-footer">
        <span class="icon-close"></span>
      </div>
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
            .starts
              text-align center
              .star
                display inline-block
                background-repeat no-repeat
                background-size 100%  100%
              &.stars-24
                .star
                  width 20px
                  height 19px
                  &.on
                    bg-image("../stars/star36_on")
                  &.half
                    bg-image("../stars/star36_half")
                  &.off
                    bg-image("../stars/star36_off")

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
