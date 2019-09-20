<template>
    <div v-show="cart_show">
      <div class="top">
          <div class="pic">
              <img :src="'http://127.0.0.1:5050/'+img_url" alt="">
          </div>
          <div class="desc">
              <div class="pname" v-text="pname"></div>
              <div class="price" v-text="`¥${price}`"></div>
          </div>
          <div @click="closeCart"><i class="iconfont icon-guanbi"></i></div>
      </div>
      <div class="middle">
          <div>共<span class="total" v-text="`¥${total}`"></span></div>
          <div>
              <a href="#" @click="minus()">-</a>
              <input type="text" v-model="count" placeholder="1">
              <a href="#" @click="add()">+</a>
          </div>
      </div>
      <div class="bottom">
          <div>
              <button @click="addCart">加入购物车</button>
              <button>立即购买</button>
          </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    pid: {default: 0},
    img_url: {default: ""},
    pname: {default: ""},
    price: {default: 0}
  },
   data() {
       return {
        count: 1,
        cart_show: true
       }
   },
   computed: {
    total() {
        return (this.count*this.price).toFixed(2);
    }
   },
   methods: {
       add() {
          this.count++;
       },
       minus() {
        if(this.count===1) {
          return;
        }
        this.count--;
       },
       addCart() {
           this.$store.commit("increment",this.count);
           //加入购物车的时候购物车商品数量有变，通知vuex存入localStorage
            this.$store.commit("setStorage",this.count);
           //将商品提交购物车
           this.axios.post("/cart/addCart", {
             pid: this.pid,
             Pimg: this.img_url,
             pname: this.pname,
             price: this.price,
             count: this.count
           }).then( result => {
               if (result.data.code === 1) {
                this.$toast(result.data.msg);
               }
               if(result.data.code === -1) {
                this.$toast(result.data.msg);
                this.$router.push("/login");
               }
           });
       },
       closeCart() {
           this.$emit("closeCart");
       }
   },
  //watch进行监听

watch:{
  pid: function(newValue) {
   this.pid = newValue;
  },
  img_url:function(newValue){
    this.img_url = newValue;
  },
  pname:function(newValue){
    this.pname = newValue;
  },  
  price:function(newValue){
    this.price = newValue;
  }  
}      
}
</script>
<style scoped>
.container{
    width: 375px;
}
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    font-size: 16px;
}
.top>.pic{
    border: 1px solid #ccc;
}
.top img{
    width: 80px;
}
.top .price{
    color: red;
}
.top .desc{
    width: 53%;
    text-align: left;
}
.top .desc .pname{
    margin-bottom: 10px;
}
.middle{
    display: flex;
    justify-content:space-between;
    padding:10px;
}
.middle a{
    text-decoration: none;
    padding: 5px 8px;
    border: 1px solid #ccc;
}
.middle a:first-child{
    border-right: 0;
}
.middle a:last-child{
    border-left: 0;
}
.middle input{
    width: 50px;
    height: 29px;
    box-sizing: border-box;
    padding-left: 19px;
}
.bottom {
    display: flex;
    padding-top: 10px;
    justify-content: flex-end;
}
.bottom>div {
    width: 57%;
}
.bottom button{
    padding: 10px;
    background: #85392b;
    color: #fff;
    outline: 0;
    border: 0;
}
.bottom button:first-child{
    margin-right: 10px;
}
.price, .total {
    color: red;
}
.total {
    margin-left: 5px;
}
</style>
