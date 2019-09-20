<template>
    <div>
     <div class="container">
     <div class="upload_container">
        <div class="upload">
        <i class="iconfont icon-tupian"></i>
        <div class="choose">选择图片</div>
        </div>
        <input type="file" name='image' id="imagelist" multiple>
     </div>  
    <button @click="Req_ajax">上传</button>
    </div>
    <ul class="imgList" :style="ulStyle">
        <li v-for = "(item,i) of imgUrl" :key="i">
            <img :src = "'http://127.0.0.1:5050/'+item"  alt="">
        </li>
    </ul>
    </div>
</template>
<script>
export default {
  props: {
   ulStyle: {
       default() {
           return {
               "margin-top": "10px"
           }
       }
   }
  },
  data() {
      return {
        imgUrl: []
      }
  },
  methods: {
      Req_ajax() {
     // 获取file域里的图片信息
     var formData = new FormData();
     //创建formdata对象
     var files = $("#imagelist")[0].files;
     for (var i =0; i< files.length; i++) {
       formData.append("imgFiles",$("#imagelist")[0].files[i])
     }
    // 将文件信息 append 进入formdata对象  key值 为后台 single 设置的值 
    this.axios.post("/uploads/img",formData).then( (result) => {
      if(result.data.err==0) {
       this.imgUrl = this.imgUrl.concat(result.data.data);
       //通知父元素，将获取到的imgUrl传给父组件
       this.$emit("getImgUrl", this.imgUrl);
      // console.log(this.imgUrl);
      }
    });
   }
   }  
 }
</script>
<style scoped>
    .container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 5px;
    }
    .upload_container{
        position: relative;
    }
    .upload {
        width: 100px;
        height: 47px;
        margin-right: 15px;
        background: #fff;
        padding-top: 10px;
        border: 1px dotted #ccc;
        color: royalblue;
        font-size: 12px;
    }
    input{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }    
    .choose {
        margin-top: 10px;
    }
    button{
        width: 50px;
        height: 30px;
        font-size: 12px;
    }
    ul {
        display: flex;
        list-style: none;
        padding: 0;
        margin-left: 10px;
    }
    ul li{
        width: 68px;
        border: 1px solid #ccc;
    }
    ul li img{
        width: 100%;
        vertical-align: middle;
    }
</style>
