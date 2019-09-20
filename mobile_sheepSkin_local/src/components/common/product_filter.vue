<template>
    <div class="filter_container">
            <div class="content" v-for="(item,i) of list" :key="i" v-cloak @click="upOrdown">
              <div class="left">按价格高低筛选</div>
              <div class="right">
              <div class="title">{{item}}</div>
              <div>
              <div class="up">
                  <i class="iconfont icon-arrow-up01" :class="{'active': up}"></i>
              </div>             
              <div class="down">
                  <i class="iconfont icon-triangle-copy-copy-copy"  :class="{'active': !up}" ></i>  
              </div>
              </div>
              </div>   
              </div>
    </div>
</template>
<script>
export default {
  data() {
      return {
          search_kw: "",
          up: true,
      }
  },
  props: {
      list: {
          default() {
              return []
          }
      }
  },
  created() {
    this.bus.$on("hasInput",this.getKW.bind(this));
  },
  methods: {
      getKW(kw) {
        this.search_kw = kw;
      },
      getOrder_search(isUp) {
        this.axios.get("/product/sort", {params: {kw:this.search_kw, sortCondition: "price"}}).then( result => {
         if(result.data.code === 1) {
             var search_list;
             if(isUp) {
               search_list = result.data.data;
             } else {
               search_list = result.data.data.reverse();
             }             
             //通知父组件search修改展示的搜索结果列表并隐藏查看更多按钮，因为排序所属的是所有选项，没有分页展示
             this.$emit("orderShow",search_list);
         }
        })
      },
      upOrdown() {
      //如果升序为真
      if(this.up) {
       this.getOrder_search(true);
       //将升序设为false
       this.up = false;
      } else {
          //降序
        this.getOrder_search(false);
        this.up = true;
      }
      }
  }  
}
</script>
<style scoped> 
.filter_container{
    padding: 10px 15px;
    color: #85392b;
}
.content {
    width:180px;
    font-size: 14px;
}
.content .left{
    margin-right: 10px;
}
.content .right{
    display: flex;
    align-items: center;
    padding: 1px 5px;
    background: #85392b;
    color: #fff;
}
.container, .content {
    display: flex;
    align-items: center;
}
.up{
    margin-bottom: 37px;
}
.down {
    margin-top: -50px;
} 
.active {
    color: red;
}
</style>

