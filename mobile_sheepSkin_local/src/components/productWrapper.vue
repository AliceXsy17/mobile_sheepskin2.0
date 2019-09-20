<template>
    <div>
     <product :list="recomend" :containerStyle="containerStyle"></product>
    </div>
</template>
<script>
import product from "./common/product.vue"

export default {
    data() {
        return {
          recomend: [],
          containerStyle: {
              width: "101px"
          }        
        }
    },
    components: {
        product
    },
    methods: {
         loadData(){
            this.axios("/product",{params: {isHot:0, isRecomend: 1}}).then( (result) => {
             var hot = result.data.data.hot;
             var recomend = result.data.data.recomend;
              if(result.data.code === 1) {
               this.recomend = this.recomend.concat(recomend);
              }
         });
         }
        
    },
    created() {
     this.loadData();
    }
    
}
</script>
<style scoped>
/* .search{
    position: relative;
}
.search input{
      width: 90%;
      height: 40px;
      margin: 15px 10px;
      padding: 0 10px;
      background: #ededed;
      text-align: center;
      line-height: 40px;
      border: 0;
      outline: 0;
      font-size: 14px;
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
} */
</style>
