<template>
    <div class="container">
        <!-- <carousel :img_urls="carousel_img" :img_maxIndex="img_maxIndex" :ulStyle="ulStyle" v-getWidth="{changeWidth}" :containerWidth="containerWidth"></carousel> -->
        <mt-swipe :auto="4000" style="height: 250px">
       <mt-swipe-item v-for="(item, i) of carousel_img" :key="i">
      <img :src="'http://127.0.0.1:5050/'+item" alt="" style="width:100%;height:100%">
     </mt-swipe-item>
    </mt-swipe>
        <div class="pname" v-cloak>{{pname}}</div>
        <div class="price_container">
        <div class="price" v-cloak>{{`￥${price}`}}</div>
        <button @click="addCart(pid,Pimg,pname,price)">加入购物车</button>
        </div>
        <div class="details_header">
            <div :class="{'active':show_details}" @click="handelShow_details">商品详情</div>
            <div :class="{'active':!show_details}" @click="handelShow_comments">累计评价({{comments_list.length}})</div>
        </div>
     <ul v-show="show_details" class="details_img">
         <li v-for="(item,i) of details_img" :key="i">
             <img :src=" 'http://127.0.0.1:5050/'+ item" alt="">
         </li>
     </ul>
     <div v-show="!show_details">
     <div v-if="comments_list.length>0" class="comment_filter">
          <comments-filter :content="content"></comments-filter>
    </div>
     <comment-list :comments_list = "comments_list"></comment-list>
     </div>
      <div class="cart_container" v-show="cart_hide">
        <cart-add class="cart" :pid="pid" :img_url="img_url" :pname = "pname" :price="price" @closeCart="closeCart"></cart-add>
      </div>     
    </div>
</template>
<script>
import carousel from "../components/common/Carousel.vue"
import commentList from "../components/common/comment_content.vue"
import commentsFilter from "../components/common/comments_filter.vue"
import cartAdd from "../components/common/cart_add.vue";
export default {
    directives: {
     getWidth: {
         inserted(elem,binding) {
            var width = window.getComputedStyle(elem).width;
            binding.value.changeWidth(width);
         }
     }
    },    
    data() {
        return {
          carousel_img: [],
          details_img: [],
          pid: 0,
          pname: "",
          Pimg: '',
          img_maxIndex: 0,
          price: 0,
           ulStyle:{
              "margin-left": 0,
               width: 0,
               height: "280px"
          },
          containerWidth: {
              width: 0
          },
          comments_list: [],
          content: [{content:"全部"}, {content:"晒图评价"}, {content:"低分评价"}],
          show_details: true,
          pid: 1,
          img_url: "",
          pname: "",
          price: 0,
          cart_hide: false
        }
    },
    created() {
        this.loadData();
    },
    watch: {
          carousel_img() {
              //计算最后一张图在数组中的索引值
              var img_length = this.carousel_img.length;
             this.img_maxIndex = img_length-1;
             var width=parseInt(this.containerWidth);
             this.ulStyle.width = `${img_length*width}px`;   
        },
    },
    components: {
        carousel, commentList, commentsFilter,cartAdd
    },
    methods: {
      addCart(pid, Pimg, pname, price) {
      this.pid = pid;
      this.img_url = Pimg;
      this.pname = pname;
      this.price = price;
      this.cart_hide = true;
      },
      closeCart() {
      this.cart_hide = false;
      },
        changeWidth(x) {
         this.containerWidth.width = x;
         this.ulStyle.width = parseInt(x)*6+"px";
        },
        _getData(url,obj) {
            return this.axios.get(url,{params: obj});
        },
        async loadData() {
          var pid = this.$route.query.pid;
          this.Pimg = this.$route.query.Pimg; 
          this.pid = pid;
          var result = await Promise.all([this._getData("/product/details",{pid:pid}),this._getData("/comments",{pid: pid})]);
              if(result[0].data.code===1) {
               var details = result[0].data.data[0];
               this.carousel_img = this.carousel_img.concat(details["carousel_img"].split(","));
               this.details_img = this.details_img.concat(details["details_img"].split(","));
               this.pname = details.pname;
               this.price = details.price;
              }
              if(result[1].data.code===1) {
                this.comments_list = this.comments_list.concat(result[1].data.data);
                this.content[0].length = this.comments_list.length;
                //遍历列表，找出有图片的评论条数
                for(var i=0,j=0,z=0; i<this.comments_list.length; i++) {
                  if(this.comments_list[i].hasImg == 1) {
                      j++;                    
                  }
                  //找出低分的评论条数
                  if(this.comments_list[i].isLowscore == 1) {
                     z++;
                  }
                }
                this.content[1].length = j;
                this.content[2].length = z;
              }

        },
        handelShow_details() {
            this.show_details = true;
        },
        handelShow_comments() {
            this.show_details = false;
        }
    }
}
</script>
<style scoped>
.container{
    padding-bottom: 50px;
}
.pname {
    text-align: left;
    margin-top: 10px;
    font-size: 14px;
    color: #85392b;
    padding: 0 10px;
}
.price {
    padding: 20px 10px;
    font-size: 18px;
    color: #f00;
    text-align: left;
}
.details_header {
    display: flex;
    padding: 0 10px;
    font-size: 14px;
    margin-bottom: 20px;
}
.details_header>div:first-child {
    margin-right: 20px;
}
ul{
    margin: 0;
    padding: 0;
}
ul li{
    list-style: none;
}
.details_img img{
    width: 100%;
}
.details_header>div{
  padding: 5px;
}
.active{
    color: #85392b;
    border-bottom: 1px solid #85392b;
}
.comment_filter {
    margin-bottom: 40px;
    padding: 0 20px;
}
.price_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 0;
}
.price_container button{
    height: 33px;
    border-radius: 5px;
    padding: 5px 10px !important;
    background: #85392b;
    color: #fff;
    outline: 0;
    border: 0;
}
.cart_container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 667px;
  background: rgba(0, 0, 0, 0.5);
}
.cart {
  position: fixed;
  left: 0;
  bottom: 58px;
  width: 100%;
  background: #fff;
}
</style>


var obj = {
 a: 1,
 b: {c:1}
}
var cloneObj = {};
function clone() {
for (var i of obj) {
 
}
}


function fun(n,o){
console.log(o);
return {
 fun:function(m){
   return fun(m,n)
 }
}
}
var a= fun(0);
a.fun(1);
a.fun(2);
a.fun(3);
var b=fun(0);
.fun(1);
.fun(2);
.fun(3);
var c=fun(0).fun(1);
c.fun(2);
c.fun(3);
