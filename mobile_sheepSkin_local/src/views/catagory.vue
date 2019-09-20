<template>
   <div class="catagory_container">
       <!-- <carousel :img_urls="img_urls" :img_maxIndex="img_maxIndex" :ulStyle="ulStyle" v-getWidth="{changeWidth}" :containerWidth="containerWidth"></carousel> -->
      <mt-swipe :auto="4000" style="position: fixed; top: 0; left: 0; z-index: 99; width: 100%; height: 250px">
       <mt-swipe-item v-for="(item, i) of img_urls" :key="i">
      <img :src="'http://127.0.0.1:5050/'+item" alt="" style="width:100%;height:100%">
     </mt-swipe-item>
    </mt-swipe>
       <div class="content">
         <div ref="catagoryList">
         <ul class="catagory_list">
           <li v-for="(item,i) of product" :key="i" @mouseenter="change_bg(i)"  @mouseout="recover_bg(i)" :class="{'active_catagory': isChosen[i]}" @click="selectMenu(i, $event)" v-cloak>{{item.cname}}</li>
         </ul>
         </div>
         <div ref="productList">
         <ul class="product_list">
             <li class="product-list-hook" v-for="(item,i) of product" :key="i" v-cloak>
                 <div class="product_cname">
                    <div class="line"></div>
                    <div class="cname">{{item.cname}}</div>
                    <div class="line"></div>
                 </div>
                 <ul class="kinds_list">
                 <li v-for="(item,i) of item.list" :key="i" @click="selectProduct($event, item)">
                 <i class="iconfont icon-gouwuche" @click="addCart(item.pid,item.Pimg,item.pname,item.price)"></i>        
                <div class="right" @click=goDetail(item.pid,item.Pimg)>
                 <div class="pimg">
                    <img :src="'http://127.0.0.1:5050/'+item.Pimg" alt="">
                 </div>
                 <div class="product_info">
                 <div v-text="item.pname"></div>
                 <div class="price" v-text="`¥${item.price}`"></div>
                 </div>
                 </div>
                    </li>
                 </ul>            
                  </li>
         </ul>
         </div>
       </div>
        <div class="cart_container" v-show="cart_hide">
        <cart-add class="cart" :pid="pid" :img_url="img_url" :pname = "pname" :price="price" @closeCart="closeCart"></cart-add>
      </div>
   </div>
</template>
<script>
import BScroll from 'better-scroll'
import carousel from "../components/common/Carousel.vue";
import cartAdd from "../components/common/cart_add.vue";
export default {
  directives: {
    getWidth: {
      inserted(elem, binding) {
        var width = window.getComputedStyle(elem).width;
        binding.value.changeWidth(width);
      }
    }
  },
  data() {
    return {
      img_urls: [],
      img_maxIndex: 0,
      ulStyle: {
        "margin-left": 0,
        width: 0,
        height: "200px"
      },
      containerWidth: {
        width: 0
      },
      // catagory_list: [],
      // product_list: [],
      product: [],
      isChosen: [true],
      pid: 1,
      img_url: "",
      pname: "",
      price: 0,
      cart_hide: false,
      listHeight: [],
      scrollY: 0,
      selectedProduct: {}
    };
  },
  watch: {
    img_urls() {
      //计算最后一张图在数组中的索引值
      var img_length = this.img_urls.length;
      this.img_maxIndex = img_length - 1;
      var width = parseInt(this.containerWidth);
      this.ulStyle.width = `${img_length * width}px`;
    }
  },
  components: {
    carousel,cartAdd
  },
  mounted() {
   this._getData("/catagory").then(res =>{
     this.product = this.product.concat(res.data.data)
            this.$nextTick(() => {
            // 调用_initScroll方法实现滚动效果
            this._initScroll()
            // 左边列表与右边的foods联动效果
            this._calculateHeight()
          })
   })
    },
  methods: {
      _initScroll() {
        // 列表导航滚动
        this.catagoryScroll = new BScroll(this.$refs.catagoryList, {
          click: true // 因为better-scroll默认指向了监听，要在元素上使用click事件需传这个属性
        })
        // 商品列表滚动
        this.productScroll = new BScroll(this.$refs.productList, {
          click: true,
          probeType: 3 // 传这个属性相当于探针，实时监视滚动的位置
        })
        // 通过这个对象去监听scroll事件
        this.productScroll.on('scroll', (pos) => {
          // 接收滚动的距离
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      // 计算每个区间的高度
      _calculateHeight() {
        let productList = this.$refs.productList.getElementsByClassName('product-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0, len = productList.length; i < len; i++) {
          let item = productList[i]
          // 得到每个li区间的高度
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
       // 点击左边的导航，右边的food列表同时切换到对应的列表栏
      selectMenu(index, event) {
        //遍历将所有的点击样式去掉
        for(var i=0; i<this.isChosen.length; i++) {
         this.isChosen.splice(i,1,false);
        }
        //给正在点击的对象添加点击样式
        this.isChosen.splice(index,1,true);
        let productList = this.$refs.productList.getElementsByClassName('product-list-hook')
        let el = productList[index]
        this.productScroll.scrollToElement(el, 300)
        console.log(this.productScroll);
      },
     closeCart() {
      this.cart_hide = false;
    },
     addCart(pid, Pimg, pname, price) {
      this.pid = pid;
      this.img_url = Pimg;
      this.pname = pname;
      this.price = price;
      this.cart_hide = true;
    },  
    goDetail(pid,Pimg) {
      this.$router.push(`/productDetails?pid=${pid}&Pimg=${Pimg}`);
    },
    change_bg(i) {
      this.isChosen.splice(i, 1, true);
    },
    recover_bg(i) {
      this.isChosen.splice(i, 1, false);
    },
    _getData(url, obj) {
      return this.axios.get(url, { params: obj });
    },
    async loadData() {
      var result = await Promise.all([
        this._getData("/index", { cid: 1 })
        // this._getData("/catagory")
      ]);
      for (var item of result[0].data.data.carousel) {
        this.img_urls.push(item.img_url);
      }
      // for (var p of result[1].data.data) {
        // this.catagory_list = this.catagory_list.concat(p.cname);
        // this.product_list = this.product_list.concat(p);
      // }
      // this.product = this.product.concat(result[1].data.data)
    },
    changeWidth(x) {
      this.containerWidth.width = x;
      this.ulStyle.width = parseInt(x) * 5 + "px";
    }
  },
  created() {
    this.loadData();
  }
};
</script>
<style scoped>
.catagory_container {
  padding-bottom: 70px;
}
.catagory_container .right {
  display: flex;
  font-size: 12px;
  color: #85392b;
  margin-bottom: 15px;
  padding: 10px 0;
  margin-right: 36px;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.catagory_container .content {
  display: flex;
}
.content {
  margin-top: 280px;
}
.catagory_list {
  background: #85392b;
}
.catagory_list li {
  width: 80px;
  padding: 20px 5px;
  color: #fff;
  border-bottom: 1px solid #fff;
}
.kinds_list>li {
    position: relative;
    border-bottom: 1px solid #85392b;
}
.kinds_list>li:last-child {
  border-bottom: 0;
  margin-bottom: 80px;
}
.cname {
  color: #85392b;
  padding: 0 15px;
  margin-top: -6px;
}
.active_catagory {
  background: #fff !important;
  color: #85392b !important;
  border-left: 3px solid #85392b;
}
.pimg {
  width: 140px;
  margin-right: 10px;
}
.pimg img {
  width: 100%;
}
.price {
  margin-top: 10px;
  color: red;
}
.product_info {
  text-align: left;
  margin-top: 10px;
}
.product_cname {
  display: flex;
  align-items: flex-start;
}
.line {
  border-bottom: 4px solid #85392b;
  width: 33%;
}
.icon-gouwuche {
    position: absolute;
    right: 8px;
    bottom: 25px;
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
.product_list {
  margin-left: 97px;
}
.catagory_list{
  position: fixed;
}
</style>
