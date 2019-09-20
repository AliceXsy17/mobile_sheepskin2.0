<template>
    <div  class="container">
      <div  v-for=" (item,i) of list" :key="i" :style="containerStyle">
        <div @click="goDetails(item.pid,item.Pimg)">
       <div class="pic" :style="picHeight">
           <a href="#">
            <img :src=" 'http://127.0.0.1:5050/'+item.Pimg" alt="">              
           </a>
       </div>
       <div class="desc" :style="descHeight">
           <a href="#" v-text="item.pname">         
           </a>       
           </div>
       </div>    
           <div class="price">
             <div v-text="`¥${item.price}`"></div>
             <button @click="addCart(item.pid,item.Pimg,item.pname,item.price)"><i class="iconfont icon-gouwuche"></i></button>
           </div>
       </div>
      <div class="cart_container" v-show="cart_hide">
        <cart-add class="cart" :pid="pid" :img_url="img_url" :pname = "pname" :price="price" @closeCart="closeCart"></cart-add>
      </div>
      </div>
</template>
<script>
import cartAdd from "./cart_add.vue";
export default {
  data() {
    return {
      pid: 1,
      img_url: "",
      pname: "",
      price: 0,
      cart_hide: false
    };
  },
  props: {
    containerStyle: {
      default() {
        return { 
          width: "120px",
          "margin-right": "25px"
          }
      }
    },
    list: {
      default() {
        return [];
      }
    },
    descHeight: {
      default() {
        return { height: "90px" };
      }
    },
    picHeight: {
      default() {
        return { height: "90px" };
      }
    }
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
    goDetails(pid,Pimg) {
      this.$router.push(`/productDetails?pid=${pid}&Pimg=${Pimg}`);
    }
  },
  components: {
    cartAdd
  }
};
</script>
<style scoped>
.container {
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
  padding: 10px 0 10px 10px;
}
.pic {
  width: 100%;
  border: 1px solid #85392b;
  padding: 3px;
}
.pic img {
  width: 100%;
  height: 100%;
}
.desc {
  margin: 10px 0;
  text-align: left;
}
.desc a {
  font-size: 14px;
  text-decoration: none;
  color: #85392b;
}
.price {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #f00;
  margin-bottom: 10px;
}
.price button {
  border: 0;
  outline: 0;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
  padding: 2px;
  background: #85392b;
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
