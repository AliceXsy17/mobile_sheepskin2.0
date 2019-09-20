<template>
     <div class="carousel">
        <ul class="carousel-inner" :style="ulStyle" :class="{'transition':isAnimate}">
            <li v-for="(item,i) of img_urls" :key="i" :style="containerWidth">
                <a href="#">
                    <img :src="'http://127.0.0.1:5050/'+item" alt="">
                </a>
            </li>
        </ul>
        <ul class="indicator">
           <li v-for="(item,i) of img_maxIndex" :key="i" :class="{'active':i==index}"></li> 
        </ul>
     </div>   
</template>
<script>
export default {
   props: {
       img_urls: {default: []},  //图片数组
       img_maxIndex: {default: 0},  //最后一张图片索引值
       containerWidth: {default() {
           width: 0
       }},
       ulStyle: {              //url样式
       default() {
           return {
             "margin-left": 0,
              width: 0,
              height: 0
           }
       }
       }
   },
   data() {
       return {
           index: 0,
           isAnimate: true   //是否添加transition属性
       }
   },
   mounted() {
       setInterval(
        this.carousel
       ,3000);
   },
   methods: {
       //轮播图逻辑
        carousel() {
        this.index++;
        this.isAnimate = true;
        this.ulStyle["margin-left"] = `-${this.index*parseInt(this.containerWidth.width)}px`;   
         if(this.index == this.img_maxIndex) {
          this.index = 0;
          this.isAnimate = true;
          this.ulStyle["margin-left"] = `-${this.img_maxIndex*parseInt(this.containerWidth.width)}px`;
          setTimeout(() => {
              this.isAnimate = false;
              this.ulStyle["margin-left"] = 0;
          },500);
        }  
        }
    }
}
</script>
<style scoped>
  ul{
      list-style: none;
      padding: 0;
      margin: 0;
  }
  .carousel-inner{
      height: 100%;
      width: 1875px;
  }
  li{ 
      width: 11.11%;
      float: left;
      height: 100%;
  }
  li a img{
      width: 100%;
      height: 100%;
  }
  .indicator {
      position: absolute;
      left: 147px;
      bottom: -6px;
      display: flex;
      justify-content: space-between;
      width: 67px;
      height: 25px;
  }
  .indicator li{
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background: #ccc;
  }
    .carousel {
    position: relative;
    overflow: hidden;
    height: 100%;
  }
  .active{
    background: #85392b !important;
  }
  .transition {
    transition: .5s linear;
  }
</style>

