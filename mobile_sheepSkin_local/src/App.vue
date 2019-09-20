<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
        <mt-tabbar v-model="active" fixed>
        <mt-tab-item id="首页" @click.native="changeState(0)">
          <tabbaricon
            :selectedImage="require('./assets/icon/home_active.png') "
            :normalImage="require('./assets/icon/home.png')"
            :focused="currentIndex[0].isSelect"
          ></tabbaricon>首页
        </mt-tab-item>
        <mt-tab-item id="分类" @click.native="changeState(1)">
          <tabbaricon
            :selectedImage="require('./assets/icon/catagory_active.png') "
            :normalImage="require('./assets/icon/catagory.png')"
            :focused="currentIndex[1].isSelect"
          ></tabbaricon>分类
        </mt-tab-item>
        <mt-tab-item id="购物车" @click.native="changeState(2)">
          <tabbaricon
            :selectedImage="require('./assets/icon/cart_active.png') "
            :normalImage="require('./assets/icon/cart.png')"
            :focused="currentIndex[2].isSelect"
          ></tabbaricon>购物车
          <!-- <div class="count_show" v-show="$store.getters.getStorage>0">{{$store.getters.getStorage}}</div> -->
        </mt-tab-item>
        <mt-tab-item id="我的" @click.native="changeState(3)">
          <tabbaricon
            :selectedImage="require('./assets/icon/me_active.png') "
            :normalImage="require('./assets/icon/me.png')"
            :focused="currentIndex[3].isSelect"
          ></tabbaricon>我的
        </mt-tab-item>
      </mt-tabbar>
  </div>
</template>
<script>
import TabBarIcon from "./components/common/TabBarIcon.vue"
export default {
  provide() { //注册一个全局方法
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      active: "首页",
        currentIndex: [
        { isSelect: true },
        { isSelect: false },
        { isSelect: false },
        { isSelect: false }
      ],
      isRouterAlive: true
    }
  },
  components: {
    tabbaricon: TabBarIcon
  },
  methods: {
    reload() { //刷新页面
     this.isRouterAlive = false;
     this.$nextTick( () => {
       this.isRouterAlive = true;
     });
    },
    changeState(n) {
      //函数功能:将当前参数下标
      //对应数组值修改true其它修改false
      //1:创建循环,循环数组中内容
      for (var i of this.currentIndex) {
        i.isSelect = false;
      }
      this.currentIndex[n].isSelect = true;
      if(n===0) {
        this.$router.push("/index");
      }
       if(n===1) {
        this.$router.push("/catagory");
      }     
      if(n===2) {
        this.$router.push("/cart");
      }            
      if(n===3) {
        this.$router.push("/orderWrapper");
      }
      
    }   
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
  .count_show{
    position: fixed;
    bottom:35px;
    right: 91px;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: red;
    z-index: 99;
    font-size: 12px;
    color: #fff;
    text-align: center;
    line-height: 20px;
}
</style>
