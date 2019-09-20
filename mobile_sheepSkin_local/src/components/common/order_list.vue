<template>
    <div  class="container">
      <div  v-for="(item,i) of order_list" :key="i">
      <div class="order_head">
        <div><span>订单号: </span>{{item.orderno}}</div>
        <div><span>下单时间: </span> {{item.otime | getDate}}</div>
      </div>
      <div class="order_info">
       <div class="pic">
           <a href="#">
            <img :src=" 'http://127.0.0.1:5050/' + item.Pimg" alt="">              
           </a>
       </div>
       <div class="desc">
           <a href="#" v-text="item.pname"></a>       
           </div>
       <div class="price" v-cloak>{{`￥${item.price}`}}</div>
       <div class="rating" @click="goRate(item.pid,item.oid,item.isComment)">{{item.isComment?"已评":"评论"}}</div> 
       </div>
       </div>
    </div>
</template>
<script>
export default {
  props: {
    order_list:{
      default() {
        return []
      }
    },
    order_info: {
      default() {
        return []
      }
    }
  },
  methods: {
    goRate(pid,oid,isComment) {
      if(!isComment) {
         this.$router.push(`/postComments?pid=${pid}&oid=${oid}`);
      } else {
         this.$router.push("/myComment");
      }
      
    }
  }
};
</script>
<style scoped>
.container>div{
  border-bottom: 1px solid #85392b;
  margin-bottom: 30px;
}
.order_head{
  display: flex;
  margin-top: 15px;
  padding: 0 10px;
  justify-content: space-between;
  font-size: 12px;
}
.order_head span {
  color: #85392b;
}
.order_info {
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
}
.pic {
  width: 50px;
  height: 50px;
}
.pic img {
  width: 100%;
}
.desc {
  margin: 10px 0 10px 2px;
  width: 210px;
}
.desc a {
  font-size: 12px;
  text-decoration: none;
  color: #555555;
}
.price {
  margin-left: 10px;
  font-size: 12px;
  color: #f00;
}
.rating {
  background: #85392b;
  width: 42px;
  height: 30px;
  margin: 15px auto;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #fff;
}
</style>
