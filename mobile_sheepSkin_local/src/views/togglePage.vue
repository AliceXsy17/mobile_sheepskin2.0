<template>
     <div class="container" v-show="toggleClass" @click="toggle">
        <div class="right_container">
       <toggle-nav class="list" v-for="(item,i) of list" :key="i"  :font="item.font" :text="item.text"></toggle-nav>
       </div>   
     </div>
</template>
<script>
import toggleNav from "../components/toggle_nav.vue"
export default {
  props: {
   list: {
       default: []
   },
   toggleClass: {default: false}
  }, 
  methods: {
        toggle() {
          this.$emit("toggleClass");
        }
  }, 
  components: {
      toggleNav
  }  
}
</script>
<style scoped>
  .container{
      position: absolute;
      top: -30px;
      width: 100%;
      height: 670px; 
      cursor: pointer;
      background: rgba(0,0,0,.5);
      z-index: 99;
  }
  .right_container{
      position: fixed;
      left: 0;
      top: 0;
      width: 60%;
      height: 670px;
      margin-left: 40%;
      padding: 20px 15px;
      background: #85392b;
      box-shadow: -2px 0 5px #000;
  }
  .list {
      border-bottom: 1px solid #fff;
      margin-right: 30px;
  }
  .list:last-child{
      border-bottom: 0
  }
</style>

