<template>
  <div>
      <div class="title">热门搜索</div>
      <ul class="list">
        <li v-for=" (item, i) of hot_list" :key="i" v-text="item" @click="add(item)"></li>
      </ul>
  </div>
</template>
<script>
export default {
    props: {
    hot_list: {
        default() {
            return []
        }
    }
    },
    methods: {
    add(item) {
    //将点击的热门搜索项添加到搜索框中
    this.bus.$emit("add",item);
    //通知父组件禁止发起推荐词搜索
    this.$emit("noquery");
    //跳转到其他页面
    var that = this;
    setTimeout(function(){
        that.$router.push("/index");
    },500);
     }
    }
}
</script>
<style scoped>
  .title {
   width: 120px;
   margin-left: 3px;
   margin-bottom: 10px;
   font-size: 14px;
   color: var(--red);
  }
  .list{
      list-style: none;
      padding-left: 23px;
      display: flex;
      flex-wrap: wrap;
      font-size: 12px;
  }
  .list li {
      padding: 0 10px 10px 10px;
      text-align: center;
  }
</style>

