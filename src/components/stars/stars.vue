<template>
    <div class="stars" :class="`stars-${size}`">
        <span class="star" v-for="(sc,index) in starClass" :key="index" :class="sc"></span>
    </div>
</template>
<script>
    const CLASS_ON = 'on'
    const CLASS_HALF = 'half'
    const CLASS_OFF = 'off'
    export  default {
        props:{
            score:Number,
            size:Number
        },
        computed: {
            starClass(){
                const scs = []
                const score = this.score
                const scoreInterger = Math.floor(score)
                for(let i=0;i<scoreInterger;i++){
                    scs.push(CLASS_ON)
                }
                if(score - scoreInterger >=0.5){
                    scs.push(CLASS_HALF)
                }
                // while(scs.length<5){
                //     scs.push(CLASS_OFF)
                // }
                for(let i = 0;i<(5 - scs.length);i++){
                    scs.push(CLASS_OFF)
                }
                return scs
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">

@import '../../common/stylus/mixin.styl'

.stars
    text-align center
    .star
        display inline-block
        background-repeat no-repeat
        background-size 100%  100%
    &.stars-48
      .star
        width 20px
        height 19px
        &.on
          bg-image("../stars/star48_on")
        &.half
          bg-image("../stars/star48_half")
        &.off
          bg-image("../stars/star48_off")
</style>
