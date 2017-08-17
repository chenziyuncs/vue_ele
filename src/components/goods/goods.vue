<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li @click="clickMenuItem(index,event)" class="menu-item" v-for="(good,index) in goods" :key="index" :class="{current:currentIndex===index}">
                        <span class="text border-1px">
                            <span class="icon" v-if="good.type>=0" :class="supportClases[good.type]"></span>{{good.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodsWrapper">
                <ul>
                  <li class="food-list food-list-hook" v-for="(good,index) in goods" :key="index">
                    <h1 class="title">{{good.name}}</h1>
                    <ul>
                      <li class="food-item border-1px" v-for="(food,index) in good.foods" :key="index">
                        <div class="icon">
                          <img width="57" height="57" :src="food.icon" />
                        </div>
                        <div class="content">
                          <h2 class="name">{{food.name}}</h2>
                          <p class="desc">{{food.description}}</p>
                          <div class="extra">
                            <span class="count">月售{{food.sellCount }}</span>
                            <span>好评率{{food.rating}}%</span>
                          </div>
                          <div class="price">
                            <span class="now">￥{{food.price}}</span>
                            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                          </div>
                          <div class="cartcontrol-wrapper">
                            <cartcontrol :food="food" :update-food-count="updateFoodCount" ></cartcontrol>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
            </div>
        </div>
        <div class="food"></div>
    </div></template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
    export default {
        data(){
            return {
                goods:[],
                supportClases:['decrease','discount','guarantee','invoice','special'],
                tops:[],
                scrollY:0
            }
        },
        created(){
            axios.get('/api2/goods')
                .then(response =>{
                    const result = response.data
                    if(result.code === 0){
                        this.goods = result.data
                        //使用better-scroll库，调用方法
                        //将回调函数延迟到下次DOM更新循环之后执行
                        this.$nextTick(() => {
                          //初始化scroll
                          this.initScroll()
                          //收集所有li的top值
                          this.initTops()
                        })
                        // setTimeout(() => {
                        //   this.initScroll()
                        // },30)
                        
                    }
                })
        },
        methods:{
          initScroll(){
            /*创建左侧的菜单列表Scroll,获取需要滑动的DOM对象
              这边需要注意的是better-scroll只处理容器第一个子元素的滚动其他
              元素会被忽略
            */
            new BScroll(this.$refs.menuWrapper,{
              click:true
            })
            //创建右侧的食物列表Scroll
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
              probeType:3,//接收scroll事件
              click:true
            })
            //监视scroll
            this.foodsScroll.on('scroll',(pos) => {
              //console.log(pos.y)
              this.scrollY = Math.abs(pos.y)//滑动过程中自动收集scrollY
            })
          },
          initTops(){
            const tops = []
            let top = 0
            tops.push(top)//第一个li的top值
            //找到所有li，lis是得到的是伪数组
            const lis = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
            ;[].slice.call(lis).forEach(li => {
              //获取每个li的高度
              top +=li.clientHeight
              tops.push(top)
            })
            this.tops = tops
          },
          clickMenuItem(index,event){
            if(event._construted){//过滤原生事件的回调
              return
            }
            //console.log(index)
            //得到对应的li
            const li = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')[index]
            //通过右侧来平滑滚动到li出
            this.foodsScroll.scrollToElement(li,300)
          },
          updateFoodCount(food,isAdd){
            if(isAdd){
              //判断用户是否第一次加，因为第一次加count没有数据
              //food.count = 1给food对象新增属性，没有数据绑定，界面不会更新
              //所以要用vue.set或者实例对象vue.$set区别在于前面一种要引入vue
              !food.count?this.$set(food,"count",1):food.count++
             
            }else{
              !food.count?this.$set(food,"count",0):food.count--
            }
          }
        },
        computed: {
          currentIndex(){
            const {tops,scrollY} = this
            //scrollY的值等于或者到大于当前下表的值，且小于下一个值
            return tops.findIndex((top,index) =>{//返回第一个回调函数的结果为true的index的值
              return scrollY>=top && scrollY<tops[index+1]
            })
          }
        },
        components:{
          cartcontrol
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
