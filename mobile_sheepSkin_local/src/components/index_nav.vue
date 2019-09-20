<template>
  <div class="container">
    <div v-for="(item,i) of nlist" :key="i">
        <div class="pic" :class="'pic'+i">
            <a href="#">
              <i :class="item.font"></i>
            </a>
        </div>
        <div class="text">
            <a href="#" v-text="item.text"></a>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        list: {default: []}
    },
    computed: {
        nlist(){
        this.list.shift();
         return this.list;
        } 
    }
}
</script>
<style scoped>
  .container{
      display: flex;
      padding: 0 15px;
      justify-content: space-between;
  }
  .pic{
      width: 50px;
      height: 50px;
      border-radius: 100%;
      line-height: 50px;
      text-align: center;
  }
  .pic0 {
    background: #e75881;
  }
  .pic1 {
      background: #5ac597;
  }
  .pic2 {
      background: #77c1e0;
  }
  .pic3 {
      background: #f37d71;
  }
  .iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  color: #fff;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.text{
  margin-top: 10px;
}
.text a{
    font-size: 14px;
    color: #85392b;
}
a{
    text-decoration: none;
}
</style>
