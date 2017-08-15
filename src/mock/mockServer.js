/*
    使用mock.js实现模拟接口的模块
*/
import Mock from 'mockjs'
import data from './data.json'

//映射路由
Mock.mock('/api2/goods',{
    code:0,
    data:data.goods
})
Mock.mock('/api2/ratings',{
    code:0,
    data:data.ratings
})
Mock.mock('/api2/seller',{
    code:0,
    data:data.seller
})
//不需要export暴露，只要执行就可以使用接口,但是要保证它执行过一次，所以
//需要在入口文件中引入--->main.js
