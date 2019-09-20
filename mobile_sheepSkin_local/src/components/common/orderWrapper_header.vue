<template>
    <div>
        <div class="head_intro">
          <div v-show="hasAvatar" class="hasAvatar">
            <img :src="'http://127.0.0.1:5050/'+avatar" alt="">
          </div>
          <div v-show="!hasAvatar">
            <img v-show = "isBoy" :src="require('../../assets/imgs/boy.png')" alt="">
            <img v-show = "!isBoy" :src="require('../../assets/imgs/girl.png')" alt="">
           </div>
           <div class="nickName">{{nickName}}</div>
           <div class="gotoMyInfo" @click="gotoMyInfo">编辑</div>
           </div>
           <div class="editor">
            <div>
            <i class="iconfont icon-bi"></i>
            <span class="text" @click="change_avatar">替换</span>
          </div>
        <input type="file" name='image' id="changeAvatar">
        </div>
    </div>
</template>
<script>
export default {
data() {
    return {
      nickName: "",
      isBoy: true,
      avatar: "",
      hasAvatar: true
    };
  },
  created() {
      this.axios.get("/user/myInfo").then(result => {
        if (result.data.code === 1) {
        this.nickName = result.data.data[0].nickName;
        this.avatar = result.data.data[0].avatar;
       //如果之前没修改过头像,根据性别使用默认的头像
        if(this.avatar.length <= 0) {
          this.hasAvatar=false;
          if(result.data.data[0].sex === 1) {
          this.isBoy = true;
          } else {
          this.isBoy = false;
           }
         } else {
           //如果数据库里面已经有用户自己提交的头像，显示用户自己提交的头像
           this.hasAvatar = true;
         }      
        }
      if(result.data.code === -1) {
          this.$toast(result.data.msg);
          this.$router.push("/login");
      }      
      });
  },
  methods: {
          //替换图片事件
     change_avatar() {
     // 获取file域里的图片信息
     var formData = new FormData();
     //创建formdata对象
     var files = $("#changeAvatar")[0].files;
     for (var i =0; i< files.length; i++) {
       formData.append("imgFiles",files[i])
     }
    // 将文件信息 append 进入formdata对象  key值 为后台 single 设置的值 
    this.axios.post("/uploads/img",formData).then( (result) => {
      if(result.data.err==0) {
        this.show_oldInfo = false;
       this.avatar = result.data.data[0];
       //将修改后的图片存入user表
       this.axios.post("/user/change_myInfo",{
         avatar: this.avatar
       }).then(result => {
         if(result.data.code === -1) {
           this.$toast(result.data.msg);
           this.$router.push("/login");
         } 
         if(result.data.code === 1) {
           this.$toast(result.data.msg);
           this.avatar = result.data.data[0];
         }
       });
      }
    });
   },
   gotoMyInfo() {
       this.$router.push("/myInfo");
   }
  }
}
</script>
<style scoped>
.head_intro {
      position: relative;
      height: 100px;
      display: flex;
      align-items: center;
      padding: 10px 0 0 10px;
      background:#85392b;
      color: #fff;
  }
  .head_intro .nickName{
     margin-left: 10px;
     font-size: 12px;
  }
  .head_intro img{
      width: 50px;
      margin-right: 10px;
  }
  .editor {
  position: absolute;
  width: 50px;
  height: 22px;
  left: 10px;
  top: 71px;
  color: #fff;
  background: rgba(0,0,0,.5);
}
.icon-bi{
color: #fff;
padding: 1px;
}
.editor input{
  position: absolute;
  width: 50px;
  left: 3px;
  top: -1px;
  width: 20px;
  opacity: 0;
}
.editor .text{
  font-size: 12px;
}
.hasAvatar {
  width: 56px;
  height: 63px;
}
.hasAvatar img{
  width: 100%;
  height: 100%;
  border-radius: 100%;
}
.gotoMyInfo{
    margin-left: 150px;
    font-size: 12px;
}
</style>

