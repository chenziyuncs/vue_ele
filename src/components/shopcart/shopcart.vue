<template>
<div>
        <div class="shopcart">
            <div class="content">
                <div class="content-left" @click="toggle">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{highlight:totalCount>0}" >
                            <i class="icon-shopping_cart" :class="{highlight:totalCount>0}"></i>
                        </div>
                        <div class="num" v-if="totalCount">{{totalCount}}</div>
                    </div>
                    <div class="price">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
                </div>
            <div class="content-right">
                <div class="pay" :class="totalPrice-minPrice>=0?'enough':'not-enough'">
                    {{payText}}
                </div>
            </div>
            </div>
            <div class="ball-container">
                <transition :css="false" @before-enter="beforeDrop" @enter="Dropping" @after-enter="afterDrop" v-for="(ball,index) in balls" :key="index">
                    <div class="ball"  v-show="ball.isShow">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="isShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="clearCart">清空</span>
                </div>
                <div class="list-content" ref="listContent">
                    <ul>
                        <li class="food" v-for="(food,index) in foods" :key="index">
                            <span class="name">{{food.name}}</span>
                            <div class="price">￥{{food.price}}</div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food" :update-food-count="updateFoodCount"></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="toggle"></div>
        </transition>
      
</div>
</template>

<script>
import cartcontrol  from '../cartcontrol/cartcontrol.vue'
import BScroll from 'better-scroll'
    export default {
        props:{
            minPrice:Number,
            deliveryPrice:Number,
            foods:Array,
            updateFoodCount:Function,
            clearCart:Function
        },
        data(){
            return {
                isShow:false,
                balls:[//所有小球状态的数组
                    {isShow:false},
                    {isShow:false},
                    {isShow:false},
                    {isShow:false},
                    {isShow:false},
                    {isShow:false}
                ],
                droppingBalls:[]//定义一个空数组保存isShow为true的ball
            }
        },
        methods:{
            toggle(){
                if(this.totalCount === 0){//避免用户在没有添加前点击list表查看，此时没有数据不应打开
                    return
                }
                this.isShow = !this.isShow
            },
            //找到隐藏的小球，让它显示并开始动画
            startDrop(startEl){
                //在balls中找到一个isShow为false的ball对象
                const ball = this.balls.find((ball) =>{
                    return !ball.isShow
                })
                if(ball){
                    //让对应的小球显示
                    ball.isShow = true//一旦显示，调用动画显示周期回调
                    //保存starEl
                    ball.startEl = startEl
                    //保存ball
                    this.droppingBalls.push(ball)
                }
            },
            //在显示动画开始之前调用，指定动画开始的状态
            beforeDrop(el){//el是发生动画的小球div
                const ball = this.droppingBalls.shift()//删除下标为0的ball，shift调用返回给ball
                const startEl = ball.startEl
                //计算x/y的偏移量
                let offsetX = 0
                let offsetY = 0 
                const elLeft = 32
                const elBottom = 22
                const {left,top} = startEl.getBoundingClientRect()
                const startElleft = left
                const startElTop = top
                offsetX = startElleft - elLeft
                offsetY = -(window.innerHeight - startElTop - elBottom)

                //瞬间移动到指定的位置
                el.style.transform = `translate3d(0,${offsetY}px,0)`
                const innerEl = el.children[0]
                innerEl.style.transform = `translate3d(${offsetX}px,0,0)`
                el.ball = ball
            },
            //在一开始动画就调用，指定动画结束时的状态
            Dropping(el){//el是发生动画的小球div
                //强制重排重绘
                const temp = el.clientHeight
                //异步指定
                this.$nextTick(() =>{
                    el.style.transform = `translate3d(0,0,0)`
                    const innerEl = el.children[0]
                    innerEl.style.transform = `translate3d(0,0,0)`
                })
                
            },
            //在动画结束时候调用，做一些收尾工作
            afterDrop(el){//el是发生动画的小球div
                setTimeout(() =>{
                    el.ball.isShow = false 
                },400)  
            }
        },
        components:{
            cartcontrol
        },
        computed:{
            totalCount(){
                return this.foods.reduce((preTotal,food) => {
                    return  preTotal + food.count
                    },0)
            },
            totalPrice(){
                return this.foods.reduce((preTotal,food) =>{
                    return preTotal + food.count * food.price
                    },0)
            },
            payText(){
                const {minPrice,totalPrice} = this
                if(totalPrice === 0){
                    return `还差${minPrice}起送`
                }else if(minPrice - totalPrice>0){
                    return `还差￥${minPrice-totalPrice}起送`
                }else{
                    return '去结算'
                }
            },
            listShow(){
                if(this.totalCount === 0){
                    this.isShow = false//避免添加一个自动打开
                    /*因为我们是使用计算属性控制totalCount为0时返回false
                    但是没有更改isShow的值，所以这边要重新设置isShow的值为false
                     */
                    return false
                }
                if(this.isShow){
                    this.$nextTick(() =>{
                        //每次isShow为true时会创建一个BScroll，那么我们要尽量保存
                        //BScroll为一个，所以要判断scroll存不存在，不存在CIA创建
                        //存在则不在创建
                        if(!this.scroll){
                            this.scroll = new BScroll(this.$refs.listContent,{
                                click:true
                            })
                        }else{
                            //如果存在刷新列表滚动条
                            this.scroll.refresh()
                        }
                    })
                }
                return this.isShow
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)

</style>
