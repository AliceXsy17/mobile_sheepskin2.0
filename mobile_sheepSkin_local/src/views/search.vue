<template>
    <div class="container">
        <search-box @getSearch="getSearch" @noSearch="noSearch" ref="searchBox"></search-box>
        <div v-show="hasProduct">
        <div class="search_sort">      
        <product-filter :list="filer_content" @orderShow="orderShow"></product-filter>
        </div>
        <product :list="search_list" :containerStyle="containerStyle"></product>
          
        <div class="btn-seeMore">
        <button v-show="hasMore" class="more" @click="seeMore">查看更多</button>
        <button v-show="noMore" class="more" @click="goCatagory">没 有 更 多 了, 到 别 处 逛 逛 ？</button>
        </div>            
        </div>
        <div class="notFound" v-show="noProduct">
            <div>
                <img src="../assets/imgs/notFound.png" alt="">
            </div>
            <div>很抱歉，搜索到“<span class="count">0</span>”个宝贝</div>
        </div>
    </div>
</template>
<script>
import searchBox from "../components/search_box.vue"
import product from "../components/common/product.vue"
import productFilter from "../components/common/product_filter.vue"
export default {
 data() {
     return {
         filer_content: ["价格"],
         search_list: [],
         containerStyle: {
            width: "101px",
            "margin-right": "20px"
          },
          noProduct: false,
          hasProduct: false,
          hasMore: false,
          noMore: false

     }
 },
 methods: {
    goCatagory() {
    //跳转到分类页面
    this.$router.push("/catagory");
    },
    getSearch(data,isSearch) {
    //传过来的搜索数据
    var list = data[0].data
    //如果传过来的数据为空数组，说明没有下一页了，隐藏查看更多按钮
    if(list.length===0) {
     this.hasMore = false;
     this.noMore = true;
     return;
    } else {
     this.hasMore = true;
     this.noMore = false;        
    }
    this.hasProduct = true;
    if(data[0].pCount>1){
        this.hasMore = true;
    } else {
        this.hasMore = false;
        this.noMore = true;
    }
     this.noProduct = false;   
     //如果搜索是真，先清空之前的search_list，如果是查看更多则无需清除
     if(isSearch) {
      this.search_list = []; 
     }          
     this.search_list = this.search_list.concat(list);
    },
    noSearch() {
        this.search_list = [];
        this.noProduct = true;
        this.hasProduct = false;
    },
    seeMore() {
    //父组件操作子组件的数据
     this.$refs.searchBox.pno +=1;
     this.$refs.searchBox.search_product(false);
    },
    orderShow(data) {
        //清空search_list后重新赋值
        this.search_list = []; 
        this.search_list = this.search_list.concat(data);
        this.hasMore = false;
        this.noMore = true;
    }  
 },
 components: {
     searchBox,product,productFilter
 } 
}
</script>
<style scoped>
.container {
    padding-bottom: 90px;
}
.search_sort {
    margin-left: 193px;
}
.count {
    color: red;
}
.notFound {
    display: flex;
    justify-content: center;
    align-items: center;
}
.more {
    border: 0;
    outline: 0;
    background: #85392b;
    color: #fff;
    font-size: 12px;
    padding: 15px 30px;
}
.btn-seeMore {
    margin-top: -60px;
}
</style>
