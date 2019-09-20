import Vue from 'vue'
import Router from 'vue-router'
//1:在router.js中引入组件
import index from './views/index.vue'
import orderWrapper from "./components/orderWrapper.vue"
import myComment from "./components/myComment.vue"
import register from "./views/register.vue"
import login from "./views/login.vue"
import myInfo from "./views/myInfo.vue"
import catagory from "./views/catagory.vue"
import search from "./views/search.vue"
import productDetails from "./views/product_details.vue"
import cart from "./components/cart.vue"
import productWrapper from "./components/productWrapper.vue"
import postComments from "./components/common/post_comments.vue"
// import reservation from "./views/reservation.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: index},
    {path: '/index',component: index},
    {path: '/orderWrapper',component: orderWrapper},
    {path: '/postComments',component: postComments},
    {path: '/myComment',component: myComment},
    {path: "/register",component: register},
    {path: "/login",component: login},
    {path: "/catagory",component: catagory},
    {path: "/search",component: search},
    {path: "/productWrapper",component: productWrapper},
    {path: "/cart",component: cart},
    {path: "/myInfo",component: myInfo},
    {path: "/productDetails",component: productDetails}
    // {path: "/reservation",component: reservation}
  ]
})
