<template>
    <div class="head_container">
        <div class="name">羊丽羊皮草家居生活馆</div>
        <div class="more" >
        <i :class="fontCl" @click="toggle"></i>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        fontCl: {
            default: ""
        }
    },
    methods: {
        toggle() {
            this.$emit("toggleClass");
        }
    }
}
</script>
<style scoped>
   .head_container{
       display: flex;
       height: 45px;
       background: #fff;
       color: #85392b;
       text-align: center;
   }
   .head_container .name{
       width: 85%;
       text-align: center;
       line-height: 45px;
   }
  .more {
      position: fixed;
      right: 0;
      z-index: 10;
       width: 15%;
       line-height: 45px;
       text-align: center;
   }
   .icon-fenlei {
    font-size: 24px;  
   }
</style>
