<template>
    <div>
        <div class="head">
            <i class="iconfont icon-mjiantou-copy" @click="goBack"></i>
            <span class="title">我的资料</span>
        </div>
        <div class="row">
            <div>头像</div>
            <div class="avatar">
                <img :src="'http://127.0.0.1:5050/'+avatar" alt="">
            </div>
        </div>
        <div class="row">
            <div>昵称</div>
            <input type="text" v-model="nickName" :placeholder="nickName">
        </div>
        <div class="row">
            <div>性别</div>
            <input type="text" v-model="sex" :placeholder="sex">
        </div>
        <div class="row">
            <div>手机号码</div>
            <input type="text" v-model="phone" :placeholder="phone">
        </div>
        <div class="row">
            <div>邮箱地址</div>
            <input type="text" v-model="email" :placeholder="email">
        </div>
        <button @click="modify_myInfo">修改</button>                                
    </div>
</template>
<script>
export default {
   data() {
       return {
           avatar: "",
           nickName: "",
           sex: 0,
           phone: "123",
           email: "456"
       }
   },
   created() {
       this.axios.get("/user/myInfo").then( result => {
           if(result.data.code===-1) {
            this.$toast(result.data.msg);
            this.$router.push("/login");
           }
           if(result.data.code===1) {
             var info = result.data.data[0];
             this.avatar = info.avatar;
             this.nickName = info.nickName;
             this.sex = info.sex == 1? "男": "女";
             this.phone = info.phone;
             this.email = info.email;
             console.log(this.avatar, this.nickName, this.sex, this.phone, this.email);
           }
       });
   },
   methods: {
       modify_myInfo() {
       this.axios.post("/user/change_myInfo",{
         nickName: this.nickName,
         sex: this.sex == "男"? 1: 0,
         phone: this.phone,
         email: this.email
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
       },
       goBack() {
           this.$router.push("/orderWrapper");
       }
   }
}
</script>
<style scoped>
.head {
    display: flex;
    padding: 0 10px;
    height: 50px;
    background: #85392b;
    line-height: 50px;
    color: #fff;
}
.head .title{
    margin-left: 130px;
}
.row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 50px;
    border-bottom: 1px solid #85392b;
}
.row .avatar{
    padding-top: 2px;
}
.row .avatar img {
    height: 45px;
    border: 1px solid #85392b;
    border-radius: 100%;
}
.row input{
    width: 250px;
    text-align: right;
    border: 0;
    outline: 0;
}
button {
    margin-top: 20px;
    border: 0;
    background: #85392b;
    color: #fff;
    font-size: 12px;
    padding: 5px;
}
</style>
