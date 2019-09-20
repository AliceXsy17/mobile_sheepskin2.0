<template>
    <div class="container">
        <!-- 头部 -->
     <fhead :fontCl="fontCl" @toggleClass="toggle"></fhead>
     <!-- 隐藏导航页 -->
     <toggle-page :list="list" @toggleClass="toggle" :toggleClass="toggleClass"></toggle-page>
     <!-- 轮播图 -->
     <!-- <carousel :img_urls="img_urls" :img_maxIndex="img_maxIndex" :ulStyle="ulStyle" v-getWidth="{changeWidth}" :containerWidth="containerWidth"></carousel> -->
  <mt-swipe :auto="4000" style="height: 250px">
  <mt-swipe-item v-for="(item, i) of img_urls" :key="i">
      <img :src="'http://127.0.0.1:5050/'+item" alt="" style="width:100%;height:100%">
  </mt-swipe-item>
  </mt-swipe>
     <div class="search" @click="goResearch">
       <i class="iconfont icon-sousuo"></i>  
      <input placeholder="请输入搜索内容" />
     </div>
     <index-nav :list="list"></index-nav>
     <div class="separate"></div>
     <theme-name class="theme" :theme="theme1"></theme-name>
     <product :list="hot" :containerStyle="containerStyle1" :descHeight="hot_descHeight" :picHeight="hot_picHeight"></product>
     <theme-name class="theme" :theme="theme2"></theme-name> 
     <product :list="recomend" :containerStyle="containerStyle2" :descHeight="recomend_descHeight" :picHeight="recomend_picHeight"></product>
    </div>
</template>
<script>
import togglePage from "./togglePage.vue"
import fhead from "./header.vue"
import carousel from "../components/common/Carousel.vue"
import themeName from "../components/theme_name.vue"
import indexNav from "../components/index_nav.vue"
import product from "../components/common/product.vue"

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
          list:[
              {font: "iconfont icon-shouye",text: "网站首页"},
              {font: "iconfont icon-chuangdianx-",text: "羊毛垫子"},
              {font: "iconfont icon-tuoxie",text: "羊毛拖鞋"},
              {font: "iconfont icon-wanou",text: "羊毛公仔"},
              {font: "iconfont icon-baozhen",text: "羊毛抱枕"}
          ],
          toggleClass: false,
          fontCl: "iconfont icon-fenlei",
          img_urls: [],
          hot: [],
          recomend: [],
          img_maxIndex: 0,
          containerStyle1: {
              width: "101px",
              "margin-right": "20px"
          },
          hot_descHeight: {
             height: "99px"
          },
          recomend_descHeight: {
             height: "60px"
          },
          hot_picHeight: {
            height: "101px"
          },
          recomend_picHeight: {
            height: "145px"
          },
          containerStyle2: {
              width: "160px",
              "margin-right": "22px"
          },          
          ulStyle:{
              "margin-left": 0,
               width: 0,
               height: "200px"
          },
          containerWidth: {
              width: 0
          },
          theme1: "时下热销",
          theme2: "热门推荐"
        }
    },
    watch: {
          img_urls() {
              //计算最后一张图在数组中的索引值
              var img_length = this.img_urls.length;
             this.img_maxIndex = img_length-1;
             var width=parseInt(this.containerWidth);
             this.ulStyle.width = `${img_length*width}px`;   
        },
    },
    components: {
        togglePage,fhead,carousel,indexNav,themeName,product
    },
    methods: {
        toggle() {
          this.toggleClass = !this.toggleClass;
        },
        _getData(url,obj) {
         return this.axios.get(url,{params: obj});
        },
        async loadData() {
         var result = await Promise.all([this._getData("/index",{cid:1}), this._getData("/product",{isHot: 1, isRecomend: 0}), this._getData("/product",{isHot: 0, isRecomend: 1}) ]);
         for(var item of result[0].data.data.carousel) {
          this.img_urls.push(item.img_url);
         }
         this.hot = this.hot.concat(result[1].data.data.hot);
         this.recomend = this.recomend.concat(result[2].data.data.recomend);
        },
        changeWidth(x) {
         this.containerWidth.width = x;
         this.ulStyle.width = parseInt(x)*5+"px";
        },
        goResearch() {
            this.$router.push("/search");
        }
        
    },
    created() {
     this.loadData();
    }
    
}
</script>
<style scoped>
.container {
    padding-bottom: 40px;
}
.container::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
   }
.search{
    position: relative;
}
.search input{
      width: 90%;
      height: 40px;
      margin: 15px 10px;
      padding: 0 10px;
      background: #85392b;
      text-align: center;
      line-height: 40px;
      border: 0;
      outline: 0;
      font-size: 14px;
      color: #fff;
  }
.search i{
    position: absolute;
    left: 119px;
    top: 24px;
}
.separate{
    width: 98%;
    height: 10px;
    margin: 15px auto;
    background: #f5f5f5;
}
.theme{
    margin-left: 10px;
}
.icon-sousuo {
    color: #fff;
}
</style>
