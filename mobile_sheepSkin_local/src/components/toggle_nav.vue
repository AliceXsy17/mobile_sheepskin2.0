<template>
        <div class="nav_container">
            <a href="#">
                <i :class="font"></i><span v-text="text"></span>
            </a>
        </div>
</template>
<script>
export default {
    props: {
      font: {default: ""},
      text: {default: ""}
    }
    
}
</script>
<style scoped>
   .nav_container{
       height: 50px;
   }
   .nav_container a{
       text-decoration: none;
       color: #fff;
       line-height: 50px;
   }
   .nav_container a span{
       margin-left: 15px;
   }
</style>

